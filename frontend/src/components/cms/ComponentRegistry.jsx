import React, { lazy, Suspense } from 'react';

// Lazy load components to keep bundle size small
// If we had many heavy components, this is beneficial.
// For now, we can import them directly if they are lightweight, or lazy load.

const Hero = lazy(() => import('./blocks/Hero'));
const RichText = lazy(() => import('./blocks/RichText'));
const ImageBlock = lazy(() => import('./blocks/ImageBlock'));
const CourseGrid = lazy(() => import('./blocks/CourseGrid'));
const Testimonials = lazy(() => import('./blocks/Testimonials'));
const Announcements = lazy(() => import('./blocks/Announcements'));

// Fallback for missing components
const MissingComponent = ({ type }) => (
  <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded my-4">
    <p className="font-bold">Missing Component: {type}</p>
    <p className="text-sm">This component type is not registered in the ComponentRegistry.</p>
  </div>
);

export const ComponentRegistry = {
  hero: Hero,
  richtext: RichText,
  image: ImageBlock,
  course_grid: CourseGrid,
  testimonials: Testimonials,
  announcements: Announcements,
};

export const getComponent = (type) => {
  return ComponentRegistry[type] || MissingComponent;
};
