import { useEffect, useState } from 'react';

export function useAntiRecording() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Detect window focus loss to prevent passive background recording
    const handleBlur = () => {
      setIsBlurred(true);
    };

    const handleFocus = () => {
      setIsBlurred(false);
    };

    // Prevent Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent common Developer Tool / PrintScreen shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === '4' || e.key === '3'))
      ) {
        e.preventDefault();
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 3000); // Temporary blackout penalty
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { isBlurred };
}
