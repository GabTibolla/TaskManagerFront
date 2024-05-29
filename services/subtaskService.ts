import axios from 'axios'
const baseUrl = 'http://localhost:8080'

class SubTaskService {

    async getSubTasks(created_by: any, taskId: any) {
        return await axios.get(`${baseUrl}/user/${created_by}/task/${taskId}/subtasks`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addSubTask(data: any, created_by: any, idTask: any) {
        return axios.post(`${baseUrl}/user/${created_by}/task/${idTask}/subtask`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
            )
    }

    deleteSubTask(id: any, created_by: any, idTask: any) {
        return axios.delete(`${baseUrl}/user/${created_by}/task/${idTask}/subtask/${id}`)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover subtask', error)
            })
    }
}

export default new SubTaskService()