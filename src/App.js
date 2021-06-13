import "./App.css";
import ColourList from './components/ColourList/ColourList';
import SearchInput from "./components/SearchInput/SearchInput";
import { useEffect, useState } from 'react';
const axios = require('axios');


function App() {
  
  const [colours, setColours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json');
      const { colors } = res.data;
      
      setColours(colors);
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <SearchInput />
      <ColourList colours={colours}/>
    </div>
  );
}

export default App;
