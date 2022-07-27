import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/All/Header";
import Switch from "./components/All/Switch";
import All from "./pages/All";
import Favs from "./pages/Favs";

function App() {
  return (
    <BrowserRouter>
      <div className="container-global">
        <Header />
        <div className="container-principal">
          <Switch />
          <Routes>
            <Route path="/all/:numberpage" element={<All />} />
            <Route path="/favs/:numberpage" element={<Favs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
