'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Image from "next/image"
import Link from 'next/link'



const MarkdownRenderer.FC = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-white mt-5 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-bold text-white mt-4 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-300 mb-4 leading-relaxed" {...props} />
          ),
          a: ({ node, href, ...props }) => (
            <Link 
              href={href || '#'} 
              className="text-blue-400 hover-blue-300 underline"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 text-gray-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 text-gray-300" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1 text-gray-300" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-1 mb-4 text-gray-400 italic" {...props} />
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !className?.includes('language-')
            return !isInline ? (
              <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto mb-4">
                <code className={match ? `language-${match[1]}` : ''} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-300" {...props}>
                {children}
              </code>
            )
          },
          img: ({ node, src, alt, ...props }) => (
            <div className="my-6">
              <img 
                src={src || ''} 
                alt={alt || 'Image'} 
                className="max-w-full h-auto rounded-md"
                {...props}
              />
            </div>
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-800 rounded-md" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-700" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-gray-700" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-gray-700" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left text-sm font-medium text-white" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm text-gray-300" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-gray-700 my-6" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
