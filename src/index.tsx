import React from "react";
import App from "./_app";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import "./styles/index.scss";

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals(sendToVercelAnalytics);
