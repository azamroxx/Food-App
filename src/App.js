import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "./components/Headers";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CardDetails />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
