import { Button, TableCell, TableRow } from "@mui/material"

const Record = ({record, showDelete, deleteHandler}) => {
  return (
    <TableRow>
      <TableCell>
        {record.name}
      </TableCell> 
      <TableCell>
        {record.number}
      </TableCell>
        { showDelete 
          &&
          <TableCell> 
            <Button
              variante="container" 
              id="delete-btn"
              style={{marginLeft: '5px'}} 
              onClick={()=> deleteHandler(record.id)}
            >
              Delete
            </Button> 
          </TableCell>
        }
    </TableRow>
  )
}

export default Record
