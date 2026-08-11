import type { Route } from './+types/_index';
import '@sleetch/client/markdown.css';
import { useEffect, useRef, useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
  const [cursor_position, set_cursor_position] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const rightEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeOriginRef = useRef<HTMLDivElement>(null);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const leftEyeOriginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rightEye = rightEyeRef.current;
    const rightOrigin = rightEyeOriginRef.current;

    const leftEye = leftEyeRef.current;
    const leftOrigin = leftEyeOriginRef.current;

    let offset = 20;

    if (rightEye && rightOrigin && leftEye && leftOrigin) {
      const eyes = [
        { eye: rightEye, origin: rightOrigin },
        { eye: leftEye, origin: leftOrigin },
      ];
      if (cursor_position) {
        if (cursor_position.x == 0 && cursor_position.y == 0) offset = 50;
        for (const { eye, origin } of eyes) {
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
          const angle = det >= 0 ? -scalar_angle : scalar_angle;
          eye.style.top = `${50 + (50 - offset) * -Math.sin(angle)}%`;
          eye.style.left = `${50 + (50 - offset) * Math.cos(angle)}%`;
        }
      }
    }
  }, [rightEyeOriginRef, rightEyeRef, leftEyeRef, leftEyeOriginRef, cursor_position]);

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
      <div className="border h-80 w-40 rounded-b-[10rem] rounded-t-[10rem] relative">
        <div className="relative aspect-square  border border-dashed rounded-full w-full top-[50%] left-[50%] translate-[-50%]">
          <div ref={leftEyeOriginRef} className="absolute  border size-3 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
          <div ref={leftEyeRef} className="absolute bg-foreground  size-10 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
        </div>
      </div>

      <div className="border h-80 w-40 rounded-b-[10rem] rounded-t-[10rem] relative">
        <div className="relative aspect-square  border border-dashed rounded-full w-full top-[50%] left-[50%] translate-[-50%]">
          <div ref={rightEyeOriginRef} className="absolute  border size-3 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
          <div ref={rightEyeRef} className="absolute bg-foreground  size-10 rounded-full  top-[50%] left-[50%] translate-[-50%]" />
        </div>
      </div>
    </main>
  );
}
