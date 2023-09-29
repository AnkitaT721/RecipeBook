import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar.js";
import Footer from "./component/layout/Footer.js";
import Home from "./component/Home/Home.js";

function App() {
  return (
    <>
    <div className="App">
      <Navbar />
 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
    </>
  );
}

export default App;
