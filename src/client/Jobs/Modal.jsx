import React, { useState } from "react";

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNum] = useState("");

  const handleSubmit = () => {
    // Todo: upload file and proper validation for form fields.
    fetch("/api/job/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: number,
        resumeUrl:
          "https://docs.google.com/document/d/1DP5e1c-n33rKBn_D1lEy1XdE7JygSU8-8e8Uc7MsaHQ/edit",
      }),
      // resume url here is mine. I don't have enough time to implment this right now and I'm very hungry. I can't think when I'm hungry.
    })
      .then((res) => res.json())
      .then((jobsRes) => setJObItems(jobsRes.jobs))
      .then(() => {
        onClose();
        alert("succesfully submitted");
      })
      .catch((err) => console.log("job items fetch err", err));
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNum = (e) => {
    setNum(e.target.value);
  };

  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={onClose}>
            &times;
          </span>
          <div class="form">
            <input
              type="text"
              class="input"
              placeholder="name"
              value={name}
              onChange={handleName}
            />
            <input
              type="text"
              class="input"
              placeholder="email"
              value={email}
              onChange={handleEmail}
            />
            <input
              type="text"
              class="input"
              placeholder="phone number"
              value={number}
              onChange={handleNum}
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
