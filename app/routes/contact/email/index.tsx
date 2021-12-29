import { useForm, ValidationError } from '@formspree/react';
import { useState, useEffect } from 'react';


export default function Email() {
  const [state, handleSubmit] = useForm("moqrqrjw");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (state.succeeded) {
    return (
      <div className="container">
        <h1>Thanks for your message!</h1>
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Email</h1>
      <form className="email" onSubmit={handleSubmit}>
        <label>
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          Name:
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            name="name"
          />
        </label>
        <label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            name="email"
          />
        </label>
        <label>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          Message:
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            rows={5}
            name="message"
          />
        </label>
        {!(name && email && message) && (
          <p
            style={{
              color: "gold",
              fontSize: "1.5rem",
            }}
          >
            Please fill out the form
          </p>
        )}
        <button
          style={{ fontSize: "1.5rem", height: "50px", width: "200px" }}
          className="header-home-link"
          type="submit"
          disabled={!(name && email && message) ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
