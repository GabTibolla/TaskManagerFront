import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from "@/components/authContext";
import usuarioService from '@/services/usuarioService';

const EditarTask = () => {
    const navigate = useNavigate();
    const { id: userId } = useContext(AuthContext);
    const { idUser } = useParams<{ idUser: string }>();

    const [formData, setFormData] = useState({
        name: '',
        permission: '',
    })


    useEffect(() => {
        usuarioService.getUsuarioById(idUser)
            .then((data) => {
                setFormData({
                    name: data.name,
                    permission: data.permission,
                });
            })
            .catch((error) => {
                console.error('Erro ao buscar o usuário:', error);
            });
    }, [idUser]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        usuarioService.updateUsuario(formData, userId, idUser)
            .then((response) => {
                console.log('Usuario atualizado: ', formData);
                navigate('/listar');
            }).catch((error: { data: any; }) => {
                console.log('Erro ao atualizar o usuario:', error);
            })
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
        </div >
    );
};

export default EditarTask;
