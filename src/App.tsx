import MyLayout from "./Layouts/mainLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
