import React from 'react';
import SectionRenderer from './SectionRenderer';

/**
 * PageRenderer
 * Takes a Page object containing an array of Sections and renders them in order.
 */
const PageRenderer = ({ page }) => {
  if (!page || !page.sections) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        No content available.
      </div>
    );
  }

  return (
    <div className="cms-page-renderer w-full">
      {/* 
        We map through the sections sorted by display_order.
        Assuming they are pre-sorted by the backend API.
      */}
      {page.sections.map((section) => (
        <SectionRenderer key={`section-${section.id}`} section={section} />
      ))}
    </div>
  );
};

export default PageRenderer;
