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

  const searchData = (searchTerm) => {
    // Sort colours 

    const colour = colours.filter(colour => colour.hex === searchTerm);

    console.log("triggered search data");
    setColours(sortData(colours));
  }

  // Sort by the utfc value of the hex code
  const sortData = (colours) => {
    return colours.sort(function(a, b){
      if(a.hex < b.hex) {
        return -1;
      }
      else if(a.hex > b.hex) {
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
