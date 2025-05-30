import { Route, Routes } from "react-router-dom";
import { SearchContextProvider } from "./shared/contexts/searchContext";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./scss/app.scss";


function App() {
  return (
    <div className="wrapper">
      <SearchContextProvider>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContextProvider>
    </div>
  );
}

export default App;
