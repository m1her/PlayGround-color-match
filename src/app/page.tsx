"use client";
import ColorPicker from "@/components/ColorPicker";
import { useEffect, useState } from "react";

export default function Home() {
  const [color, setColor] = useState<any>({ r: 255, g: 0, b: 0, a: 1 });
  const [goalColor, setGoalColor] = useState<any>();

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  useEffect(() => {
    const randomHexColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor.padStart(6, "0")}`;
    };
    const hexColor = randomHexColor();
    setGoalColor(hexColor);
  }, []);

  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center gap-x-4">
      <div className="p-1 bg-white rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,.1)] relative group">
        <div
          className="w-28 aspect-square rounded-sm"
          style={{
            backgroundColor: goalColor,
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
          {goalColor}
        </div>
      </div>
      <div className="p-1 bg-white rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,.1)]">
        <div
          className="w-28 aspect-square rounded-sm"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        />
      </div>
      <div>
        <ColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
}
