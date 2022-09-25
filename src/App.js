import Header from "./components/Header";
import "./default.scss"
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main">
        <Home/>
      </div>
    </div>
  );
}

export default App;
