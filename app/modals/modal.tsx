import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTransition, animated } from "@react-spring/web";

const ModalContext = React.createContext(undefined);

export function ModalProvider({ children }: any) {
  const modalRef = useRef<any>();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: any) {
  const modalNode = useContext(ModalContext);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const root = document.getElementById("root");
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    if (root) {
      root.style.overflow = "hidden";
    }
    if (html) {
    html.style.overflow = "hidden";
    }
    if (body) {
    body.style.overflow = "hidden";
    }

    return () => {
      if (root) {
      root.style.overflow = "auto";
      }
      if (html) {
      html.style.overflow = "auto";
      }
      if (body) {
      body.style.overflow = "auto";
      }
    };
  });

  const transitions = useTransition(showModal, {
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
  });

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      {transitions((style, index) => (
        <animated.div style={style} id="modal-content">
          {children}
        </animated.div>
      ))}
    </div>,
    modalNode
  );
}
