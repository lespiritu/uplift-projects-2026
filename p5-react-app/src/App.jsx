import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";

import Home from "./pages/Home";
import AppContextProvider from "./contexts/AppContextProvider";
import Menu from "./pages/Menu";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Order";
import PageNotFound from "./components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./pages/Admin";
import Presentation from "./pages/Presentation";

function App() {
  const location = useLocation();
  const isPresentationPage = location.pathname === "/presentation";

  return (
    <>
      <AppContextProvider>
        <ScrollToTop />
        {!isPresentationPage ? <Header /> : null}

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<Order />} />
          <Route path="admin" element={<Admin />} />
          <Route path="/presentation" element={<Presentation />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppContextProvider>
    </>
  );
}

export default App;
