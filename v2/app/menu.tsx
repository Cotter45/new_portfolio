import { useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.querySelector("main");
    const close = () => setIsOpen(false);

    body?.addEventListener("click", close);

    return () => body?.removeEventListener("click", close);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <Hamburger toggled={isOpen} toggle={setIsOpen} />

      <div
        style={{
          right: isOpen ? "0" : "-400px",
        }}
        className="menu"
      >
        <a
          href="https://github.com/Cotter45"
          className="logo"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub />
          <h5>Github</h5>
        </a>

        <a
          href="https://www.linkedin.com/in/sean-cotter-43572417/"
          className="logo"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaLinkedin />
          <h5>LinkedIn</h5>
        </a>
      </div>
    </nav>
  );
}