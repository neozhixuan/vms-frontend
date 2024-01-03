import React from "react";
import ReactDOM from "react-dom";

export enum PortalTarget {
  MODAL = "modal-portal",
  ROOT = "root",
}

interface PortalProps {
  target: string;
}

export const Portal: React.FC<PortalProps & { children: React.ReactNode }> = ({
  target,
  children,
}) => {
  const domElement = document.getElementById(target);
  return domElement ? ReactDOM.createPortal(children, domElement) : null;
};
