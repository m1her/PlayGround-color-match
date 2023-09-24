import React from "react";
import { SketchPicker, ColorResult } from "react-color";

interface ColorPickerProps {
  color: any;
  onChange: (color: ColorResult) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={onChange}
        disableAlpha
        width="300px"
      />
    </div>
  );
};

export default ColorPicker;
//disableAlpha
