import { Routes,Route } from "react-router-dom";

import "./default.scss"
// pages
import Home from "./pages/Home";
import Register from "./pages/Register"

// layouts
import MainLayout from "./layout/MainLayout"
import HomeLayout from "./layout/HomeLayout"




function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomeLayout><Home/></HomeLayout>}/>
          <Route path="/register" element={<MainLayout><Register/></MainLayout>}/>
        </Routes>
    </div>
  );
}

export default App;
