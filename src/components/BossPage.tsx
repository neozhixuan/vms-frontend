import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { fetchBossEvent } from "../services/fetchServices";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { CustomButton } from "../styles/utils";
import { handlePostSubmit } from "../services/fetchServices";
const BossPage = () => {
  const { id } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = useState<boolean>(false);
  const toggleModal = () => setModalState(!isModalOpen);
  const emptyShift = { id: 0, start_time: "", end_time: "" };
  const initialInputValue = {
    title: "",
    description: "",
    shifts: [emptyShift],
  };
  const [inputValue, setInputValue] = useState(initialInputValue);
  const queryClient = useQueryClient();

  const { title, description, shifts } = inputValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValue({
      ...inputValue,
      [id]: value,
    });
  };
  const handleShiftOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const { id, value } = e.target;
    const updatedShifts = shifts.map((shift) =>
      shift.id === idx ? { ...shift, [id]: value } : shift,
    );
    console.log(updatedShifts);

    setInputValue({
      ...inputValue,
      shifts: updatedShifts,
    });
  };

  const { data: bossEvent, isLoading } = useQuery({
    queryFn: () => fetchBossEvent(parseInt(id ? id : "0")),
    queryKey: ["bossevent", { id }],
    staleTime: 1000,
  });

  const addShift = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emptyShift.id = shifts[shifts.length - 1].id + 1;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      shifts: [...prevInputValue.shifts, emptyShift],
    }));
  };

  const cancelShift = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    console.log(idx);
    console.log(shifts);
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      shifts: prevInputValue.shifts.filter((shift) => shift.id !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedShifts = shifts.map((shift) => ({
      start_time: shift.start_time,
      end_time: shift.end_time,
    }));
    const requestBody = JSON.stringify({
      title: inputValue.title,
      description: inputValue.description,
      shifts: formattedShifts,
      boss_id: parseInt(id ? id : "0"),
    });
    eventMutation(requestBody)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    toggleModal();
  };

  const { mutateAsync: eventMutation } = useMutation({
    mutationFn: handlePostSubmit,
    onSuccess: () => {
      const filter = {
        queryKey: ["bossevent"],
      };
      queryClient.invalidateQueries(filter);
    },
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : auth.id !== -1 ? (
    <div className='container'>
      <div>
        <p className='header-text'>{auth.fullname}</p>
        <div className='boss-details'>
          <span>
            <b>Company:</b> {auth.company}
          </span>
          <span>
            <b>Email:</b> {auth.email}
          </span>
          <span>
            <b>Birthday:</b> {auth.birthday}
          </span>
        </div>
      </div>
      <hr />
      <div>
        <h2>My events:</h2>
        {bossEvent.map((event: any) => (
          <div className='event-card' key={event.id}>
            <Link to={`/event/${event.id}`} className='event-title'>
              {event.id}: {event.title}
            </Link>
            <p className='event-description'>{event.description}</p>
          </div>
        ))}
        <CustomButton onClick={toggleModal}>Create Event</CustomButton>
      </div>
      <Modal isOpen={isModalOpen} handleClose={toggleModal}>
        <form className='post-form'>
          <div className='field-group'>
            {" "}
            <label htmlFor='title'>Title</label>
            <input
              className='field-input'
              id='title'
              placeholder='Enter title'
              type='text'
              value={title}
              onChange={handleOnChange}
            />
          </div>
          <div className='field-group'>
            <label htmlFor='description'>Description </label>
            <input
              className='field-input'
              id='description'
              placeholder='Enter description'
              type='description'
              value={description}
              onChange={handleOnChange}
            />
          </div>
          <div className='field-group'>
            <label htmlFor='shift'>Shifts (start, end)</label>
            {shifts.map((shift, idx) => (
              <div className='shift-input' id='shift' key={idx}>
                <input
                  className='field-input'
                  id='start_time'
                  aria-label='Date and time'
                  type='datetime-local'
                  onChange={(e) => handleShiftOnChange(e, idx)}
                />
                <input
                  className='field-input'
                  id='end_time'
                  aria-label='Date and time'
                  type='datetime-local'
                  onChange={(e) => handleShiftOnChange(e, idx)}
                />
                {idx === 0 ? (
                  <button className='field-input' onClick={addShift}>
                    +
                  </button>
                ) : (
                  <button
                    className='field-input'
                    onClick={(e) => cancelShift(e, idx)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
          <CustomButton onClick={handleSubmit}>Submit</CustomButton>
        </form>
      </Modal>
    </div>
  ) : (
    <div>No access granted</div>
  );
};

export default BossPage;
