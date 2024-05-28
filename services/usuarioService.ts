import axios from 'axios'

const baseUrl = 'http://localhost:8080'

class UsuarioService {
    getUsuarios() {
        return axios.get(`${baseUrl}/usuarios`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
            )
    }

    getUsuarioLogin(mail: any, cpf: any) {
        return axios.get(`${baseUrl}/usuarioLogin/${mail}/${cpf}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    addUsuario(data: any) {
        return axios.post(`${baseUrl}/registrar`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
            )
    }

    deleteUsuario(id: any) {
        return axios.delete(`${baseUrl}/remover/${id}`)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updateUsuario(id: any, data: any) {
        return axios.put(`${baseUrl}/atualizar/${id}`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new UsuarioService()