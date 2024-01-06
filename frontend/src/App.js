import { useState } from "react";
import Form from "./components/Form/Form";
import Menu from "./components/Menu/Menu";
import './styles/global.scss';

function App() {
  
  const [page, setPage] = useState("Cadastro")

  return (
    <div className="container">

      <Menu />

      <View page={page} />

      <Form />

    </div>
  );
}

export default App;
