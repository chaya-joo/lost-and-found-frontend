
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import {PATHS} from '../routes/paths'
export default function VariantButtonGroup() {
    const navigate=useNavigate()
    return (
      <div dir='rtl'>
      <ButtonGroup 
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
      sx={{marginLeft:'10px'}}
      
    >
      <Button onClick={()=>{navigate(PATHS.signin)}}>להרשמה</Button>
      <Button onClick={()=>{navigate(PATHS.login)}}>להתחברות</Button>
    </ButtonGroup>
    </div>
  );
 
  }