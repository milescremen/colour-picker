import "./App.css";

import ColourList from './components/ColourList/ColourList';
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  return (
    <div className="App">

      <SearchInput />
      <ColourList />  

    </div>
  );
}

export default App;
