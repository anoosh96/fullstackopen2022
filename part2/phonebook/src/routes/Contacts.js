import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../components/Filter";
import RecordsList from "../components/RecordsList";
import { getRecords, deleteRecord } from "../actions/recordActions"
import { Typography } from "@mui/material";
import DeleteDialogue from "../components/DeleteDialogue";

const Contacts = () => {

  const records = useSelector(state => state.records)
  const [search, setsearch] = useState('')
  const [openDialogue, setOpenDialogue] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const dispatch = useDispatch()

  const searchHandler = (event) => {
    setsearch(event.target.value)
  }

  const deleteHandler = (id) => {
    setSelectedContact(id)
    setOpenDialogue(true)
  }

  const confirmHandler = () => {
    dispatch(deleteRecord(selectedContact))
    setSelectedContact(null)
    setOpenDialogue(false)
  }

  const cancelHandler = () => {
    setSelectedContact(null)
    setOpenDialogue(false)
  }

  const filteredRecords = 
    records.filter(
      (rec) => rec['name'].includes(search) || rec['number'].includes(search)
    )

  useEffect(() => {
    dispatch(getRecords())
  }, [dispatch])


  return (
    <div>
      <DeleteDialogue
        visible={openDialogue} 
        confirmHandler={confirmHandler}
        cancelHandler={cancelHandler}
      />
      <Typography variant="h4" mb={2}>Contacts</Typography>
      <Filter searchTerm={search} searchHandler={searchHandler} mb={2} />
      <br />
      <Typography variant="h5">Numbers:</Typography>
      <RecordsList
        records={filteredRecords}
        deleteHandler={deleteHandler}
        showDelete={true}
      />
    </div>
  );
};

export default Contacts