import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";

function NoteModal({
  currNote,
  isModalOpen,
  setCurrNoteModal,
  handleClickCloseModal,
  handleUpdateClick,
}) {
  if (isModalOpen) {
    return (
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal-card">
            <button
              className="Xmark"
              onClick={() => handleClickCloseModal(true)}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
            </button>
            {currNote && (
              <>
                <input
                  type="text"
                  placeholder="title"
                  value={currNote.title}
                  onChange={(e) => setCurrNoteModal((prevNote) => ({
                    ...prevNote,
                    title:e.target.value
                  }))}
                />
                <textarea
                  className="textarea"
                  placeholder="Enter your note here..."
                  value={currNote.text}
                  onChange={(e) => setCurrNoteModal((prevNote) => ({
                    ...prevNote,
                    text:e.target.value
                  }))}
                  cols="30"
                  rows="5"
                />
              </>
            )}
            <button onClick={()=>handleUpdateClick(currNote)}>Update</button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default NoteModal;
