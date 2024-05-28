import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/navBar";
import CriarTask from "@/pages/criar_task";
import Listar from "@/pages/listar";
import Update from "@/pages/update";
import LoginForm from './'; // Importe o LoginForm

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <NavBar />
        </header>
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/registrar" element={<CriarTask />} />
            <Route path="/listar" element={<Listar />} />
            <Route path="/atualizar/:itemId" element={<Update />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
