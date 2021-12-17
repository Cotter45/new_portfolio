import {
  useTransition,
} from "remix";
import { useForm, ValidationError } from '@formspree/react';

export default function Email() {
  const [state, handleSubmit] = useForm("moqrqrjw");
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
      <form className='email' onSubmit={handleSubmit}>
        <label>
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          Name: 
          <input id="name" type="text" name="name" />
        </label>
        <label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          Email:
          <input id="email" type="email" name="email" />
        </label>
        <label>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          Message:
          <textarea id="message" rows={5} name="message" />
        </label>
        <button style={{ fontSize: '1.5rem' }} className='header-home-link' type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
