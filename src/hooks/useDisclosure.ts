import { useState } from "react";

interface UseDisclosureReturn {
  isOpen: boolean;
  toggle: () => void;
  getDisclosureProps: () => { "aria-expanded": boolean };
  getButtonProps: () => { onClick: () => void };
}

const useDisclosure: () => UseDisclosureReturn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const getDisclosureProps = () => ({
    "aria-expanded": isOpen,
  });

  const getButtonProps = () => ({
    onClick: toggle,
  });

  return { isOpen, toggle, getDisclosureProps, getButtonProps };
};

export default useDisclosure;
