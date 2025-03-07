import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./scss/app.scss";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
