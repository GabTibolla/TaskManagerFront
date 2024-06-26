import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import TaskService from "@/services/taskService";
import AuthContext from "@/components/authContext";

interface Usuario {
    id: string;
    name: string;
}

const CriarTask = () => {
    const navigate = useNavigate()
    // pegando id do usuario logado
    const { id } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        status: 'PENDENTE',
        title: '',
        description: '',
        selectedOption: '',
    });

    const [options, setOptions] = useState<Usuario[]>([]);

    useEffect(() => {
        UsuarioService.getUsuarioDev()
            .then((data) => {
                setOptions(data);
                console.log(data); // Verifique a estrutura dos dados no console
            })
            .catch((error) => {
                console.error('Erro ao listar usuários:', error);
            });
    }, []); // Passando um array vazio para garantir que a requisição seja feita apenas uma vez

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission



        TaskService.addTask(formData, id, formData.selectedOption)
            .then((response) => {
                console.log('Usuario adicionado: ', formData)
                setFormData({
                    status: 'PENDENTE',
                    title: '',
                    description: '',
                    selectedOption: '',
                })
            }).catch((error: { data: any; }) => {
                console.log('Erro ao adicionar o usuario:', error)
            })

        navigate('/');
    };

    return (
        <div className={"formulario"}>
            <h2>Criar Tarefa</h2>
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
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Atribuido para:</Form.Label>
                            <Form.Select
                                id="selectedOption"
                                name="selectedOption"
                                value={formData.selectedOption}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma opção</option>
                                {options != null ? options.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                )) : null}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CriarTask;
