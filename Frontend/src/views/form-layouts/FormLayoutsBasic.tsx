// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Router from 'next/router'
// ** Icons Imports
import MenuItem from '@mui/material/MenuItem'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

interface State {
  password: string
  showPassword: boolean
}

const FormLayoutsBasic = () => {
  async function creatUser(credentials) {
    const token = localStorage.getItem('token')
    {
      console.log(token)
    }
    return fetch('http://localhost:3000/createUser', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }
  const [name, setname] = useState('')
  const [gender, setgender] = useState('')
  const [email, setemail] = useState('')
  const [message, setMessage] = useState({
    open: false,
    type: 'success',
    vertical: 'top',
    horizontal: 'center',
    text: ''
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setMessage({ ...message, open: false })
  }
  

 const [roleid,setroleid]=useState("")

 const rolehandler=(event)=>{
   setroleid(event.target.value)

 }

  const namehandler = (event: any) => {
    setname(event.target.value)
  }
  const emailhandler = (event: any) => {
    setemail(event.target.value)
  }

  const genderhandler = (event: any) => {
    setgender(event.target.value)
  }

  const password = 'Admin@123'
  const cancelHandler = (event: any) => {
    Router.push('/user-list')
  }

  const handlesubmit = async (event: any) => {
    event.preventDefault()

    const data = await creatUser({
      name,
      gender,
      email,
      password,
      roleid
    })

    console.log(data)

    if (!data.error) {
      console.log(data.data)
      setMessage({ ...message, open: true, text: 'User Created.', type: 'success' })
      setTimeout(() => {
        Router.push('/user-list')
      }, 2000)
      
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }

  }

  return (
    <Card>
      <CardHeader title='User Details' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handlesubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField required fullWidth label='name' placeholder='AjayJadon' onChange={namehandler} value={name} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='email'
                label='Email'
                placeholder='ajayjadon@gmail.com'
                helperText='You can use letters, numbers & periods'
                onChange={emailhandler}
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={gender}
              label='Gender'
              onChange={genderhandler}
              required
              displayEmpty
             
            >
              <MenuItem value="">Select Gender</MenuItem>
              
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              
            </Select>
            </Grid>
            

            <Grid item xs={12}>
            
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={roleid}
              label="Age"
              onChange={rolehandler}
              required
              displayEmpty
             
            >
              
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value={0}>Super Admin</MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>User</MenuItem>
            </Select>
            </Grid>
            

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Add User
                </Button>
                <Button size='large' color='secondary' variant='outlined'  onClick={cancelHandler}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12}></Grid>
      </CardContent>
      <Snackbar
        open={message.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={message}
        key={message.vertical + message.horizontal}
      >
        <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default FormLayoutsBasic
