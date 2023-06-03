import { Dialogue } from "./src/Dialogue";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./src/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dialogue />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
