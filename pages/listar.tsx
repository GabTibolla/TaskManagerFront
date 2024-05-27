import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState<any>(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        UsuarioService.getUsuarios().then((data) => {
            setUsuarios(data)
            console.log(data)
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error)
            setError(error)
        })
    }, [])

    const handleRemove = async (id: any) => {
        UsuarioService.deleteUsuario(id).then((data) => {
            setUsuarios(usuarios.filter((usuario: { id: any }) => usuario.id !== id))
        }).catch((error) => {
            console.error('Erro ao deletar usuario:', error)
            setError(error)
        })
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!usuarios) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Lista de Usuarios</h3>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((usuario: any) => (
                    <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.username}</td>
                        <td>
                            <Button onClick={() => navigate(`/atualizar/${usuario.id}`)}>
                                <FaEdit />
                            </Button>
                            <Button onClick={() => handleRemove(usuario.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ListarUsuarios