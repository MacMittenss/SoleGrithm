import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  sticky?: boolean;
  height?: string;
  background?: string;
  maskTransition?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  sticky = false,
  height = '100vh',
  background,
  maskTransition = false,
  onEnter,
  onLeave,
}: SectionWrapperProps) {
  const sectionStyle: React.CSSProperties = {
    height: sticky ? undefined : height,
    background: background || 'transparent',
    position: 'relative',
  };

  const stickyStyle: React.CSSProperties = sticky
    ? {
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }
    : {};

  return (
    <section
      id={id}
      className={`relative ${className}`}
      style={sectionStyle}
      data-testid={`section-${id}`}
    >
      <div style={stickyStyle} className={sticky ? 'flex flex-col' : ''}>
        <div className="relative h-full">
          {children}
        </div>
      </div>
    </section>
  );
}