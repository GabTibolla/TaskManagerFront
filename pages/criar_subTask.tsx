import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'
import AuthContext from "@/components/authContext";
import subtaskService from '@/services/subtaskService';

const CriarSubTask = () => {
  const navigate = useNavigate()
  // pegando id do usuario logado
  const { id } = useContext(AuthContext);
  const { idTask } = useContext(AuthContext)


  const [formData, setFormData] = useState({
    description: '',
    timeHours: '',
  });

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission


    subtaskService.addSubTask(formData, id, idTask)
      .then((response) => {
        console.log('SubTask Adicionada: ', formData)
        setFormData({
          description: '',
          timeHours: '',
        })
      }).catch((error: { data: any; }) => {
        console.log('Erro ao adicionar o usuario:', error)
      })

    navigate('/')
  };

  return (
    <div className={"formulario"}>
      <h2>Criar Sub Tarefa</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o tempo em horas"
            id="timeHours"
            name="timeHours"
            value={formData.timeHours}
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
          <Col className="buttons">
            <Button type="submit">Registrar</Button>
            <Button onClick={() => navigate('/')}>Voltar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CriarSubTask;