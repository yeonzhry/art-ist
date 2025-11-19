// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/font.css';
import GlobalStyle from "./styles/GlobalStyle"
import MainPage from "./pages/Onboard";
import Main from "./pages/Main";
import Header from "./components/Header";
import About from "./pages/About";
import HowTo from "./pages/HowTo";
import Play from "./pages/Play";
import Archive from "./pages/Archive";


function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/howto" element={<HowTo />} />
        <Route path="/play" element={<Play />} />
        <Route path="/about" element={<About />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Router>
  );
}

export default App;
