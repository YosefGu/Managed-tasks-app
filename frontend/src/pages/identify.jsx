import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Identify = () => {

    return (
        <>
        {/* Identify page */}
        <Container>
            <Paper>
                <Typography>Find your account</Typography>
                <Typography>{}</Typography>
                <Typography>Please enter your email to search for your account.</Typography>
                <TextField />
                <br></br>
                <Button component={Link} to='/login'>Cancel</Button>
                <Button>Search</Button>
            </Paper>
        </Container>
        </>
    )
}

export default Identify