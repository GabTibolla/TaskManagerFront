import axios from 'axios'
const baseUrl = 'http://localhost:8080'

class UsuarioService {

    async getUsuarios() {
        return await axios.get(`${baseUrl}/usuarios`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    async getUsuarioById(id: any) {
        return await axios.get(`${baseUrl}/usuario/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    getUsuarioLogin(mail: any, cpf: any) {
        return axios.get(`${baseUrl}/usuarioLogin/${mail}/${cpf}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    getUsuarioDev() {
        return axios.get(`${baseUrl}/usuarios/dev`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    addUsuario(data: any) {
        return axios.post(`${baseUrl}/usuario`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
            )
    }

    deleteUsuario(idDeletado: any, idLogin: any) {
        return axios.delete(`${baseUrl}/user/${idLogin}/usuario/${idDeletado}`)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updateUsuario(data: any, id: any, idCreator: any) {
        return axios.put(`${baseUrl}/user/${id}/usuario/${idCreator}`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new UsuarioService()