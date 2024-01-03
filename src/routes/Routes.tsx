import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../_app";
import EventPage from "../components/EventPage";
import Events from "../components/Events";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Events /> },
      { path: "event/:id", element: <EventPage /> },
    ],
  },
]);
