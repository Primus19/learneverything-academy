"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ExternalHyperlink } from 'docx'
import { saveAs } from 'file-saver'
import { Download, Plus, Trash2, Layout, FileText, File as FilePdf, Github, Linkedin, Link as LinkIcon } from 'lucide-react'
import { resumeTemplates } from "@/src/resume-builder/templates"
import { formatDescription, formatSkills, formatSummary, formatProjectDescription, formatUrl } from "@/src/resume-builder/utils"
import Image from "next/image"

interface Experience {
  company: string
  position: string
  duration: string
  description: string
}

interface Education {
  school: string
  degree: string
  duration: string
}

interface Skill {
  name: string
  level: string
}

interface Project {
  title: string
  description: string
  technologies: string
  link: string
}

interface SocialLink {
  platform: string
  url: string
}

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  })
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0])

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, {
      platform: '',
      url: ''
    }])
  }

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newSocialLinks = [...socialLinks]
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value }
    setSocialLinks(newSocialLinks)
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      duration: '',
      description: ''
    }])
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperiences = [...experiences]
    newExperiences[index] = { ...newExperiences[index], [field]: value }
    setExperiences(newExperiences)
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const addEducation = () => {
    setEducation([...education, {
      school: '',
      degree: '',
      duration: ''
    }])
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setEducation(newEducation)
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    setSkills([...skills, { name: '', level: '' }])
  }

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setSkills(newSkills)
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const addProject = () => {
    setProjects([...projects, {
      title: '',
      description: '',
      technologies: '',
      link: ''
    }])
  }

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setProjects(newProjects)
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const generatePDF = async () => {
    try {
      const resumeElement = document.getElementById('resume-preview')
      if (!resumeElement) return

      // Create a clone of the resume element to avoid modifying the original
      const clone = resumeElement.cloneNode(true) as HTMLElement
      
      // Set specific styles for PDF generation
      clone.style.width = '800px'
      clone.style.padding = '40px'
      clone.style.background = 'white'
      clone.style.color = 'black'
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      
      // Append to body temporarily
      document.body.appendChild(clone)

      // Convert to canvas with higher quality settings
      const canvas = await html2canvas(clone, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      // Remove the clone after canvas creation
      document.body.removeChild(clone)

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('resume.pdf')

      toast({
        title: "Success",
        description: "Resume downloaded as PDF successfully",
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const generateWord = async () => {
    try {
      const sections = [
        // Header with name and contact info
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.name,
              bold: true,
              size: 32,
            }),
          ],
          spacing: { after: 200 },
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`,
              size: 24,
            }),
          ],
          spacing: { after: 200 },
          alignment: AlignmentType.CENTER,
        }),

        // Social Links
        ...(socialLinks.length > 0 ? [
          new Paragraph({
            children: socialLinks.map((link, index) => {
              const elements = [
                new TextRun({
                  text: `${link.platform}: `,
                  size: 24,
                  bold: true,
                }),
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: link.url,
                      size: 24,
                      style: "Hyperlink",
                    }),
                  ],
                  link: formatUrl(link.url),
                })
              ];
              
              if (index < socialLinks.length - 1) {
                elements.push(
                  new TextRun({
                    text: " | ",
                    size: 24,
                  })
                );
              }
              
              return elements;
            }).flat(),
            spacing: { after: 400 },
            alignment: AlignmentType.CENTER,
          }),
        ] : []),

        // Professional Summary
        new Paragraph({
          text: "Professional Summary",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: formatSummary(personalInfo.summary),
              size: 24,
            }),
          ],
          spacing: { after: 400 },
        }),

        // Experience Section
        ...(experiences.length > 0 ? [
          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          ...experiences.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.duration}`,
                  size: 24,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...formatDescription(exp.description).map(point => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${point}`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              })
            ),
            new Paragraph({
              spacing: { after: 200 },
            }),
          ]),
        ] : []),

        // Projects Section
        ...(projects.length > 0 ? [
          new Paragraph({
            text: "Projects",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          ...projects.flatMap(project => [
            new Paragraph({
              children: [
                new TextRun({
                  text: project.title,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...(project.link ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Link: ",
                    size: 24,
                    italics: true,
                  }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: project.link,
                        size: 24,
                        style: "Hyperlink",
                      }),
                    ],
                    link: formatUrl(project.link),
                  }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Technologies: ${project.technologies}`,
                  size: 24,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...formatProjectDescription(project.description).map(point => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${point}`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              })
            ),
            new Paragraph({
              spacing: { after: 200 },
            }),
          ]),
        ] : []),

        // Education Section
        ...(education.length > 0 ? [
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          ...education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.school} | ${edu.duration}`,
                  size: 24,
                  italics: true,
                }),
              ],
              spacing: { after: 200 },
            }),
          ]),
        ] : []),

        // Skills Section
        ...(skills.length > 0 ? [
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          ...formatSkills(skills).map(skill => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${skill}`,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            })
          ),
        ] : []),
      ]

      const doc = new Document({
        sections: [{
          properties: {},
          children: sections
        }]
      })

      const buffer = await Packer.toBlob(doc)
      saveAs(buffer, 'resume.docx')

      toast({
        title: "Success",
        description: "Resume downloaded as Word document successfully",
      })
    } catch (error) {
      console.error('Error generating Word document:', error)
      toast({
        title: "Error",
        description: "Failed to generate Word document. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div className="space-y-6 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Add your professional profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {socialLinks.map((link, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Platform (e.g., GitHub, LinkedIn)</Label>
                    <Input
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addSocialLink} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Social Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Use bullet points or separate achievements with periods or new lines"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addExperience} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Highlight your notable projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <Input
                      value={project.technologies}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Link (GitHub, Demo, etc.)</Label>
                    <Input
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Use bullet points or separate achievements with periods or new lines"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addProject} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>School</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={edu.duration}
                      onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addEducation} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Skill Name</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proficiency Level (Optional)</Label>
                    <Input
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', e.target.value)}
                      placeholder="e.g., Expert, Intermediate, Beginner"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addSkill} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pl-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Selection</CardTitle>
              <CardDescription>Choose a template for your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {resumeTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedTemplate.id === template.id ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={template.previewImage}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>Preview and download your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <Button onClick={generatePDF} className="flex-1">
                  <FilePdf className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button onClick={generateWord} variant="outline" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" /> Download Word
                </Button>
              </div>

              <div
                id="resume-preview"
                className={`${selectedTemplate.styles.container} border border-gray-200 shadow-sm print:shadow-none print:p-0`}
              >
                <div className={selectedTemplate.styles.header}>
                  <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                  <p className="text-muted-foreground">
                    {personalInfo.email} {personalInfo.email && personalInfo.phone && '|'} {personalInfo.phone} {(personalInfo.email || personalInfo.phone) && personalInfo.location && '|'} {personalInfo.location}
                  </p>
                  
                  {socialLinks.length > 0 && (
                    <div className={selectedTemplate.styles.socialLinks}>
                      {socialLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href={formatUrl(link.url)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm"
                        >
                          {link.platform.toLowerCase().includes('github') && <Github className="h-4 w-4" />}
                          {link.platform.toLowerCase().includes('linkedin') && <Linkedin className="h-4 w-4" />}
                          {!link.platform.toLowerCase().includes('github') && !link.platform.toLowerCase().includes('linkedin') && <LinkIcon className="h-4 w-4" />}
                          <span>{link.platform}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {personalInfo.summary && (
                  <div className={selectedTemplate.styles.section}>
                    <h2 className={selectedTemplate.styles.sectionTitle}>Professional Summary</h2>
                    <div className={selectedTemplate.styles.content}>
                      <p>{formatSummary(personalInfo.summary)}</p>
                    </div>
                  </div>
                )}

                {experiences.length > 0 && (
                  <div className={selectedTemplate.styles.section}>
                    <h2 className={selectedTemplate.styles.sectionTitle}>Experience</h2>
                    <div className={selectedTemplate.styles.content}>
                      {experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold">{exp.position}</h3>
                          <p className="text-muted-foreground">{exp.company} {exp.company && exp.duration && '|'} {exp.duration}</p>
                          <ul className="list-disc list-inside mt-2">
                            {formatDescription(exp.description).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projects.length > 0 && (
                  <div className={selectedTemplate.styles.section}>
                    <h2 className={selectedTemplate.styles.sectionTitle}>Projects</h2>
                    <div className={selectedTemplate.styles.content}>
                      {projects.map((project, index) => (
                        <div key={index} className={selectedTemplate.styles.projectItem}>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.link && (
                              <a 
                                href={formatUrl(project.link)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-primary flex items-center gap-1"
                              >
                                <LinkIcon className="h-3 w-3" />
                                <span>Link</span>
                              </a>
                            )}
                          </div>
                          {project.technologies && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <span className="font-medium">Technologies:</span> {project.technologies}
                            </p>
                          )}
                          <ul className="list-disc list-inside mt-2">
                            {formatProjectDescription(project.description).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {education.length > 0 && (
                  <div className={selectedTemplate.styles.section}>
                    <h2 className={selectedTemplate.styles.sectionTitle}>Education</h2>
                    <div className={selectedTemplate.styles.content}>
                      {education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.school} {edu.school && edu.duration && '|'} {edu.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skills.length > 0 && (
                  <div className={selectedTemplate.styles.section}>
                    <h2 className={selectedTemplate.styles.sectionTitle}>Skills</h2>
                    <div className={selectedTemplate.styles.content}>
                      <ul className="list-disc list-inside">
                        {formatSkills(skills).map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}