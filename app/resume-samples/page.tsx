"use client"

import { Button } from "@/components/ui/button";
import { Download, FileType, Users, Calendar, CheckCircle, Star, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { resumeSamples } from "@/src/resume-samples/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Helper function to handle resume downloads
const handleDownload = (url: string, filename: string) => {
  // Create an anchor element
  const link = document.createElement('a');
  
  // Set the href to the download URL
  link.href = url;
  
  // Set the download attribute with the filename
  link.download = filename;
  
  // Append the link to the body
  document.body.appendChild(link);
  
  // Trigger the click event
  link.click();
  
  // Remove the link from the body
  document.body.removeChild(link);
};

export default function ResumeSamplesPage() {
  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQiTTMwIDMwbTE1IDBhMTUgMTUgMCAxIDEtMzAgMCAxNSAxNSAwIDEgMSAzMCAwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] bg-fixed">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background via-background/95 to-background/50 border-b border-primary/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Professional Templates</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              Elevate Your Career with Expert Resume Templates
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              Stand out from the crowd with our meticulously crafted, ATS-optimized resume templates
              designed specifically for tech industry professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">ATS-Friendly</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Optimized for applicant tracking systems
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <Zap className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Industry-Specific</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Tailored for tech roles
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <CheckCircle className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Easy to Edit</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Simple customization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="container py-16 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resumeSamples.map((sample) => (
            <Card key={sample.id} className="group overflow-hidden backdrop-blur-sm bg-card/50 border-primary/10">
              <div className="relative">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={sample.previewImage}
                    alt={sample.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
                    {sample.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-3">{sample.title}</h2>
                  <p className="text-lg text-muted-foreground line-clamp-2">{sample.description}</p>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="grid gap-8">
                  <div className="flex items-center justify-between text-sm bg-primary/[0.03] p-4 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2">
                      <FileType className="h-5 w-5 text-primary" />
                      <span className="font-medium">{sample.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">Updated {sample.lastUpdated}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {sample.features.map((feature, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-primary/5 border-primary/20 text-foreground/80"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Perfect For</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {sample.suitableFor.map((role, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-lg bg-primary/[0.03] border border-primary/10"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                    onClick={() => handleDownload(sample.downloadUrl, `${sample.id}-resume-template.pdf`)}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl" />
          <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
          <div className="relative p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Need a Custom Resume Template?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let us create a personalized resume template that perfectly matches your career goals
                and industry requirements.
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/20 hover:bg-primary/5 transition-colors duration-300"
              >
                Request Custom Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
