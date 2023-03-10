import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function NotesContainer() {
    const [someParameter, notesUpdated] = useOutletContext();
    const { notesId } = useParams();
    const [notesContent, setNotesContent] = useState({});
    const navigate = useNavigate();
    const showNotes = () => {
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined)
                setNotesContent(notesData[notesId]);
            else
                setNotesContent(notesData[0]);
        }
    }

    const extractContent = (s)=> {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
      };
          
    useEffect(() => {
        showNotes();
    })

    const editNotes = ()=>{
        navigate(`../notes/${notesId}/edit`, { replace: true });
    }

    const deleteNotes = ()=>{
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined){
                notesData.splice(notesId, 1);
                localStorage.setItem('notesData', JSON.stringify(notesData));
                setNotesContent(notesData[0])
                notesUpdated(someParameter);
            }
        }
    }

    return (
        <>
            {Object.keys(notesContent).length > 0 ?
                (<div>
                    <div className="header">
                        <header className="leftHeader">
                            <h2>{notesContent.title}</h2>
                            <div id="sub-title">
                                {notesContent.date}
                            </div></header>

                        <div className="sideButtons">
                            <button className="editDeleteButtons" onClick={editNotes}>Edit</button>
                            <button className="editDeleteButtons" onClick={deleteNotes}>Delete</button>
                        </div>
                    </div>
                    <div className="content">
                        {extractContent(notesContent.description)}
                    </div>
                </div>) : (
                    <div className="noContent">No notes found!</div>
                )}
        </>
    )
}

export default NotesContainer;