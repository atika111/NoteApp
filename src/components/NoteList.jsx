import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import NoteModal from "./NoteModal";

function NoteList({ notes, handleDealetNote, handleClickOpenModal}) {
  return (
    <div className="grid-note">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <button className="Xmark" onClick={() => handleDealetNote(note.id)}>
            <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
          </button>
          <div className="content-card" onClick={() => handleClickOpenModal(true, note)}>
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
