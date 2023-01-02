import { Button, TextField } from "@mui/material"

const Form = ({submitHandler, nameChangeHandler, phoneChangeHandler, name, phone}) => {

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <TextField
            label="Name"
            type="text"
            id="phone-name" 
            value={name} 
            onChange={nameChangeHandler} 
            required
          />
        </div>
        <div className="form-group">
          <TextField 
            label="Phone"
            type="text" 
            id="phone-number"
            value={phone} 
            onChange={phoneChangeHandler} 
            required
          />
        </div>
        <Button 
          type="submit" 
          color="primary" 
          id="add-button" 
          variant="contained"
        >
          Add Contact
        </Button>
      </form>
    </div>
  )
}

export default Form
