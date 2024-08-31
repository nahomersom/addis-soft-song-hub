
import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import AddSongs from './components/pages/song';
import Home from './components/pages/home';
const Title = styled.h1`
text-align: center;
`
function App() {
  return (
    <div>
      <Title>Song HUB</Title>   
      <Routes>
         <Route
         path="/"
         element={ <Home/>}
         />
             <Route
         path="/song"
         element={ <AddSongs/>}
         />
          <Route
         path="/song/:id"
         element={ <AddSongs/>}
         />
      </Routes>
     
    </div>
  );
}

export default App;
