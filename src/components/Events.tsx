import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Events = () => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/getevents");
      console.log("hi");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { data: events, isLoading } = useQuery({
    queryFn: () => fetchEvents(),
    queryKey: ["events"],
    staleTime: 1000,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <span className='header-text'>Events</span>
      <div className='card-container'>
        {events.map((event: any) => {
          return (
            <div className='event-card' key={event.id}>
              <Link to={`/event/${event.id}`} className='event-title'>
                {event.title}
              </Link>
              <p className='event-description'>{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
