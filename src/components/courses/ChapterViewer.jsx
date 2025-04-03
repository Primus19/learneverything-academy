import React from 'react';

export default function ChapterViewer({ content }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content.split('\n').map(line => {
        if (line.startsWith('# ')) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          return `<h3>${line.substring(4)}</h3>`;
        } else if (line.startsWith('- ')) {
          return `<ul><li>${line.substring(2)}</li></ul>`;
        } else if (line.startsWith('1. ')) {
          return `<ol><li>${line.substring(3)}</li></ol>`;
        } else if (line.trim() === '') {
          return '<br/>';
        } else {
          return `<p>${line}</p>`;
        }
      }).join('') }} />
    </div>
  );
}
