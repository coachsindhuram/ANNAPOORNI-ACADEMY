import React from 'react';
import DOMPurify from 'dompurify';

export default function RichText({ html, text }) {
  // Support either html or text prop
  const rawHtml = html || text || '<p>Rich Text Content</p>';
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  
  return (
    <div className="w-full flex justify-center items-center">
      <div 
        className="prose prose-lg md:prose-xl lg:prose-2xl max-w-[850px] mx-auto text-center"
        style={{
          color: 'inherit',
          lineHeight: '1.7',
          fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.5rem)'
        }}
        dangerouslySetInnerHTML={{ __html: cleanHtml }} 
      />
    </div>
  );
}
