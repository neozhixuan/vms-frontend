import React from "react";
import { ChildrenProps } from "../styles/types";
// import { Portal, PortalTarget } from "./Portal.component";
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal: React.FC<ModalProps & ChildrenProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  const modalRef = React.useRef(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };
  return isOpen ? (
    <div>
      <div className="blur-background" ref={modalRef} onClick={closeModal} />
      <div className="modal-container">{children}</div>
    </div>
  ) : null;
};

export default Modal;
