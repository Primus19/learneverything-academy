export function formatDescription(text: string): string[] {
  if (!text) return [];
  
  // Split text by new lines and periods followed by a space
  const points = text
    .split(/[.\n]+/)
    .map(point => point.trim())
    .filter(point => point.length > 0)
    .map(point => point.endsWith('.') ? point : `${point}.`);

  return points;
}

export function formatSummary(text: string): string {
  if (!text) return '';
  
  // Remove extra whitespace and ensure proper punctuation
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\.+$/, '') + '.';
}

export function formatSkills(skills: { name: string; level: string }[]): string[] {
  return skills.map(skill => {
    const name = skill.name.trim();
    const level = skill.level.trim();
    
    if (level) {
      return `${name} - ${level}`;
    }
    return name;
  }).filter(skill => skill.length > 0);
}

export function formatProjectDescription(text: string): string[] {
  if (!text) return [];
  
  // Split text by new lines and periods followed by a space
  const points = text
    .split(/[.\n]+/)
    .map(point => point.trim())
    .filter(point => point.length > 0)
    .map(point => point.endsWith('.') ? point : `${point}.`);

  return points;
}

export function formatUrl(url: string): string {
  if (!url) return '';
  
  // Add https:// if not present
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
}