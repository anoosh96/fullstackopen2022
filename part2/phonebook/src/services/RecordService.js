import {axiosPrivate} from '../api/axios'

const listRecords = () => {
  return axiosPrivate
    .get('/records')
    .then((res)=>res.data)
}

const createRecord = (rec) => {
  return axiosPrivate
    .post('/records', rec)
    .then((res)=>res.data)
}

const deleteRecord = (id) => {
  return axiosPrivate
    .delete(`/records/${id}`)
    .then((res)=>res.data)
}


export default {listRecords, createRecord, deleteRecord}
