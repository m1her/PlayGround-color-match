"use client";
import ColorPicker from "@/components/ColorPicker";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

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

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  };

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
            className="p-1 bg-white rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,.1)] cursor-pointer"
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
              <SketchPicker
                color={color}
                onChange={handleColorChange}
                disableAlpha
                width="300px"
              />
            )}
          </div>
          {/* <ColorPicker color={color} onChange={handleColorChange} /> */}
        </div>
      </div>
    </div>
  );
}

function roundHSLA(inputHSLA: string) {
  // Regular expression to match HSLA values in the input string
  const regex = /hsla\((\d+(\.\d+)?),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;

  // Use regex to extract HSLA components from the input
  const match = inputHSLA.match(regex);

  if (match) {
    // Extract components
    const hue = parseFloat(match[1]);
    const saturation = parseFloat(match[3]);
    const lightness = parseFloat(match[4]);
    const alpha = parseFloat(match[5]);

    // Round the components to the nearest integers
    const roundedHue = Math.round(hue);
    const roundedSaturation = Math.round(saturation);
    const roundedLightness = Math.round(lightness);

    // Construct the new HSLA string
    const roundedHSLA = `hsla(${roundedHue}, ${roundedSaturation}%, ${roundedLightness}%, ${alpha})`;

    return roundedHSLA;
  } else {
    // Invalid input, return the original string
    return inputHSLA;
  }
}
