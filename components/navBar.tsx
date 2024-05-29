import { Link } from "react-router-dom";
import Logout from "@/components/logout";
import AuthContext from "@/components/authContext";
import { useContext } from "react";

export default function NavBar() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        isAuthenticated ?
            <nav className="nav navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-nav mr-auto">
                        <Link to="/" className="navbar-brand px-3">
                            <span className="navbar-text">Task Manager</span>
                        </Link>
                        <li className="nav-item">
                            <Link to={"/criartask"} className="nav-link">
                                Criar Tarefa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/ListarTask"} className="nav-link">
                                Listar Tarefas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/listar"} className="nav-link">
                                Listar Usuários
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/criarUsuario"} className="nav-link">
                                Criar Usuário
                            </Link>
                        </li>
                    </div>
                    <div className="navbar-nav ml-auto px-3">
                        <li className="nav-item">
                            <Logout />
                        </li>
                    </div>
                </div>
            </nav> : null
    )
}