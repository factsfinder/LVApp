import React from "react";

function Modal({ onClose }) {
  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={onClose}>
            &times;
          </span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </>
  );
}

export default Modal;
