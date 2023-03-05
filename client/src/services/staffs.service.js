import API from './api.service'

class StaffService {
    async get(){
        return (await API.get(`/staffs`));
    }
    async create(data){
        return (await API.post(`staffs`, data));
    }
    async getId(id){
        return (await API.get(`/staffs/${id}`));
    }
}
export default new StaffService();