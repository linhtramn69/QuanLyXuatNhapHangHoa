import API from './api.service'

class BrandService {
    async get(){
        return (await API.get(`/brands`));
    }
    async create(data){
        return (await API.post(`brands`, data));
    }
    async update(id,data){
        return (await API.put(`brands/${id}`, data));
    }
    async getId(id){
        return (await API.get(`/brands/${id}`));
    }
    async getByName(name){
        return (await API.get(`/brands/${name}`));
    }
    async delete(id){
        return (await API.delete(`/brands/${id}`));
    }
}
export default new BrandService();