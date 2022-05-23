import Pdf from "./components/Pdf";
import HolyWeek from "./components/HolyWeek";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:file" element={<Pdf />} />
        <Route path="/" element={<Home />} />
        <Route path="/holyweek" element={<HolyWeek />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/full"
          element={<div className="fullscreen">full screen</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
