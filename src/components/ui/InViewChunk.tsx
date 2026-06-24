import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface InViewChunkProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function InViewChunk({ children, fallback = <div className="min-h-[50vh]" /> }: InViewChunkProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load before it comes into view
  });

  return (
    <div ref={ref}>
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
