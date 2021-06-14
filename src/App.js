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

    // Regular expression checking if starting with a # or rgb
    //https://stackoverflow.com/questions/9682709/regexp-matching-hex-color-syntax-and-shorten-form
    const RGBExpression = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    //https://stackoverflow.com/questions/9585973/javascript-regular-expression-for-rgb-values/9586150
    const hexExpression = /^#[0-9a-f]{3,6}$/i;

    const matchRGB = RGBExpression.exec(searchTerm);
    const matchHex = hexExpression.exec(searchTerm);
    let inputColour = [];

    if(matchHex !== null) {
      inputColour = colours.filter(colour => colour.hex === searchTerm);
    }
    else if(matchRGB !== null) {
      const searchArray = [parseInt(matchRGB[1]), parseInt(matchRGB[2]), parseInt(matchRGB[3])];
      console.log(searchArray);
      inputColour = colours.filter(colour => {
        let equal = true;
        for(let i = 0; i < colour.rgb.length; i++) {
          if(colour.rgb[i] != searchArray[i]) {
            equal = false;
          }
        };

        return equal;
      });
    }
    else {
      console.log("Not found");
      setFound(false);
    }

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
