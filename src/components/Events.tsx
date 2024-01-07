import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../services/fetchServices";

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryFn: () => fetchEvents(),
    queryKey: ["events"],
    staleTime: 1000,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return events ? (
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
  ) : (
    <div className='container'>No events at the moment.</div>
  );
};

export default Events;
