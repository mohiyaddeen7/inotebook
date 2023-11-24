import { useState } from "react";
import NotesContext from "./notesContext";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const NotesState = ({ children }) => {
  const notesInitial = [];
  const navigate = useNavigate();

  const getNotes = async () => {
    console.log("get");
    try {
      const response = await fetch(
        "https://inotebook-8iwp.onrender.com/api/notes/fetchallnotes",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },

          // body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        const data = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(data);
      }
    } catch (error) {
      return error.message;
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch("https://inotebook-8iwp.onrender.com/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      return error.message;
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        `https://inotebook-8iwp.onrender.com/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      let result = await response.text();
      if (result === "success") {
        getNotes();
        console.log("success");
      }
    } catch (error) {
      return error.message;
    }
  };

  const editNote = async (title, description, tag, id) => {
    const response = await fetch(
      `https://inotebook-8iwp.onrender.com/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const result = await response.json();
    if (result) {
      getNotes();
    }
  };

  const verify = async (jwt_token, email) => {
    try {
      let templateParams = {
        message: `https://inotebook-8iwp.onrender.com/api/auth/verify/${jwt_token}`,
        recepient: email,
      };

      emailjs
        .send(
          "service_2bfd1ye",
          "template_pevkjwr",
          templateParams,
          "f6uNhSkrXxiEaOXCH"
        )
        .then(() => {
          console.log("mail sent successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error occurred while sending mail");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("https://inotebook-8iwp.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("mohiyaddeen raza");

        console.log(result.e_verification);
        if (result.e_verification === false) {
          navigate("/Verification_needed");
        } else {
          localStorage.setItem("token", result.jwt);
          navigate("/");
        }
      }
      else{
        alert("Enter Correct Credentials")
      }
    } catch (error) {
      alert("Some error occurred")
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(
        "https://inotebook-8iwp.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        verify(result.jwt, email);
        navigate("/login");
      }
      else{
        alert("Enter Correct Credentials")
      }
    } catch (error) {
      alert("Some error occurred")
    }
  };

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        login,
        signup,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesState;
