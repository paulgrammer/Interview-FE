import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./Page";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
