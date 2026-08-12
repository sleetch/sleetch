import type { Route } from './+types/_index';
import '@sleetch/client/markdown.css';
import { useEffect, useRef, useState } from 'react';
import Sleeky from '@/assets/branding/sleeky.svg?react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
  const [cursor_position, set_cursor_position] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const rightEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeOriginRef = useRef<HTMLDivElement>(null);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const leftEyeOriginRef = useRef<HTMLDivElement>(null);

  const eyesRef = useRef([
    { eye: rightEyeRef, origin: rightEyeOriginRef, angle: 0, offset: 20 },
    { eye: leftEyeRef, origin: leftEyeOriginRef, angle: 0, offset: 20 },
  ]);

  const lerp = (start: number, end: number, amount: number) => {
    return start + (end - start) * amount;
  };

  useEffect(() => {
    let frame: number;
    const animate = () => {
      for (const data of eyesRef.current) {
        const eye = data.eye.current;
        const origin = data.origin.current;
        if (eye && origin) {
          if (cursor_position.x == 0 && cursor_position.y == 0) {
            data.offset = lerp(data.offset, 50, 0.1);
          } else {
            data.offset = lerp(data.offset, 20, 0.1);
            const origin_rect = origin.getBoundingClientRect();
            const origin_position = { y: origin_rect.top, x: origin_rect.left };

            const origin_to_eye_vector = {
              x: 1,
              y: 0,
            };
            const origin_to_eye_vector_norm = Math.sqrt(origin_to_eye_vector.x ** 2 + origin_to_eye_vector.y ** 2);

            const origin_to_cursor_vector = { x: cursor_position.x - origin_position.x, y: cursor_position.y - origin_position.y };
            const origin_to_cursor_vector_norm = Math.sqrt(origin_to_cursor_vector.x ** 2 + origin_to_cursor_vector.y ** 2);

            const eye_scalar_cursor = origin_to_eye_vector.x * origin_to_cursor_vector.x + origin_to_eye_vector.y * origin_to_cursor_vector.y;

            const scalar_angle = Math.acos(eye_scalar_cursor / (origin_to_eye_vector_norm * origin_to_cursor_vector_norm));
            const det = origin_to_eye_vector.x * origin_to_cursor_vector.y - origin_to_eye_vector.y * origin_to_cursor_vector.x;
            let new_angle = det >= 0 ? -scalar_angle : scalar_angle;
            const diff = Math.round((data.angle - new_angle) / (Math.PI * 2)) * Math.PI * 2; // AI Generated, prevents multiple turn of the eye..
            data.angle = lerp(data.angle, new_angle + diff, 0.1);
          }

          eye.style.top = `${50 + (50 - data.offset) * -Math.sin(data.angle)}%`;
          eye.style.left = `${50 + (50 - data.offset) * Math.cos(data.angle)}%`;
        }
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [eyesRef, cursor_position]);

  return (
    <main
      onMouseMove={(e) => {
        set_cursor_position({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={(e) => {
        set_cursor_position({ x: 0, y: 0 });
      }}
      className="w-full min-h-screen flex items-center justify-center gap-20"
    >
      {cursor_position && (
        <div className="fixed" style={{ top: cursor_position.y + 'px', left: cursor_position.x + 'px' }}>
          ({cursor_position.x},{cursor_position.y})
        </div>
      )}

      <div className="relative ">
        <div className="hidden absolute border h-80 w-40 rounded-b-[10rem] rounded-t-[10rem] ">
          <div className="relative aspect-square  border border-dashed rounded-full w-full top-[50%] left-[50%] translate-[-50%]">
            <div ref={leftEyeOriginRef} className="absolute  border size-3 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
            <div ref={leftEyeRef} className="absolute bg-foreground  size-10 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
          </div>
        </div>

        <div className="absolute top-32 left-25 h-20 w-12 rounded-t-full rounded-b-full bg-foreground ">
          <div className="relative aspect-square w-full top-[50%] left-[50%] translate-[-50%]">
            <div ref={leftEyeOriginRef} className="absolute top-[50%] left-[50%] translate-[-50%]" />
            <div ref={leftEyeRef} className="absolute bg-background size-4 rounded-full top-[50%] left-[50%] translate-[-50%]" />
          </div>
        </div>

        <div className="absolute top-32 left-45 h-20 w-12 rounded-t-full rounded-b-full bg-foreground ">
          <div className="relative aspect-square w-full top-[50%] left-[50%] translate-[-50%]">
            <div ref={rightEyeOriginRef} className="absolute top-[50%] left-[50%] translate-[-50%]" />
            <div ref={rightEyeRef} className="absolute bg-background size-4 rounded-full top-[50%] left-[50%] translate-[-50%]" />
          </div>
        </div>

        <div className="absolute top-58 left-42 h-3 w-15 rounded-sm flex justify-between gap-1 overflow-hidden">
          <div className="bg-foreground size-full" />
          <div className="bg-foreground size-full" />
          <div className="bg-foreground size-full" />
          <div className="bg-foreground size-full" />
        </div>

        <svg width="331" height="365" viewBox="0 0 331 365" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M119.918 103.534C111.683 94.3981 102.711 85.3269 92.3131 75.9424C66.4665 52.6139 26.7971 61.0098 8.22503 90.0589C7.9736 90.4521 7.72603 90.8492 7.48243 91.25C7.25719 91.6614 7.03718 92.0744 6.82238 92.4888C-9.04367 123.101 3.52135 161.66 36.6437 172.384C49.968 176.698 62.3084 179.935 74.3367 182.5C62.3084 185.065 49.968 188.302 36.6437 192.616C3.52135 203.34 -9.04367 241.899 6.82238 272.511C7.03717 272.926 7.25719 273.339 7.48242 273.75C7.72603 274.151 7.9736 274.548 8.22503 274.941C26.7971 303.99 66.4664 312.386 92.3131 289.058C102.711 279.673 111.683 270.602 119.918 261.466C116.125 273.167 112.757 285.475 109.831 299.173C102.555 333.226 129.659 363.39 164.097 364.952C164.564 364.973 165.031 364.989 165.5 365C165.969 364.989 166.436 364.973 166.903 364.952C201.341 363.39 228.445 333.226 221.169 299.173C218.243 285.475 214.875 273.167 211.082 261.466C219.317 270.602 228.289 279.673 238.687 289.058C264.534 312.386 304.203 303.99 322.775 274.941C323.026 274.548 323.274 274.151 323.518 273.75C323.743 273.339 323.963 272.926 324.178 272.511C340.044 241.9 327.479 203.34 294.356 192.616C281.032 188.302 268.692 185.065 256.663 182.5C268.692 179.935 281.032 176.698 294.356 172.384C327.479 161.66 340.044 123.101 324.178 92.4888C323.963 92.0744 323.743 91.6614 323.518 91.25C323.274 90.8492 323.026 90.4521 322.775 90.0589C304.203 61.0098 264.534 52.6139 238.687 75.9424C228.289 85.3269 219.317 94.3981 211.082 103.534C214.875 91.8327 218.243 79.5253 221.169 65.8266C228.445 31.774 201.341 1.61032 166.903 0.0476785C166.436 0.0265194 165.969 0.0106078 165.5 0C165.031 0.0106078 164.564 0.0265194 164.097 0.0476785C129.659 1.61032 102.555 31.774 109.831 65.8266C112.757 79.5253 116.125 91.8327 119.918 103.534Z"
            fill="#2776FF"
          />
        </svg>
      </div>
    </main>
  );
}
