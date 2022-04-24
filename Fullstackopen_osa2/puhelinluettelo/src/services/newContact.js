import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (data, newObject) => {
    return axios.put(`${baseUrl}/${data.id}`, newObject)
}

const services = {
    getAll,
    create,
    deleteOne,
    update
}

export default services