import { useContext, useState } from "react";
import notesContext from "../context_useContext/notes/notesContext";

export default function Addnote() {
  const { addNote } = useContext(notesContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag ? note.tag : "General");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  try {
    return (
      <div className="addNotes p-12 bg-green-500 w-full ">
        <div className="text-2xl p-4 font-bold">
          <h2>Add a new note</h2>
        </div>
        <form
          className="p-4 flex flex-col items-start justify-center w-full "
          onSubmit={handleSubmit}
        >
          <div className="p-2 flex justify-start flex-col items-center w-full">
            <label className="self-start py-2">Title</label>
            <input
              type="text"
              className="p-2 rounded-md  self-start"
              placeholder="Required title"
              id=""
              value={note.title}
              onChange={onChange}
              name="title"
              required
            />
          </div>
          <div className="p-2 flex justify-center flex-col items-center w-full">
            <label className="self-start py-2">Description</label>
            <textarea
              className="p-2 rounded-md w-full h-56"
              id="validationTextarea"
              placeholder="Required example textarea"
              value={note.description}
              onChange={onChange}
              name="description"
              required
            ></textarea>
          </div>
          <div className="p-2 flex justify-center flex-col items-center w-full">
            <label className="self-start py-2">Tag</label>
            <input
              type="text"
              className=" p-2 rounded-md self-start"
              id="tag"
              value={note.tag}
              placeholder="General"
              onChange={onChange}
              name="tag"
            />
          </div>
          <div className="p-2">
            <button
              className="p-2 border-2 border-white rounded-md hover:shadow-2xl hover:text-green-500 hover:bg-white transition-all"
              type="submit"
            >
              Add note
            </button>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    alert("Internal server error")
  }
}
