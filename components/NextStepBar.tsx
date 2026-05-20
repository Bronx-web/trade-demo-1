
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NextStepBarProps {
  footerRef: React.RefObject<HTMLElement | null>;
}

/**
 * NextStepBar Component
 * 
 * A "thumb-friendly" navigation bar that slides up when the user reaches the footer.
 * It guides the user through the conversion funnel: Home -> About -> Projects -> Booking.
 */
const NextStepBar: React.FC<NextStepBarProps> = ({ footerRef }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Define the flow configuration
  const flow: Record<string, { label: string; path: string }> = {
    '/': { label: 'Next: My Story', path: '/about' },
    '/about': { label: 'Next: View Projects', path: '/projects' },
    '/projects': { label: 'Next: Get a Quote', path: '/booking' },
  };

  const currentStep = flow[location.pathname];

  // Logic: Use useEffect unconditionally to satisfy the Rules of Hooks.
  // Previously, an early return was placed before this hook, causing 
  // inconsistent hook counts between renders.
  useEffect(() => {
    const target = footerRef.current;
    if (!target) return;

    // Use Intersection Observer to detect when footer is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1, // Trigger when 10% of the footer is visible
        rootMargin: '0px' 
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [footerRef, location.pathname]);

  // Early return now happens AFTER all hooks are declared.
  if (!currentStep || location.pathname === '/booking') {
    return null;
  }

  const handleNavigation = () => {
    navigate(currentStep.path);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <button
        onClick={handleNavigation}
        className="w-full bg-[#CB4154] text-white py-6 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 active:brightness-90 transition-all"
      >
        <span className="oswald font-bold text-xl uppercase tracking-widest">
          {currentStep.label}
        </span>
        <svg 
          className="w-6 h-6 animate-pulse" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

export default NextStepBar;
