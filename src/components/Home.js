import React, { useContext, useEffect } from "react";
import Notes from "../components/Notes";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import notesContext from "../context_useContext/notes/notesContext";
export default function Home() {
  const { getNotes, notes } = useContext(notesContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getNotes();
    }
  }, [notes]);
  try {
    return (
      <>
        <div className="">
          <div className="">
            <Addnote />
          </div>
          <div className="p-8">
            <h2 className="text-2xl p-4 font-bold">Your Notes</h2>
            <Notes />
          </div>
        </div>
      </>
    );
  } catch (error) {
    alert("Internal server error");
  }
}
