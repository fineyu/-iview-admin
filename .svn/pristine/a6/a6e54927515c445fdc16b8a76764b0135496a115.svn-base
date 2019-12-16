import axios from '@/libs/api.request'
/**
 * chenwan
 * 新增
 * 2019-07-19
 * @param {*} parameter 
 */
const InsertData = (parameter) => {
    return axios.request({
        url: '/api/services/app/ArchvieMilitary/Create',
        data: parameter,
        method: 'post'
    });
}
/**
 * chenwan
 * 修改
 * 2019-07-19
 * @param {*} parameter 
 */
const UpdateData = (parameter) => {
    return axios.request({
        url: '/api/services/app/ArchvieMilitary/Update',
        data: parameter,
        method: 'put'
    });
}
/**
 * chenwan
 * 查询
 * 2019-07-19
 * @param {*} parameter 
 */
const ShowData = (parameter) => {
    return axios.request({
        url: '/api/services/app/ArchvieMilitary/Page',
        data: parameter,
        method: 'post'
    });
}
/**
 * chenwan
 * 详情
 * 2019-07-19
 * @param {*} parameter 
 */
const DetailData = (parameter) => {
    return axios.request({
        url: '/api/services/app/ArchvieMilitary/Get',
        params: parameter,
        method: 'get'
    });
}
/**
 * chenwan
 * 删除
 * 2019-07-19
 * @param {*} parameter 
 */
const DeleteData = (parameter) => {
    return axios.request({
        url: '/api/services/app/ArchvieMilitary/Delete',
        data: parameter,
        method: 'delete'
    });
}
const APIS = {
    InsertData,
    UpdateData,
    ShowData,
    DetailData,
    DeleteData
}

export default APIS;