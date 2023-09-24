export const roundHSLA = (inputHSLA: any) => {
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
};
