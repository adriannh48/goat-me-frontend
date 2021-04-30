import axios from 'axios'

export default class EventService { 

    static async create (data) {
        
        return await axios.post(process.env.VUE_APP_API_URL + '/events', data)
    }

    static async getAll () {
        
        return await axios.get(process.env.VUE_APP_API_URL + '/events')
    }
}