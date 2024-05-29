import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router'; // Use Next.js router instead of react-router-dom
import UsuarioService from "@/services/usuarioService";

// Definindo a interface para os dados retornados pela API
interface Usuario {
    id: string;
    nome: string;
}

const CriarTask = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        taskStatus: 'PENDENTE',
        titulo: '',
        descricao: '',
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        UsuarioService.addUsuario(formData)
            .then((response) => {
                console.log('Usuario adicionado:', response);
                setFormData({
                    taskStatus: 'PENDENTE',
                    titulo: '',
                    descricao: '',
                    selectedOption: '',
                });
            })
            .catch((error) => {
                console.log('Erro ao adicionar o usuario:', error);
            });
    };

    return (
        <div className="formulario">
            <h2>Criar Task</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o titulo"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira a descrição"
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
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
                                    name="taskStatus"
                                    value="PENDENTE"
                                    checked={formData.taskStatus === 'PENDENTE'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="PROGRESSO"
                                    name="taskStatus"
                                    value="PROGRESSO"
                                    checked={formData.taskStatus === 'PROGRESSO'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="CONCLUIDO"
                                    name="taskStatus"
                                    value="CONCLUIDO"
                                    checked={formData.taskStatus === 'CONCLUIDO'}
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
                                {options.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button onClick={() => router.push('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CriarTask;
