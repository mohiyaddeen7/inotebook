import React, { useContext } from "react";
import notesContext from "../context_useContext/notes/notesContext";
import ModalEdit from "./ModalEdit";
// import { useNavigate } from "react-router-dom";

export default function Notes() {
  const { notes, deleteNote } = useContext(notesContext);
  const handleClick = (id) => {
    deleteNote(id);
  };
  try {
    return (
      <>
        <ModalEdit />
        <div className="row row-cols-1 row-cols-md-3 g-4 my-2 p-4">
          {notes.map((note) => {
            return (
              <div className="col" key={note._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center ">
                    <div className="w-1/4 flex justify-between">
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        id="edit-modal"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-noteid={note._id}
                      >
                        edit_note
                      </span>
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        onClick={() => handleClick(note._id)}
                      >
                        delete
                      </span>
                    </div>
                    <div className="badge text-bg-success mx-3">
                      #{note.tag}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } catch (error) {
    alert("Internal server error");
  }
}
