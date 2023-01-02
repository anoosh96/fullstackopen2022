import { TextField } from "@mui/material"

const Filter = ({searchTerm, searchHandler}) => {
  return (
    <div>
      <form>
        <TextField 
          label="Search"
          type="text" 
          id="search-field" 
          value={searchTerm} 
          onChange={searchHandler} 
        />
      </form>
    </div>
  )
}

export default Filter
