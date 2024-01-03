import React from "react";
import App from "./_app";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import "./styles/index.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

reportWebVitals(sendToVercelAnalytics);
