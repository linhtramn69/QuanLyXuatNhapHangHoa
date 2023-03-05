import API from './api.service'

class ImportService {
    async get(){
        return (await API.get(`/import-forms`));
    }
    async create(data){
        return ( await API.post(`/import-forms/`, data));
    }
    async getId(id){
        return ( await API.get(`/import-forms/${id}`));
    }
    async update(id,data){
        return ( await API.put(`/import-forms/${id}`, data));
    }
}
export default new ImportService();