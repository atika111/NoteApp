import React, { useEffect, useState } from "react";
import NoteList from "./NoteList";
import NoteModal from "./NoteModal";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import TextareaAutosize from "react-textarea-autosize";

const NoteForm = ({ style }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currNoteModal, setCurrNoteModal] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const handleAddNote = () => {
    if (textareaValue === "") return;

    const newNote = {
      id: nanoid(),
      title: titleValue,
      text: textareaValue,
      createdDate: format(new Date(), "MMM d, yyyy - HH:mm"),
    };
    setNotes([...notes, newNote]);
    setTitleValue("");
    setTextareaValue("");
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
  };

  const handleDeleteNote = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete your note?"
    );
    if (isConfirm) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const handleClickOpenModal = (isOpen, currNote) => {
    setIsModalOpen(isOpen);
    if (currNote && isOpen) {
      setCurrNoteModal(currNote);
    }
  };

  const handleUpdateClick = (updatedNote) => {
    if (!updatedNote.text) return;

    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? { ...note, ...updatedNote } : note
    );

    setNotes(updatedNotes);
    setIsModalOpen(false);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <div className="note-form-container" style={style}>
        <input
          type="text"
          placeholder="title"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <TextareaAutosize
          className="textarea"
          placeholder="Enter your note here..."
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          cols="30"
          rows="5"
        />
        {isModalOpen ? (
          <button onClick={() => handleUpdateClick(currNoteModal)}>Update</button>
        ) : (
          <button onClick={handleAddNote}>Add</button>
        )}
      </div>
      <NoteList
        notes={notes}
        handleDeleteNote={handleDeleteNote}
        handleClickOpenModal={handleClickOpenModal}
      />
      <NoteModal
        notes={notes}
        handleClickCloseModal={() => setIsModalOpen(false)}
        handleUpdateClick={handleUpdateClick}
        isModalOpen={isModalOpen}
        currNote={currNoteModal}
        setCurrNoteModal={setCurrNoteModal}
      />
    </div>
  );
};

export default NoteForm;
