import React, { useState } from "react";
import Modal from "./Modal";

// Todo: add proptypes or just use typescript later.
function JobItem({ position, logo, skills }) {
  const [showJobApplyModal, setShowJobApplyModal] = useState(false);
  const toggleApplyModal = () => {
    setShowJobApplyModal((prev) => !prev);
  };
  return (
    <div class="jobitem">
      <img class="logo" src={logo} alt="logo" />
      <div>
        <h2>{position}</h2>
        <div class="row">
          {skills.map((s) => {
            return <p>{s}</p>;
          })}
        </div>
      </div>

      <button onClick={toggleApplyModal}>apply</button>
      {showJobApplyModal && <Modal onClose={toggleApplyModal} />}
    </div>
  );
}

export default JobItem;
