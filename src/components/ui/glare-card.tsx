'use client';

import { cn } from "@/lib/utils";
import { useRef } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "16px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as any;

  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='white' fill-opacity='0.25'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/var(--foil-size) repeat",
    "--rainbow": "repeating-linear-gradient(0deg, rgba(28,28,28,0.1) calc(var(--step) * 1), rgba(255,255,240,0.1) calc(var(--step) * 2), rgba(28,28,28,0.1) calc(var(--step) * 3), rgba(255,255,240,0.1) calc(var(--step) * 4), rgba(28,28,28,0.1) calc(var(--step) * 5)) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal": "repeating-linear-gradient(128deg, rgba(28,28,28,0.05) 0%, rgba(255,255,240,0.05) 3.8%, rgba(255,255,240,0.05) 4.5%, rgba(255,255,240,0.05) 5.2%, rgba(28,28,28,0.05) 10%, rgba(28,28,28,0.05) 12%) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade": "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.07) 12%, rgba(255,255,255,0.13) 20%, rgba(255,255,255,0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hue, hue, overlay",
  };

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  // Check if device is mobile (no hover capability)
  const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  };

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] delay-&lsqb;var(--delay)&rsqb; duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; will-change-transform"
      ref={refElement}
      onPointerMove={(event) => {
        // Skip interaction on mobile devices
        if (isMobileDevice()) return;

        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5);
        rotate.y = delta.y / 2;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        // Skip interaction on mobile devices
        if (isMobileDevice()) return;

        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        // Skip interaction on mobile devices
        if (isMobileDevice()) return;

        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current?.style.setProperty("--r-x", `0deg`);
          refElement.current?.style.setProperty("--r-y", `0deg`);
        }
      }}
    >
      <div className="h-full grid will-change-transform origin-center delay-&lsqb;var(--delay)&rsqb; duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-[#1C1C1C]/10 hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden">
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className={cn("h-full w-full", className)}>
            {children}
          </div>
        </div>
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background delay-&lsqb;var(--delay)&rsqb; duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] relative after:content-[''] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]"
          style={{ ...backgroundStyle }}
        />
      </div>
    </div>
  );
}; 