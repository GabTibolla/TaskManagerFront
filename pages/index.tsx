import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/navBar";
import CriarTask from "@/pages/criar_task";
import Listar from "@/pages/listar_usuarios";
import Update from "@/pages/update";
import ProtectedRoute from "@/components/protectRoute";
import Login from "@/pages/login";
import CriarSubTask from './criar_subtask';
import ListarTask from './listar_task';

// importando imagem
import img from '../imagemHome.png';
import EditarTask from './editar_task';
import ListarSubTask from './listar_subtask';
import CriarUsuario from './criar_usuario';
import EditarUsuario from './editar_usuario';

export default function Home() {
    return (
        <Router>
            <header>
                <NavBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                {/* Substitua o h1 pela tag img */}
                                <img
                                    src={img.src} // Acesse a URL da imagem através da propriedade src
                                    alt="Home"
                                    style={{ maxWidth: 600, maxHeight: 600 }}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/criartask"
                        element={
                            <ProtectedRoute>
                                <CriarTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/criarsubtask"
                        element={
                            <ProtectedRoute>
                                <CriarSubTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/criarUsuario"
                        element={
                            <ProtectedRoute>
                                <CriarUsuario />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/editartask/:taskId"
                        element={
                            <ProtectedRoute>
                                <EditarTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/editarUsuario/:idUser"
                        element={
                            <ProtectedRoute>
                                <EditarUsuario />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listar"
                        element={
                            <ProtectedRoute>
                                <Listar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listarTask"
                        element={
                            <ProtectedRoute>
                                <ListarTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listarSubtask/:taskId"
                        element={
                            <ProtectedRoute>
                                <ListarSubTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/atualizar/:itemId"
                        element={
                            <ProtectedRoute>
                                <Update />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}
