import API from './api.service'

class SuppliersService {
    async get(){
        return (await API.get(`/suppliers`));
    }
    async create(data){
        return (await API.post(`suppliers`, data));
    }
}
export default new SuppliersService();