import axios from 'axios'
const baseUrl = 'http://localhost:8080'

class TaskService {

    async getTasks(created_by: any) {
        return await axios.get(`${baseUrl}/user/${created_by}/tasks`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    async getTask(created_by: any, idTask: any) {
        return await axios.get(`${baseUrl}/user/${created_by}/task/${idTask}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addTask(data: any, created_by: any, assigned_by: any) {
        return axios.post(`${baseUrl}/user/${created_by}/task/assigned/${assigned_by}`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
            )
    }

    deleteTask(created_by: any, idTask: any) {
        return axios.delete(`${baseUrl}/user/${created_by}/task/${idTask}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover task', error)
            })
    }

    updateTask(data: any, idTask: any, created_by: any) {
        return axios.put(`${baseUrl}/user/${created_by}/task/${idTask}`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new TaskService()