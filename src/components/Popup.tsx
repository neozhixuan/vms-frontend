import React from "react";
import { ChildrenProps } from "../styles/types";

const Popup: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="popup">{children}</div>;
};

export default Popup;
