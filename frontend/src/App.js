import './App.css';
// import {Routes, Route} from "react-router-dom";
 import Footer from './Components/Footer';
import Header from './Components/Header';
import Important from "./Components/HomeBtn/Important";


function App() {
  return (
    <>
    <div className="App">
      <Header/>
      <Important/>
      <Footer/>
    </div>
    </>
  );
}
export default App;