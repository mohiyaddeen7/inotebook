import React from "react";
import Notes from "../components/Notes";
import Addnote from "./Addnote";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="">
          <Addnote />
        </div>
        <div className="p-12">
          <h2 className="text-2xl p-4 font-bold">Your Notes</h2>
          <Notes />
        </div>
      </div>
    </>
  );
}
