import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function NoteList({ notes, handleDeleteNote, handleClickOpenModal }) {
  console.log('notes: ', notes);
  return (
    <div className="grid-note">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <button className="Xmark" onClick={() => handleDeleteNote(note.id)}>
            <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
          </button>
          <div
            className="content-card"
            onClick={() => handleClickOpenModal(true, note)}
          >
            <p>{note.createdDate}</p>
            {note.updateTime && <p>{note.updateTime}</p>}
            <h1>{note.title}</h1>
            <h2>{note.text}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
