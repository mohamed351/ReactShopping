import { Button, ButtonGroup, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage(){
    return (<>
        <Typography gutterBottom variant="h2">Error for testing purposes</Typography>
        <ButtonGroup fullWidth>
            <Button variant="contained" onClick={()=> agent.TestingErrors.get400Error()} >Test 400 </Button>
            <Button variant="contained" onClick={()=> agent.TestingErrors.get401Error()} >Test 401 </Button>
            <Button variant="contained" onClick={()=> agent.TestingErrors.get404Error()} >Test 404 </Button>
            <Button variant="contained" onClick={()=> agent.TestingErrors.getServerError()} >Test 500 </Button>
            <Button variant="contained" onClick={()=> agent.TestingErrors.getValidationError()} >Test Validation </Button>
        </ButtonGroup>
    </>);
}
