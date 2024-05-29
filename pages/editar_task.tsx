import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import TaskService from "@/services/taskService";
import AuthContext from "@/components/authContext";

interface Usuario {
    id: string;
    name: string;
}

const EditarTask = () => {
    const navigate = useNavigate();
    const { id: userId } = useContext(AuthContext);
    const { taskId } = useParams<{ taskId: string }>();

    const [formData, setFormData] = useState({
        status: 'PENDENTE',
        title: '',
        description: '',
    });

    const [options, setOptions] = useState<Usuario[]>([]);

    useEffect(() => {
        UsuarioService.getUsuarioDev()
            .then((data) => {
                setOptions(data);
            })
            .catch((error) => {
                console.error('Erro ao listar usuários:', error);
            });

        TaskService.getTask(userId, taskId)
            .then((data) => {
                setFormData({
                    status: data.status,
                    title: data.title,
                    description: data.description,
                });
            })
            .catch((error) => {
                console.error('Erro ao buscar a tarefa:', error);
            });
    }, [taskId]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        TaskService.updateTask(formData, taskId, userId)
            .then((response) => {
                console.log('Tarefa atualizada: ', formData);
                navigate('/listarTask');
            }).catch((error: { data: any; }) => {
                console.log('Erro ao atualizar a tarefa:', error);
            })
    };

    return (
        <div className={"formulario"}>
            <h2>Editar Tarefa</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o titulo"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira a descrição"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="PENDENTE"
                                    name="status"
                                    value="PENDENTE"
                                    checked={formData.status === 'PENDENTE'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="PROGRESSO"
                                    name="status"
                                    value="PROGRESSO"
                                    checked={formData.status === 'PROGRESSO'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="CONCLUIDO"
                                    name="status"
                                    value="CONCLUIDO"
                                    checked={formData.status === 'CONCLUIDO'}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Salvar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EditarTask;
