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
      colour.id = 1000000 * Math.random();
      colour.rgb = hexToRGB(colour.hex);
      colour.hsl = hexToHSL(colour.hex);

      return colour;
    });
    return processedColours;
  }

  const searchData = (searchTerm) => {
    const filter = colours.filter(colour => colour.hex === searchTerm);
    console.log(filter);
    setColours(filter);
  }


  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json');
      const { colors } = res.data;
     
      setColours(processData(colors));
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <SearchInput searchData={searchData} />
      <ColourList colours={colours}/>
    </div>
  );
}

export default App;
