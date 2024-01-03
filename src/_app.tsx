import "./App.css";
import React, { useEffect, useState } from "react";
import { ParticipantType } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/store";
import { xxxx, yyyy } from "./state/counter/counterSlice";
function App() {
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      fetch("http://localhost:8080/getparticipants")
        .then((response) => response.json())
        .then((data) => setParticipants(data));
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className="App">
      {count}
      {participants.map((participant, idx) => {
        return <div key={idx}>{participant.fullname}</div>;
      })}
      <button onClick={() => dispatch(xxxx())}>+</button>
      <button onClick={() => dispatch(yyyy())}>-</button>
    </div>
  );
}

export default App;
