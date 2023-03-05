import API from './api.service'

class ExportService {
    async get(){
        return (await API.get(`/export-forms`));
    }
    async getExport(name){
        return (await API.get(`/export-forms/all/${name}`));
    }
    async getExportCN(name){
        return (await API.get(`/export-forms/allcn/${name}`));
    }
    async create(data){
        return ( await API.post(`/export-forms/`, data));
    }
    async getId(id){
        return ( await API.get(`/export-forms/${id}`));
    }
    async update(id,data){
        return ( await API.put(`/export-forms/${id}`, data));
    }
}
export default new ExportService();