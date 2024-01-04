import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
// import { Portal, PortalTarget } from "./Portal.component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { CustomButton } from "../styles/utils";

const EventPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = useState<boolean>(false);
  const toggleModal = () => setModalState(!isModalOpen);
  const [inputValue, setInputValue] = useState({
    email: "",
    passw: "",
  });

  const [focusedShift, setFocusedShift] = useState(0);

  const { email, passw } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
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

  const handleSignUp = async (requestBody: {
    is_allocated: boolean;
    participant_id: number;
    event_id: number;
    shift_id: number;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/addavailability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const { mutateAsync: signUpMutation } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {
      const filter = {
        queryKey: ["event"],
      };
      queryClient.invalidateQueries(filter);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let account: any = null;

      const isParticipant = await fetch(
        "http://localhost:8080/is_participant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValue),
        },
      );

      if (!isParticipant.ok) {
        throw new Error(`HTTP error! Status: ${isParticipant.status}`);
      }

      account = await isParticipant.json();
      console.log(account);
      if (!account) {
        const participantRequest = {
          fullname: "",
          email: inputValue.email,
          passw: inputValue.passw,
          isBoss: false,
          createdAt: new Date().toString(),
        };
        console.log(participantRequest);
        const participantResponse = await fetch(
          "http://localhost:8080/addparticipant",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(participantRequest),
          },
        );

        if (!participantResponse.ok) {
          throw new Error(`HTTP error! Status: ${participantResponse.status}`);
        }

        account = await participantResponse.json();
      }
      console.log(account);
      const signUpRequest = {
        is_allocated: false,
        participant_id: account.id,
        event_id: parseInt(id ? id : "-1"),
        shift_id: focusedShift,
      };
      console.log(signUpRequest);
      const result = await signUpMutation(signUpRequest);
      console.log(result);
      toggleModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : event ? (
    <div className='container'>
      <div>
        <span className='header-text'>Event #{id}</span>
        <div className='event-card' key={event.id}>
          <Link to={`/event/${event.id}`} className='event-title'>
            {event.title}
          </Link>
          <p className='event-description'>{event.description}</p>
        </div>
      </div>
      <div className='event-creator'>
        <span>Created by: {event.boss.fullname}</span>
        <span>Created at: {event.boss.createdAt}</span>
      </div>
      <div className='container'>
        <div className='event-desc-card'>
          <span className='event-desc-card-title'>Help needed during:</span>

          <div className='event-blocks'>
            {event.shifts.map((shift: any, idx: number) => {
              return (
                <div key={shift.id} className='event-shift'>
                  <span>Slot {idx + 1}:</span>
                  <div>
                    <span> - {shift.start_time}</span> to{" "}
                    <span>{shift.end_time}</span>
                    {auth.id === -1 && (
                      <CustomButton
                        className='event-signup'
                        onClick={() => {
                          toggleModal();
                          setFocusedShift((curShift) => shift.id);
                        }}
                      >
                        Sign up
                      </CustomButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='event-desc-card'>
          <span className='event-desc-card-title'>Current Sign ups:</span>
          <div className='event-blocks'>
            {event.availabilities.length > 0 ? (
              event.availabilities.map((availability: any) => {
                return (
                  <div
                    className='event-availability'
                    key={availability.participant.id}
                  >
                    <span>User #{availability.participant.id}: </span>
                    <span> - {availability.participant.email}</span>
                    <span>
                      - Allocated: {availability.is_allocated ? "Yes" : "No"}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} handleClose={toggleModal}>
        <form className='post-form' onSubmit={handleSubmit}>
          <div className='field-group'>
            {" "}
            <label htmlFor='email'>Email</label>
            <input
              className='field-input'
              id='email'
              placeholder='Enter NTU email'
              type='text'
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className='field-group'>
            <label htmlFor='passw'>Custom Password </label>
            <input
              className='field-input'
              id='passw'
              placeholder='Enter password'
              type='password'
              value={passw}
              onChange={handleOnChange}
            />
          </div>{" "}
          <CustomButton type='submit'>Submit</CustomButton>
        </form>
      </Modal>
    </div>
  ) : (
    <p>No event found</p>
  );
};

export default EventPage;
