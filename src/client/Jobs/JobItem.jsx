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
      <div class="jobitem-info">
        <h2 class="title"> {position}</h2>
        <div class="row">
          {skills.map((s) => {
            return (
              <p class="skill" key={s}>
                {s}
              </p>
            );
          })}
        </div>
      </div>
      <button onClick={toggleApplyModal}>apply</button>
      {showJobApplyModal && <Modal onClose={toggleApplyModal} />}
    </div>
  );
}

export default JobItem;
