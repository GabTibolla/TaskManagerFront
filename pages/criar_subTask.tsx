import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouter } from "next/router";

const CriarSubTask = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tempoEmHoras: "",
    descricao: "",
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleSubmit = async (event: any) => {
  //     event.preventDefault();
  //     // Lógica para adicionar uma subtask
  // };
  return (
    <div style={fullScreenContainerStyle}>
      <div style={formWrapperStyle}>
        <h2>Criar SubTask</h2>
        <Form /*style={formStyle} onSubmit={handleSubmit}*/>
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Tempo em Horas</Form.Label>
            <Form.Control
              type="number"
              placeholder="Insira o tempo em horas"
              id="tempoEmHoras"
              name="tempoEmHoras"
              value={formData.tempoEmHoras}
              style={inputStyle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira a descrição"
              id="descricao"
              name="descricao"
              value={formData.descricao}
              style={inputStyle}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col className="buttons" style={buttonContainerStyle}>
              <Button type="submit" style={submitButtonStyle}>
                Registrar
              </Button>
              <Button onClick={() => router.push("/")} style={backButtonStyle}>
                Voltar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

// Estilos CSS
const fullScreenContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#ffff",
};

const formWrapperStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#555",
};

const inputStyle = {
  height: "45px",
  borderRadius: "4px",
  borderColor: "#ccc",
  paddingLeft: "10px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const submitButtonStyle = {
  backgroundColor: "#28a745",
  borderColor: "#28a745",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  fontWeight: "bold",
};

const backButtonStyle = {
  backgroundColor: "#6c757d",
  borderColor: "#6c757d",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  fontWeight: "bold",
};

export default CriarSubTask;
