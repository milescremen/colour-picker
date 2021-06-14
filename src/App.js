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
  const [found, setFound] = useState(true);
  
  const searchData = (searchTerm) => {
    // Grab the searched colour in object form
    const inputColour = colours.filter(colour => colour.hex === searchTerm);

    if(inputColour[0] != null) {
      // Calculate distances from the searched colour
      const newColours = colours.map((colour) => {
        colour.dist = calcDistance(inputColour[0].rgb, colour.rgb);

        return colour;
      });


      // Sort the colours by most similar
      const sortedColours = sortColours(newColours);

      // Filter out top 100 results
      let filteredColours = [];
      for(let i = 0; i < 100; i++)
      {
        filteredColours.push(sortedColours[i]);
      }

      setColours(filteredColours);
      setFound(true);
    }
    else {
      console.log("Not found");
      setFound(false);
    }
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
      <SearchInput isLoaded={isLoaded} searchData={searchData} />
        
      {!found && <p className="error-message">Error, colour not found</p>}

      {
        isLoaded ? <ColourList colours={colours}/> :
        retryLoad ? <button className="retry-button" onClick={()=> {fetchData()}}>Retry</button>
        : <p>Loading...</p> 
      }
    </div>
  );
}

export default App;
