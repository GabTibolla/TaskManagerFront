import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "@/components/authContext";
import TaskService from "@/services/taskService";
import { FaUsersViewfinder, FaV } from 'react-icons/fa6';

const ListarTask = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState<any>(null);
    const [error, setError] = useState(null);
    const { setIdTask } = useContext(AuthContext);

    const { id } = useContext(AuthContext);

    useEffect(() => {
        TaskService.getTasks(id).then((data) => {
            setTasks(data);
            console.log(data);
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error);
            setError(error);
        });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tasks) {
        return <div>Não há dados a serem exibidos</div>;
    }

    const handleAddSubTask = (taskId: any) => {
        localStorage.setItem('taskId', taskId);
        setIdTask(taskId);
        navigate('/criarsubtask');
    };

    const handleEditTask = (taskId: any) => {
        navigate(`/editartask/${taskId}`);
    };

    const handleDeleteTask = (taskId: any) => {
        TaskService.deleteTask(id, taskId).then((data) => {
            console.log(data);
            navigate('/');
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error);
            setError(error);
        });
    };

    const handleViewSubTasks = (taskId: any) => {
        navigate(`/listarSubtask/${taskId}`);
    };

    return (
        <div>
            <h3>Lista de Tarefas</h3>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Atribuído para</th>
                        <th>Status</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: any) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}</td>
                            <td>{task.assignedByUser.name}</td>
                            <td>{task.status}</td>
                            <td>{task.createdAt}</td>
                            <td>
                                <Button variant="outline-success" className="ml-2" onClick={() => handleViewSubTasks(task.id)}>
                                    <FaUsersViewfinder />
                                </Button>
                                <Button variant="outline-success" className="ml-2" onClick={() => handleAddSubTask(task.id)}>
                                    <FaPlus />
                                </Button>
                                <Button variant="outline-success" onClick={() => handleEditTask(task.id)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="outline-secundary" onClick={() => handleDeleteTask(task.id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListarTask;
