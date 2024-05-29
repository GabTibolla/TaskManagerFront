import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AuthContext from "@/components/authContext"
import axios from "axios"
import styles from "../styles/login.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const baseUrl = 'http://localhost:8080/usuarioLogin'
    const [formData, setFormData] = useState({
        mail: '',
        cpf: ''
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const [error, setError] = useState(null);
    const { setIsAuthenticated, setToken } = useContext(AuthContext);
    const { setId } = useContext(AuthContext);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        try {
            const response = await axios.get(`${baseUrl}/${formData.mail}/${formData.cpf}`); // Replace with your API endpoint
            // const { token } = response.data
            const { id } = response.data

            setIsAuthenticated(true)
            // setToken(token)
            localStorage.setItem('id', id)
            // localStorage.setItem('jwtToken', token)

            setId(id);




            navigate('/')
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.message || 'Login failed')
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.formulario}>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="mail"
                            placeholder="E-mail"
                            id="mail"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="CPF"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        {error && <p className="error-message">{error}</p>}
                    </Row>
                    <Row>
                        <Col className={styles.buttons}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default Login;