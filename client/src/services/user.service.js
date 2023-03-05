import API from './api.service'

class UserService {
    async login(data){
        return (await API.post(`/user/login`,data));
    }
}
export default new UserService();