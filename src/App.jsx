import { Provider } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { store } from "./store/store.js";
import { AppHeader } from "./layout/AppHeader.jsx";
import { AppFooter } from "./layout/AppFooter.jsx";
import { Home } from "./pages/Home.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";
import { UserMsg } from "./cmps/msg/UserMsg.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <section className="app main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/toy/edit/" element={<ToyEdit />} />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
