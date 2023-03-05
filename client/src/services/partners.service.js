import API from './api.service'

class PartnersService {
    async get(){
        return (await API.get(`/partners`));
    }
    async getId(id){
        return (await API.get(`/partners/${id}`));
    }
    async create(data){
        return (await API.post(`partners`, data));
    }
}
export default new PartnersService();