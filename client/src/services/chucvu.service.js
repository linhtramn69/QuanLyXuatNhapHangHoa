import API from './api.service'

class ChucVuService {
    async get(){
        return (await API.get(`/chucvu`));
    }
    async create(data){
        return (await API.post(`chucvu`, data));
    }
}
export default new ChucVuService();