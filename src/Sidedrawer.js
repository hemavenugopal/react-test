import {React, useState, useEffect } from 'react';
import {Box, InputLabel, MenuItem, FormControl, Select, Button, Link, TextField} from '@mui/material';
import './index.css';


const Sidedrawer = ({isDrawerOpen, setIsDrawerOpen}) => {

const initialData = [
    {Label: "First Name", Value: "first_name"},
    {Label: "Last Name", Value: "last_name"},
      {Label:"Gender", Value: "gender"},
     { Label: "Age", Value: "age"},
      {Label: "Account Name" , Value:"account_name"},
      {Label: "City" , Value: "city" },
      {Label: "State" , Value: "state" }
    
  ]
  const [list, setList] = useState(initialData);

  const [selectedSchema, setSelectedSchema] = useState("");

  const handleChange = (event) => {
    setSelectedSchema(event.target.value );
  };

  const [addedSchema, setAddedSchema] = useState([]);
  const [schemaName, setSchemaName] = useState("");


  const handleSave = async (e) => {

    const data = { 
        "segment_name": schemaName, 
        "schema": addedSchema.map((a) => {
            return {[a.Value]: a.Label}
        })
    }
    e.preventDefault();
    try {
      const response = await fetch('https://webhook.site/c299a7a2-09a0-447b-acf6-0313682a6100', {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
}

const handleCancel = (e) =>{
    setAddedSchema([]);
    setList(initialData);
    setSchemaName("")
    setSelectedSchema("")

    setIsDrawerOpen(!isDrawerOpen)
    



    e.preventDefault();

}

  
  useEffect (() => {
    console.log(addedSchema);
  }, [addedSchema])

  

  return (
    <div className='segment-form'>
      <div className='segment-label'>Enter the name of the segment</div>
        <Box sx={{ minWidth: 120 }}>
            <FormControl  size="small"   
            fullWidth>
                    
                
                <TextField
                        size="small"
                    id="outlined-controlled"
                    label="Name of the segment"
                    value={schemaName}
                    onChange={(event) => {
                        setSchemaName(event.target.value);
                    }}
                    />
            </FormControl>
        </Box>
     
      {addedSchema.length>0 ? <div className='added-list'>{addedSchema.map((a) => {
        return (a ? <ul><li>{a.Label}</li></ul>: <></>)     

      })}</div> :<></>}
       <Box sx={{ minWidth: 120 }}>
      <FormControl  size="small"       className='select-segment'
 fullWidth>
        <InputLabel id="demo-simple-select-label">Add schema to segment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSchema}
          label="Add schema to segment"
          onChange={handleChange}
        >

          {list.map((a) => {
        return (
        <MenuItem value={a.Value}>{a.Label}</MenuItem>)
        

      })}
        </Select>
      </FormControl>
    </Box>
    <Link
  component="button"
  variant="body2"
  onClick={() => {
    
    setAddedSchema  ((prev) => {
      return [...prev, list.filter((item) => item.Value === selectedSchema)[0]]
      
    }) 
    setList (() => {
      return list.filter((item) => item.Value !== selectedSchema)
    })
  }}
>
  +Add new schema
</Link>
   
   

      <div>
      <Button className="seg-btn" variant='contained' onClick={handleSave} >Save the Segment</Button>
      <Button  variant='outlined' onClick={handleCancel}>Cancel</Button>
      </div>

   
    </div>
  );
 
}


export default Sidedrawer
