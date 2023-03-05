import API from './api.service'

class KhosService {
    async get(){
        return (await API.get(`/khos`));
    }
    async getId(id){
        return (await API.get(`/khos/${id}`));
    }
    async create(data){
        return (await API.post(`khos`, data));
    }
    async delete(id){
        return (await API.delete(`/khos/${id}`));
    }
    async update(id,data){
        return (await API.put(`khos/${id}`, data));
    }
}
export default new KhosService();