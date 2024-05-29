import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import TaskService from "@/services/taskService";
import AuthContext from "@/components/authContext";


const CriarUsuario = () => {
    const navigate = useNavigate()
    // pegando id do usuario logado
    const { id } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        permission: 'USER',
        name: '',
        cpf: '',
        mail: '',
    });


    // useEffect(() => {
    //     UsuarioService.getUsuarioDev()
    //         .then((data) => {
    //             setOptions(data);
    //             console.log(data); // Verifique a estrutura dos dados no console
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao listar usuários:', error);
    //         });
    // }, []); // Passando um array vazio para garantir que a requisição seja feita apenas uma vez

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission



        UsuarioService.addUsuario(formData)
            .then((response) => {
                console.log('Usuario adicionado: ', formData)
                setFormData({
                    permission: 'USER',
                    name: '',
                    cpf: '',
                    mail: '',
                })
            }).catch((error: { data: any; }) => {
                console.log('Erro ao adicionar o usuario:', error)
            })

        navigate('/');
    };

    return (
        <div className={"formulario"}>
            <h2>Criar Usuário</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o Nome"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o CPF"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}

                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o Email"
                        id="mail"
                        name="mail"
                        value={formData.mail}

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
                                    label="USER"
                                    name="permission"
                                    value="USER"
                                    checked={formData.permission === 'USER'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="ADMIN"
                                    name="permission"
                                    value="ADMIN"
                                    checked={formData.permission === 'ADMIN'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="DEV"
                                    name="permission"
                                    value="DEV"
                                    checked={formData.permission === 'DEV'}
                                    onChange={handleChange}
                                />
                            </div>
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

export default CriarUsuario;
