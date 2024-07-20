
import './App.css';
import { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import Sidedrawer from './Sidedrawer';

function App() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };
  return (
    <div className="App">
      <Button className="seg-btn" variant='contained' onClick={toggleDrawer(true)}>Save Segment</Button>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>        
        <Sidedrawer  isDrawerOpen={isDrawerOpen}   setIsDrawerOpen={setIsDrawerOpen} > </Sidedrawer>
      </Drawer>
      
    </div>
  );
}

export default App;
