import RecordService from "../services/RecordService";
import {listRecords, addRecord, removeRecord} from '../reducers/recordReducer'
import {addRecordRequest, addRecordFail, addRecordSuccess} from '../reducers/createRecordReducer'

export const getRecords = () => async (dispatch) => {
  try {
    const result = await RecordService.listRecords()
    dispatch(listRecords(result))
  }
  catch(err){
    console.log(err);
  }
}

export const createRecord = (rec) => async (dispatch) => {
  dispatch(addRecordRequest())
  try {
    const record = await RecordService.createRecord(rec)
    dispatch(addRecord(record))
    dispatch(addRecordSuccess(record))
  }
  catch(error) {
    console.log(error);
    dispatch(addRecordFail(error?.response?.data?.error))
  } 
}


export const deleteRecord = (id) => async (dispatch) => {
  try {
    await RecordService.deleteRecord(id)
    dispatch(removeRecord(id))
    //dispatch(setErrorMessage(''))
  }
  catch(error) {
    console.log(error);
  } 
}
