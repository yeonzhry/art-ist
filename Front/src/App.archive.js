// Archive 전용 App
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/font.css';
import GlobalStyle from "./styles/GlobalStyle"
import Archive from "./pages/Archive";
// 간소화된 Header 사용 (선택적)
// import Header from "./components/Header.archive";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Archive />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Router>
  );
}

export default App;

