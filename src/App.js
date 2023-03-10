import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notes from "./Notes";
import NotesContainer from "./NotesContainer";
import NotesEditor from "./NotesEditor";
import EmptyNotesContainer from "./EmptyNotesContainer";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Notes />}>
        <Route path="/notes" element={<NotesContainer />}></Route>
          <Route path="/notes" element={<EmptyNotesContainer />}></Route>
          <Route path="/notes/:notesId" element={<NotesContainer />}></Route>
          <Route path="/notes/:notesId/edit" element={<NotesEditor />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Notes from "./Notes";
// import NotesContainer from "./NotesContainer";
// import NotesEditor from "./NotesEditor";

// function App() {
//   return(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Notes />}>
//         <Route path="/notes" element={<NotesContainer />}></Route>
//           <Route path="/notes/:notesId" element={<NotesContainer />}></Route>
//           <Route path="/notes/:notesId/edit" element={<NotesEditor />}></Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;
