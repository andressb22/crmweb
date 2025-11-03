import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ImageViewer from "./pages/ImageViewer";
import ImageLayout from "./layouts/ImageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/imageviewer/:inm_id" element={<ImageLayout />}>
          <Route path=":id_reference" element={<ImageViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
