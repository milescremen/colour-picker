import "./App.css";
import ColourList from './components/ColourList/ColourList';
import SearchInput from "./components/SearchInput/SearchInput";
import { useEffect, useState } from 'react';
import { hexToHSL, hexToRGB } from "./utility/colour";

const axios = require('axios');


function App() {
  const [colours, setColours] = useState([]);
  
  const processData = (colours) => {
    const processedColours = colours.map((colour) => {
      colour.id = Math.floor(1000000 * Math.random());
      colour.rgb = hexToRGB(colour.hex);
      colour.hsl = hexToHSL(colour.hex);

      return colour;
    });

    return processedColours;
  }

  // Calculates the euclidean distance between v1 and v2
  // Taken from: https://stackoverflow.com/questions/13586999/color-difference-similarity-between-two-values-with-js
  const calcDistance = (v1, v2) => {
    let d = 0;

    for(let i = 0; i < v1.length; i++) {
            d += (v1[i] - v2[i])*(v1[i] - v2[i]);
        }
    return Math.sqrt(d);
  };

  const searchData = (searchTerm) => {
    // Sort colours 
   
    // Grab the specific colour in object form
    const inputColour = colours.filter(colour => colour.hex === searchTerm);
    console.log(inputColour);

    const newColours = colours.map((colour) => {
      colour.dist = calcDistance(inputColour[0].rgb, colour.rgb);

      return colour;
    });

    setColours(sortColours(newColours));
  }


  // Add splice() because sort returns same array so react won't rerender 
  // https://stackoverflow.com/questions/56362563/why-data-isnt-updating-after-sorting-in-react-hooks
  const sortColours = (colours) => {
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

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json');
      const { colors } = res.data;

      const processed = processData(colors);

      setColours(processed);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchInput searchData={searchData} />
      <ColourList colours={colours}/>
    </div>
  );
}

export default App;
