'use client';

import { useDraggable } from '@dnd-kit/react';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export default function Draggable1({
  id,
  children,
}: DraggableProps) {
  const { ref, handleRef } = useDraggable({
    id,
   
  });

  return (
    <div ref={ref}>
      {children}

      <button ref={handleRef}>
        ⋮⋮
      </button>
    </div>
  );
}