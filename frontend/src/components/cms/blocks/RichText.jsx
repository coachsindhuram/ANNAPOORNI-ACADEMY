import React from 'react';
import DOMPurify from 'dompurify';

export default function RichText(props) {
  const cleanHtml = DOMPurify.sanitize(props.html || '<p>Rich Text content</p>');
  return <div className='prose mx-auto' dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
