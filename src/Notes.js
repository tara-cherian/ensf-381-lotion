import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"


function Notes() {
  const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
  const [selectedNote, setSelectedNote] = useState(0);
  const [notesList, setNotesList] = useState(notesData);
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const navigate = useNavigate();

  const notesUpdated = () => {
    const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
    setNotesList(notesData);
  }

  const showNotes = (id) => {
    setSelectedNote(id);
    navigate(`notes/${id}`)
  }

  const extractContent = (s) => {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  const addNotes = () => {
    const note = {
      title:'Untitled',
      description:'',
      date: '',
      id: uuidv4()
    }
    notesList.push(note);
    localStorage.setItem('notesData', JSON.stringify(notesData));
    notesUpdated();
    let notesLength = notesList.length;
    navigate(`notes/${notesLength - 1}/edit`);
  }

  const addToggleSideBar = () => {
    if(toggleSideBar === true) {
      setToggleSideBar(false);
    }
    else {
      setToggleSideBar(true);
    }
  }

  return (
    <>
      <header id="title">
        <button className="menu" onClick={addToggleSideBar}>&#9776;</button>
        <h1>Lotion</h1>
        <div id="sub-title">
          Like Notion, but worse.
        </div>
      </header>
      <div id="content">
        <div className="container">
        {toggleSideBar ? (
          <div id="left-section">
          <header className="header">
            <h2>Notes</h2>
            <button className="buttons" onClick={addNotes}>+</button>
          </header>
          <div id="notes-list">{
            notesList.map((notes, index) => {
              return (
                <div key={notes.id} className={index === selectedNote ? " notesDiv selectedNotesDiv" : "notesDiv"} onClick={() => showNotes(index)}>
                  <h3>{notes.title}</h3>
                  <div className="date">{notes.date}</div>
                  <div className="description">{extractContent(notes.description)}</div>
                </div>
              )
            })
          }</div>
        </div>
      ) : (
          ""
      )}
          <div id="right-section"><Outlet context={['temp', notesUpdated]} /></div>
        </div>
      </div>
    </>
  )
}

export default Notes;