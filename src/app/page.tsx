"use client";
import ColorPicker from "@/components/ColorPicker";
import { hslToHex, roundHSLA } from "@/functions";
import { useEffect, useState } from "react";

export default function Home() {
  const [color, setColor] = useState<any>();
  const [goalColor, setGoalColor] = useState<any>();
  const [lvl, setLvl] = useState(1);
  const [hexHelper, setHexHelper] = useState<string>();
  const [toggler, setToggler] = useState<boolean>(false);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hsl);
  };

  const randomHSLColor = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.random() * (100 - 50) + 50;
    const l = Math.random() * (70 - 30) + 30;
    const a = 1;
    setColor({ a: 1, h: h, l: 1, s: 0 });
    const hex = hslToHex(h, s, l);
    setHexHelper(hex);
    setGoalColor(`hsla(${h}, ${s}%, ${l}%, ${a})`);
  };

  const win = () => {
    randomHSLColor();
    setLvl((prev) => prev + 1);
  };

  useEffect(() => {
    if (color && goalColor) {
      const colorcomp = roundHSLA(
        `hsla(${color.h}, ${color.s * 100}%, ${color.l * 100}%, ${color.a})`
      );
      const goalColorcomp = roundHSLA(goalColor);
      console.log(colorcomp, goalColorcomp);

      if (colorcomp == goalColorcomp) {
        win();
        setToggler(false);
      }
    }
  }, [color]);

  useEffect(() => {
    randomHSLColor();
  }, []);

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center gap-y-8">
      <div className="text-lg font-semibold font-mono text-white">
        Level {lvl}
      </div>
      <div className="flex justify-center items-center gap-x-4 h-full">
        <div className="flex flex-col justify-center items-center gap-y-2">
          <div className="text-white ">Goal</div>
          <div className="p-1 bg-white rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,.1)] relative group">
            <div
              className="w-28 aspect-square rounded-sm"
              style={{
                backgroundColor: goalColor,
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
              {hexHelper}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-y-2">
          <div className="text-white">Yours</div>
          <div
            className="p-1 bg-white rounded-sm w-[120px] aspect-square shadow-[0_0_0_1px_rgba(0,0,0,.1)] cursor-pointer"
            onClick={() => setToggler(true)}
          >
            {color && (
              <div
                className="w-28 aspect-square rounded-sm"
                style={{
                  backgroundColor: `hsla(${color.h}, ${color.s * 100}%, ${
                    color.l * 100
                  }%, ${color.a})`,
                }}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            {color && toggler && (
              <ColorPicker color={color} onChange={handleColorChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
