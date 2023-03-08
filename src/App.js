import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Notes from "./Notes";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Notes />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
