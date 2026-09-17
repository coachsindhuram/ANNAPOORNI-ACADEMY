import React, { Suspense } from 'react';
import { getComponent } from './ComponentRegistry';

/**
 * SectionRenderer
 * Responsible for rendering a single section definition from the JSON.
 * It resolves the component type from the ComponentRegistry, and wraps it
 * in a container that applies styles (padding, background, etc).
 */
const SectionRenderer = ({ section }) => {
  const { type, content, styles, responsive, animation } = section;
  
  const Component = getComponent(type);

  // Safely extract styles, defaulting to empty objects if missing
  const sectionStyles = styles || {};
  
  // Build dynamic inline styles or tailwind classes based on config
  // In a real Webflow-like scenario, we might inject a <style> block with unique class, 
  // but for React, inline styles for dynamic user values + tailwind for structure works well.
  
  const containerStyle = {
    backgroundColor: sectionStyles.backgroundColor || 'transparent',
    paddingTop: sectionStyles.paddingTop || '4rem',
    paddingBottom: sectionStyles.paddingBottom || '4rem',
    color: sectionStyles.textColor || 'inherit',
    ...sectionStyles.customCss
  };

  return (
    <section 
      className={`cms-section ${sectionStyles.cssClasses || ''}`} 
      style={containerStyle}
      id={`section-${section.id}`}
    >
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="py-8 text-center animate-pulse">Loading component...</div>}>
           {/* Pass content directly as props to the underlying component */}
          <Component {...content} sectionId={section.id} />
        </Suspense>
      </div>
    </section>
  );
};

export default SectionRenderer;
