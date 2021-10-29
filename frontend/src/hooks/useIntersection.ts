import {useEffect, useState} from 'react';

export const useIntersection = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (ref === undefined || ref === null) {
      return;
    }

    if (process.browser) {
      const scroll = 0.9;
      const options = {
        root: null,
        rootMargin: '-100% 0px 1000% 0px',
        threshold: 1 - scroll,
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          console.log('90% here');
          setIntersecting(entry.isIntersecting);
        }
      }, options);
  
      observer.observe(document.body);
      return () => observer.unobserve(document.body);
    }
  }, []);

  return intersecting;
};