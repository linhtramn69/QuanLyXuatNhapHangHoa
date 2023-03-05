import API from './api.service'

class TypeProductService {
    async get(){
        return (await API.get(`/type-products`));
    }
    async getId(id){
        return (await API.get(`/type-products/${id}`));
    }
    async delete(id){
        return (await API.delete(`/type-products/${id}`));
    }
    async create(data){
        return (await API.post(`type-products`, data));
    }
    async update(id,data){
        return ( await API.put(`/type-products/${id}`, data));
    }
}
export default new TypeProductService();