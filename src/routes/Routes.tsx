import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../_app";
import EventPage from "../components/EventPage";
import Events from "../components/Events";
import Login from "../components/Login";
import BossPage from "../components/BossPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Events /> },
      { path: "login", element: <Login /> },
      { path: "bosspage", element: <BossPage /> },
      { path: "event/:id", element: <EventPage /> },
    ],
  },
]);
