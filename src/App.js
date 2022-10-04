import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <Router>
      <div className="app"></div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path=":id" element={<Post />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
