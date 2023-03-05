import API from './api.service'

class ProductService {
    async get(){
        return (await API.get(`/products`));
    }
    async getId(id){
        return (await API.get(`/products/${id}`));
    }
    async create(data){
        return (await API.post(`products`, data));
    }
    async update(id,data){
        return (await API.put(`products/${id}`, data));
    }
}
export default new ProductService();