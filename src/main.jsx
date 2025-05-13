import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductDataContextProvider } from "./Context/ProductDataContext";
import { UserDataContextProvider } from "./Context/UserDataContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserDataContextProvider>
      <ProductDataContextProvider>
        <App />
      </ProductDataContextProvider>
    </UserDataContextProvider>
  </BrowserRouter>
);
