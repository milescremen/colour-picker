// Function taken from https://css-tricks.com/converting-color-spaces-in-javascript/
export function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  const rgb = [+r,+b,+g];
  return rgb;
}

// Function taken from https://css-tricks.com/converting-color-spaces-in-javascript/
export function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  
  const hsl = [h, s, l];
  return hsl;
}


  // Sort by the euclidean distance between colour a and colour b
  // Add splice() because sort returns same array so react won't rerender 
  // Taken from: https://stackoverflow.com/questions/56362563/why-data-isnt-updating-after-sorting-in-react-hooks
  export const sortColours = (colours) => {
    return colours.slice().sort(function(a, b){
      if(a.dist < b.dist) {
        return -1;
      }
      else if(a.dist > b.dist) {
        return 1;
      }
      else {
        return 0;
      }
    }) 
  }


  // Calculates the euclidean distance between v1 and v2
  // Taken from: https://stackoverflow.com/questions/13586999/color-difference-similarity-between-two-values-with-js
  export const calcDistance = (v1, v2) => {
    let d = 0;

    for(let i = 0; i < v1.length; i++) {
            d += (v1[i] - v2[i])*(v1[i] - v2[i]);
        }
    return Math.sqrt(d);
  };

  // Adds extra info to the colours objects
  export const processData = (colours) => {
    const processedColours = colours.map((colour) => {
      colour.id = Math.floor(1000000 * Math.random());
      colour.rgb = hexToRGB(colour.hex);
      colour.hsl = hexToHSL(colour.hex);

      return colour;
    });

    return processedColours;
  }

  export const checkRegex = (searchTerm, allColours) => 
  {
    // Regular expression checking if starting with a # or rgb
    //https://stackoverflow.com/questions/9682709/regexp-matching-hex-color-syntax-and-shorten-form
    //https://stackoverflow.com/questions/9585973/javascript-regular-expression-for-rgb-values/9586150
    
    let inputColour = [];

    const RGBExpression = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    const hexExpression = /^#[0-9a-f]{3,6}$/i;

    const matchRGB = RGBExpression.exec(searchTerm);
    const matchHex = hexExpression.exec(searchTerm);
    
    if(matchHex !== null) {
      inputColour = allColours.filter(colour => colour.hex === searchTerm);
    }
    else if(matchRGB !== null) {
      const searchArray = [parseInt(matchRGB[1]), parseInt(matchRGB[2]), parseInt(matchRGB[3])];

      // Check for a rgb match with all the colours 
      inputColour = allColours.filter(colour => {
        let equal = true;
        for(let i = 0; i < colour.rgb.length; i++) {
          if(colour.rgb[i] !== searchArray[i]) {
            equal = false;
          }
        };

        return equal;
      });
    }
    else {
      inputColour = null;
    }

    return inputColour;
  }