import {useEffect, useState} from 'react';

export const useIntersection = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (ref === undefined || ref === null) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  });

  return intersecting;
};