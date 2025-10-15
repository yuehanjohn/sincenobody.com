import { useEffect, useRef } from 'react';

interface Options {
  pauseDuration?: number; // ms
  sectionSelector?: string;
}

export function useSmoothSectionPauseScroll({ pauseDuration = 500, sectionSelector = '.section' }: Options = {}) {
  const isScrolling = useRef(false);
  const scrollLock = useRef(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(sectionSelector));
    if (sections.length === 0) return;

    let lastScrollY = window.scrollY;
    let timeout: NodeJS.Timeout | null = null;

    // Prevent user scroll during pause
    const preventScroll = (e: Event) => {
      if (scrollLock.current) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const onScroll = () => {
      if (isScrolling.current || scrollLock.current) return;
      const direction = window.scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = window.scrollY;

      // Find the closest section in scroll direction
      const scrollPos = window.scrollY;
      let targetSection: Element | null = null;

      if (direction === 'down') {
        const found = sections.find(
          (section) => (section as HTMLElement).offsetTop > scrollPos + 10
        );
        targetSection = found ?? null;
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i] as HTMLElement;
          if (section.offsetTop < scrollPos - 10) {
            targetSection = section;
            break;
          }
        }
      }

      if (targetSection) {
        isScrolling.current = true;
        scrollLock.current = true;
        window.scrollTo({
          top: (targetSection as HTMLElement).offsetTop,
          behavior: 'smooth',
        });
        timeout = setTimeout(() => {
          isScrolling.current = false;
          scrollLock.current = false;
        }, pauseDuration);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [pauseDuration, sectionSelector]);
}
