import { api } from '@/libs'

const findAll = () => api.get('/users/role/PROFESSOR')

const findById = (id: number) => api.get(`/users/${id}`)

const ProfessorService = {
  findAll,
  findById
}

export default ProfessorService
