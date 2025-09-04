import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = '', 
  style = {} 
}) => {
  return (
    <div className={`section-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
};

export default SectionWrapper;