import React, { useEffect, useState } from "react";
import { EventType } from "../styles/types";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/getevents")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="container">
      <span className="header-text">Events</span>
      <div className="card-container">
        {events.map((event) => {
          return (
            <div className="event-card" key={event.id}>
              <Link to={`/event/${event.id}`} className="event-title">
                {event.title}
              </Link>
              <p className="event-description">{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
