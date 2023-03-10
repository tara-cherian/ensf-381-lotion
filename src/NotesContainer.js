import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function NotesContainer() {
    const [someParameter, notesUpdated] = useOutletContext();
    const { notesId } = useParams();

    const navigate = useNavigate();
    let notesTemp = {};
    const [notesContent, setNotesContent] = useState(notesTemp);
    
    useEffect(() => {
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined)
                setNotesContent(notesData[notesId]);
            else
                setNotesContent(notesData[0]);
        }
    }, [notesId])



    const extractContent = (s) => {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

    const editNotes = () => {
        navigate(`../notes/${notesId}/edit`, { replace: true });
    }

    const deleteNotes = () => {
        const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
        if (notesData.length > 0) {
            if (notesId !== undefined) {
                notesData.splice(notesId, 1);
                localStorage.setItem('notesData', JSON.stringify(notesData));
                setNotesContent(notesData[0])
                notesUpdated(someParameter);
                if (notesData.length > 0)
                    navigate(`../notes/${notesData.length - 1}/edit`, { replace: true });
                else
                    navigate(`../notes`, { replace: true });
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

// import { useParams, useNavigate, useOutletContext } from "react-router-dom";
// import { useState } from "react";

// function NotesContainer() {
//     const [someParameter, notesUpdated] = useOutletContext();
//     const { notesId } = useParams();

//     const navigate = useNavigate();
//     const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
//     let notesTemp = {};
//     if (notesData.length > 0) {
//         if (notesId !== undefined)
//             notesTemp = notesData[notesId];
//         else
//             notesTemp = notesData[0];
//     }

//     const [notesContent, setNotesContent] = useState(notesTemp);

//     const extractContent = (s) => {
//         var span = document.createElement('span');
//         span.innerHTML = s;
//         return span.textContent || span.innerText;
//     };

//     const editNotes = () => {
//         navigate(`../notes/${notesId}/edit`, { replace: true });
//     }

//     const deleteNotes = () => {
//         const notesData = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];
//         if (notesData.length > 0) {
//             if (notesId !== undefined) {
//                 notesData.splice(notesId, 1);
//                 localStorage.setItem('notesData', JSON.stringify(notesData));
//                 setNotesContent(notesData[0])
//                 notesUpdated(someParameter);
//                 if (notesData.length > 0)
//                     navigate(`../notes/${notesData.length - 1}/edit`, { replace: true });
//                 else
//                     navigate(`../notes`, { replace: true });
//             }
//         }
//     }

//     return (
//         <>
//             {Object.keys(notesContent).length > 0 ?
//                 (<div>
//                     <div className="header">
//                         <header className="leftHeader">
//                             <h2>{notesContent.title}</h2>
//                             <div id="sub-title">
//                                 {notesContent.date}
//                             </div></header>

//                         <div className="sideButtons">
//                             <button className="editDeleteButtons" onClick={editNotes}>Edit</button>
//                             <button className="editDeleteButtons" onClick={deleteNotes}>Delete</button>
//                         </div>
//                     </div>
//                     <div className="content">
//                         {extractContent(notesContent.description)}
//                     </div>
//                 </div>) : (
//                     <div className="noContent">No notes found!</div>
//                 )}
//         </>
//     )
// }

// export default NotesContainer;