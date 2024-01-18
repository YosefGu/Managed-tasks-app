import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const api = import.meta.env.VITE_API_URI

const Identify = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSearchButton = async () => {
        const response = await fetch(`${api}/api/user/recover`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        })

        const json = await response.json()

        if (response.ok) {
            console.log(json)
            setMessage('Ok')
        } else {
            console.log(json)
            setMessage('Faild')
        }
    }
    return (
        <>
        <Container>
            <Paper>
                <Typography>Find your account</Typography>
                <Typography>{message}</Typography>
                <Typography>Please enter your email to search for your account.</Typography>
                <TextField 
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <Button component={Link} to='/login'>Cancel</Button>
                <Button onClick={handleSearchButton}>Search</Button>
            </Paper>
        </Container>
        </>
    )
}

export default Identify