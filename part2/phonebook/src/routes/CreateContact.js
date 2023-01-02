import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createRecord } from '../actions/recordActions'
import { addFlashMessage } from '../reducers/flashReducer'
import { addRecordReset } from '../reducers/createRecordReducer'
import Form from '../components/Form';
import { Alert } from '@mui/material';

const CreateContact = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, record} = useSelector(state => state.createRecord)
  const [phone, setphone] = useState('')
  const [name, setname] = useState('')
  
  const nameChangeHandler = (e) => {
    setname(e.target.value)
  }

  const phoneChangeHandler = (e) => {
    setphone(e.target.value)
  }

  const addRecord = (event) => {
    event.preventDefault();
    let rec = {name: name, number: phone}
    dispatch(createRecord(rec))
  }

  useEffect(()=>{
    if(record){
      dispatch(addFlashMessage({type: 'success', msg: 'Contact Created'}))
      navigate("/")
    }
  }, [record])

  useEffect(()=> {
    return () => {
      dispatch(addRecordReset())
    } 
  }, [])

  return (
    <div>
      <h1>Add Contact</h1>
      {error && <Alert severity="error"> {error} </Alert>}
      <Form
        submitHandler={addRecord}
        nameChangeHandler={nameChangeHandler}
        phoneChangeHandler={phoneChangeHandler}
      />
    </div>
  );
};

export default CreateContact;
