import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from "@/components/authContext";
import subtaskService from '@/services/subtaskService';
import { FaUsersViewfinder, FaV } from 'react-icons/fa6';

const ListarSubTask = () => {
    const navigate = useNavigate();
    const [subtasks, setSubTasks] = useState<any>(null);
    const [error, setError] = useState(null);
    const { setIdTask } = useContext(AuthContext);
    const { taskId } = useParams<{ taskId: string }>();

    const { id } = useContext(AuthContext);

    useEffect(() => {
        subtaskService.getSubTasks(id, taskId).then((data) => {
            setSubTasks(data);
            console.log(data);
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error);
            setError(error);
        });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!subtasks) {
        return <div>Não há dados a serem exibidos</div>;
    }

    const handleDeleteSubTask = (subtask: any) => {
        subtaskService.deleteSubTask(subtask, id, taskId).then((data) => {
            console.log(data);
            navigate('/');
        }).catch((error) => {
            setError(error);
        });
    };

    return (
        <div>
            <h3>Lista de Tarefas</h3>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID Task</th>
                        <th>Descrição</th>
                        <th>Tempo (em horas)</th>
                        <th>Atribuido para</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {subtasks.map((subtask: any) => (
                        <tr key={subtask.id}>
                            <td>{subtask.task.id}</td>
                            <td>{subtask.description.length > 50 ? `${subtask.description.substring(0, 50)}...` : subtask.description}</td>
                            <td>{subtask.timeHours}</td>
                            <td>{subtask.task.assignedByUser.name}</td>
                            <td>{subtask.createdAt}</td>
                            <td>
                                <Button onClick={() => handleDeleteSubTask(subtask.id)}>
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

export default ListarSubTask;
