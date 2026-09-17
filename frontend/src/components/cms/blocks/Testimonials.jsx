import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials({ title, subtitle }) {
  const testimonials = [
    {
      id: 1,
      name: 'Aditya S.',
      role: 'Student',
      text: 'Cognova transformed the way I approach competitive exams. The mentorship is unparalleled and the curriculum is expertly structured.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya M.',
      role: 'Parent',
      text: 'Seeing my daughter excel and gain confidence in Mathematics has been amazing. The faculty truly cares about student success.',
      rating: 5
    },
    {
      id: 3,
      name: 'Rahul K.',
      role: 'Alumni',
      text: 'The foundational skills I learned here are still helping me in college. Best investment in my education.',
      rating: 5
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          {title && (
            <h2 className="font-extrabold mb-4 text-white"
                style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 2.75rem)' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl relative shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
            <Quote className="absolute top-6 right-6 text-[#F2B84B] opacity-30" size={48} />
            
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-[#F2B84B] fill-[#F2B84B]" />
              ))}
            </div>
            
            <p className="text-white/90 text-lg leading-relaxed mb-8 relative z-10 italic">
              "{t.text}"
            </p>
            
            <div className="mt-auto border-t border-white/10 pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2B84B] flex items-center justify-center text-[#552B7A] font-bold text-xl">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <span className="text-white/60 text-sm">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
