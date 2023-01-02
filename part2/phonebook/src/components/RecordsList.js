import { Table, TableBody, TableContainer } from "@mui/material"
import Record from "./Record"

const RecordsList = ({records, showDelete, deleteHandler}) => {

  const recordsList = records.map((rec) => {
    return(
        <Record 
          record={rec} 
          key={rec.id} 
          showDelete={showDelete} 
          deleteHandler={deleteHandler}
        />
    )
  })

  return (
    <div>
      { records.length > 0 && 
        <TableContainer>
          <Table>
            <TableBody>
              {recordsList}
            </TableBody>
          </Table>
       </TableContainer>
      }
    </div>
  )
}

export default RecordsList
