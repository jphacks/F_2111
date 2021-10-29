import {useEffect, useState} from 'react';

export const useIntersection = () => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const scroll = 0.9;
      const options = {
        root: null,
        rootMargin: '-100% 0px 1000% 0px',
        threshold: 1 - scroll,
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          setIntersecting(true);
        } else {
          setIntersecting(false);
        }
      }, options);

      observer.observe(document.body);
      return () => observer.unobserve(document.body);
    }
  }, [intersecting]);

  return intersecting;
};