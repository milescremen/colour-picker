import "./App.css";
import ColourList from './components/ColourList/ColourList';
import SearchInput from "./components/SearchInput/SearchInput";
import { useEffect, useState } from 'react';
import { calcDistance, sortColours, processData, checkRegex } from "./utility/colour";

const axios = require('axios');

function App() {
  const [allColours, setAllColours] = useState([]); // Keep a copy of all colours
  const [colours, setColours] = useState([]); // Current colours being displayed
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryLoad, setRetryLoad] = useState(false);
  const [found, setFound] = useState(true);
  
  const searchData = (searchTerm) => {
    // Check for a match using regex, return the search term object if a match is found 
    const inputColour = checkRegex(searchTerm, allColours);

    if(inputColour != null && inputColour[0] != null) {
      
      // Calculate distances of each colour from the searched colour
      const newColours = allColours.map((colour) => {
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
      setAllColours(processed);
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
