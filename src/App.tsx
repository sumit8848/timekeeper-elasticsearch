import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PdfViewer from "./PdfViewer";
import SearchUi from "./SearchUi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchUi />}></Route>
        <Route path="/pdf-viewer" element={<PdfViewer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
