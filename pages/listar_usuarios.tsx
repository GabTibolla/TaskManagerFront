import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import AuthContext from "@/components/authContext";

const ListarUsuarios = () => {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState<any>(null)
    const [error, setError] = useState(null)
    const { id } = useContext(AuthContext)

    useEffect(() => {
        UsuarioService.getUsuarios().then((data) => {
            const filteredData = data.filter((usuario: any) => usuario.id !== id)
            setUsuarios(filteredData)
            console.log(data)
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error)
            setError(error)
        })
    }, [])


    const handleRemove = async (idUsuario: any) => {
        UsuarioService.deleteUsuario(idUsuario, id).then((data) => {

            console.log(data)
        }).catch((error) => {
            console.error('Erro ao deletar usuario:', error)
            setError(error)
        })
        navigate("/")
    }

    const handleEditUsuario = (userId: any) => {
        navigate(`/editarUsuario/${userId}`);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!usuarios) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <PaginationU
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={handlePageChange}
            /> */}
            <h3>Lista de Usuarios</h3>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Permissao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario: any) => (
                        <tr key={usuario.id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.mail}</td>
                            <td>{usuario.permission}</td>
                            <td>
                                <Button onClick={() => handleEditUsuario(usuario.id)}>
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