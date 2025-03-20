import { Provider } from "react-redux";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import { store } from "./store/store.js";
import { AppHeader } from "./layout/AppHeader.jsx";
import { AppFooter } from "./layout/AppFooter.jsx";
import { Home } from "./pages/Home.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";
import { UserMsg } from "./cmps/msg/UserMsg.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Contact } from "./pages/Contact.jsx";
import { About } from "./pages/About.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main className="app-main full main-layout">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/toy" element={<ToyIndex />}>
                <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                <Route path="/toy/edit/" element={<ToyEdit />} />
              </Route>
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </Router>
    </Provider>
  );
}

export default App;
