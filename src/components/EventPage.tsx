import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
// import { Portal, PortalTarget } from "./Portal.component";
import { useQuery } from "@tanstack/react-query";

type EventType = any;

const EventPage = () => {
  const { id } = useParams();
  // const [event, setEvent] = useState<EventType>();
  const [isModalOpen, setModalState] = useState<boolean>(false);
  const toggleModal = () => setModalState(!isModalOpen);
  const [inputValue, setInputValue] = useState({
    email: "",
    passw: "",
  });

  const { email, passw } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValue({
      ...inputValue,
      [id]: new Date(value),
    });
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getevent?id=${id}`);
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

  const { data: event, isLoading } = useQuery({
    queryFn: () => fetchEvent(),
    queryKey: ["event"],
    staleTime: 10000,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return event ? (
    <div>
      <div>
        <p>Event #{id}</p>
        <p>{event.title}</p>
        <p>{event.description}</p>
      </div>
      <hr />
      <div>
        <p>Created by: {event.boss.fullname}</p>
        <p>Created at: {event.boss.createdAt}</p>
      </div>
      <hr />
      <div>
        <p>Help needed during:</p>
        <div>
          {event.shifts.map((shift: any) => {
            return (
              <div key={shift.id}>
                <span>
                  {shift.start_time} - {shift.end_time}
                </span>{" "}
                <button onClick={() => toggleModal()}>Sign up</button>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div>
        <p>Sign ups:</p>
        <div>
          {event.length > 0 ? (
            event.availabilities.map((availability: any) => {
              return (
                <div key={availability.id}>
                  <p>
                    User {availability.id} == Allocated:{" "}
                    {availability.is_allocated ? "Yes" : "No"}
                  </p>
                </div>
              );
            })
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
      <hr />

      <Modal isOpen={isModalOpen} handleClose={toggleModal}>
        <form>
          <label htmlFor="email">
            Email
            <input
              id="email"
              placeholder="Enter NTU email"
              type="text"
              value={email}
              onChange={handleOnChange}
            />
          </label>
          <br />

          <label htmlFor="passw">Custom Password </label>
          <input
            id="passw"
            placeholder="Enter password"
            type="password"
            value={passw}
            onChange={handleOnChange}
          />
          <br />
          <button onClick={toggleModal}>Submit</button>
        </form>
      </Modal>
    </div>
  ) : (
    <p>No event found</p>
  );
};

export default EventPage;
