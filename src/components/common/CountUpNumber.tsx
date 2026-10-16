import React, { useEffect, useRef, useState } from 'react';

export interface CountUpNumberProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: boolean;
  replayOnEnter?: boolean;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  trigger,
  replayOnEnter = true,
}) => {
  const safeEnd = typeof end === 'number' && Number.isFinite(end) ? end : Number(end) || 0;
  const safeDuration = typeof duration === 'number' && duration > 0 ? duration : 2000;
  const safeDecimals = Math.max(0, Math.min(10, Math.floor(typeof decimals === 'number' && Number.isFinite(decimals) ? decimals : 0)));

  const [displayValue, setDisplayValue] = useState<number>(0);
  const [inView, setInView] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // If external trigger is provided, use it; otherwise observe element visibility
  const isControlled = trigger !== undefined;
  const shouldAnimate = isControlled ? Boolean(trigger) : inView;

  // Internal IntersectionObserver when not externally controlled
  useEffect(() => {
    if (isControlled) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (replayOnEnter) {
          setInView(false);
          setDisplayValue(0);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [isControlled, replayOnEnter]);

  // Handle animation whenever shouldAnimate flips or end/duration change
  useEffect(() => {
    if (!shouldAnimate) {
      if (replayOnEnter) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
        setDisplayValue(0);
      }
      return;
    }

    let startTime: number | null = null;

    // Smooth easeOutExpo curve for realistic speed deceleration
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / safeDuration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * safeEnd;

      setDisplayValue(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(safeEnd);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [shouldAnimate, safeEnd, safeDuration, replayOnEnter]);

  const safeNum = Number.isFinite(displayValue) ? displayValue : safeEnd;
  const formattedValue =
    safeDecimals > 0
      ? safeNum.toFixed(safeDecimals)
      : Math.floor(safeNum).toLocaleString('en-US');

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default CountUpNumber;
