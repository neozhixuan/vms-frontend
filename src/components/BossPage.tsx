import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
const BossPage = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.id !== -1 ? <div>boss</div> : <div>No access granted</div>;
};

export default BossPage;
