import "./App.css";
import ColourList from './components/ColourList/ColourList';
import SearchInput from "./components/SearchInput/SearchInput";
import { useEffect, useState } from 'react';
import { calcDistance, sortColours, processData } from "./utility/colour";

const axios = require('axios');


function App() {
  const [colours, setColours] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryLoad, setRetryLoad] = useState(false);
  
  const searchData = (searchTerm) => {
    // Sort colours 
   
    // Grab the specific colour in object form
    const inputColour = colours.filter(colour => colour.hex === searchTerm);

    const newColours = colours.map((colour) => {
      colour.dist = calcDistance(inputColour[0].rgb, colour.rgb);

      return colour;
    });

    setColours(sortColours(newColours));
  }

  
  async function fetchData() {
    try {
      const res = await axios.get('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json');
      const { colors } = res.data;

      const processed = processData(colors);

      setColours(processed);
      setIsLoaded(true);
      setRetryLoad(false);
    }
    catch (error) {
      console.log(error);
      setRetryLoad(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchInput searchData={searchData} />

      {
        isLoaded ? <ColourList colours={colours}/> :
        retryLoad ? <button className="retry-button" onClick={()=> {fetchData()}}>Retry</button>
        : <p>Loading...</p> 
      }
    </div>
  );
}

export default App;
