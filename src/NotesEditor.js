import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useOutletContext } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';


function NotesEditor() {
    const [someParameter, notesUpdated] = useOutletContext();
    const { notesId } = useParams();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('Untitled');
    const navigate = useNavigate();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    const [date, setDate] = useState('2018-06-12T19:30');
    const [fDate, setFDate] = useState(formatDate('2018-06-12T19:30'));

    const changeDate = (e) => {
        const formattedDate = formatDate(e.target.value);
        setDate(e.target.value);
        setFDate(formattedDate);
    }

    const saveData = () => {
        console.log("save", description);
        const note = {
            title,
            description,
            date: fDate,
            id: uuidv4()
        }
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesId !== undefined) {
            notesData[notesId] = note;
        }
        else {
            notesData.push(note);
        }
        localStorage.setItem('notesData', JSON.stringify(notesData));
        notesUpdated(someParameter);
    }

    const deleteData = () => {
        console.log("delete", description);
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined){
                notesData.splice(notesId, 1);
                localStorage.setItem('notesData', JSON.stringify(notesData));
                setDescription("");
                notesUpdated(someParameter);
                navigate(`../notes/${notesData - 1}/edit`, { replace: true });
            }
        }

    }

    const showNotes = () => {
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined) {
                if (notesId < notesData.length) {
                    const { title, description, fDate } = notesData[notesId];
                    setTitle(title);
                    setDescription(description);
                    setFDate(fDate);
                }
            }
        }
        saveData();
    }

    useEffect(() => {
        showNotes();
    })

    return <>
     <div className="header">
                        <header className="leftHeader">
                        <input className="titleBox" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        <input className="dateBox" type="datetime-local" value={date} onChange={changeDate} />
                        </header>

                        <div className="sideButtons">
                        <button className="editDeleteButtons" onClick={saveData}>Save</button>
                        <button className="editDeleteButtons" onClick={deleteData}>Delete</button>
                        </div>
                    </div>
        <div>
        </div>
        <ReactQuill className="textBox" theme="snow" value={description} onChange={setDescription} />;
    </>
}

export default NotesEditor;