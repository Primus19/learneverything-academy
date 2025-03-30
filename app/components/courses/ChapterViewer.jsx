import React from 'react';

export default function ChapterViewer({ content }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ 
        __html: content ? content
          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
          .replace(/- (.*?)$/gm, '<li>$1</li>')
          .replace(/<li>(.*?)<\/li>\n<li>/g, '<li>$1</li><li>')
          .replace(/<li>(.*?)<\/li>\n/g, '<li>$1</li></ul><p>')
          .replace(/\n<li>/g, '<ul><li>')
          : 'No content available'
      }} />
    </div>
  );
}
