import React, { useState } from "react";

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNum] = useState("");

  const handleSubmit = () => {
    // Todo: use fetch with post method and add required attributes to fetch
    fetch("/api/job/apply", { method: "POST", body: { name, email, number } })
      .then((res) => res.json())
      .then((jobsRes) => setJObItems(jobsRes.jobs))
      .catch((err) => console.log("job items fetch err", err));
  };

  const Input = ({ placeholder, value, handleChange }) => {
    const handleInput = (e) => {
      handleChange(e.target.value);
    };
    return (
      <input
        type="text"
        class="input-form"
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
    );
  };

  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={onClose}>
            &times;
          </span>
          <div class="form">
            <Input placeholder="name" value={name} handleChange={setName} />
            <Input placeholder="email" value={email} handleChange={setEmail} />
            <Input
              placeholder="phone number"
              value={number}
              handleChange={setNum}
            />
            <br />
            <div class="row">
              <label>upload resume</label>
              <input type="file" accept="application/*" />
            </div>
            <br />
            <br />
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
