import React, { useState } from "react";
import "./index.css";
interface Props {
  text?: string;
  icon?: React.ReactNode;
  diableMove?: boolean;
  top?: number;
  left?: number;
  onBack?: () => void;
}

interface MoveEvent extends React.MouseEvent<HTMLDivElement> {
  touches?: { clientX: number; clientY: number; button: React.ReactNode }[];
}
const Index: React.FC<Props> = ({
  text,
  icon,
  diableMove,
  top,
  left,
  onBack,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: left || 0, y: top || 0 });
  const [startPos, setStartPos] = useState({ x: left || 0, y: top || 0 });

  const handleStart = (e: MoveEvent) => {
    if (!diableMove) return;
    setIsDragging(true);
    // 处理触摸事件和鼠标事件的兼容性
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (e: MoveEvent) => {
    if (!diableMove) return;
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - startPos.x;
    const dy = clientY - startPos.y;
    setPosition({ x: position.x + dx, y: position.y + dy });
    setStartPos({ x: clientX, y: clientY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };
  return (
    <div
      style={{
        position: "absolute",
        left: position.x || left,
        top: position.y || top,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      title={text}
      onClick={onBack}
    >
      {icon}
    </div>
  );
};
export default Index;
