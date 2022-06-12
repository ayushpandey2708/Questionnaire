// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Router from 'next/router'
import InputLabel from '@mui/material/InputLabel';

interface State {
  password: string
  showPassword: boolean
}

const Userform = id => {
  const [name, setname] = useState('')
  const [gender, setgender] = useState('')
  const [email, setemail] = useState('')
  const [enterednumber, setenterednumber] = useState('')
  const [roleid,setroleid]=useState("")
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

 const rolehandler=(event)=>{
   setroleid(event.target.value)

 }

  
 

  const [fetchedusers, setFetchedusers] = useState([])
  useEffect(() => {
    async function displayUser() {
      const token = localStorage.getItem('token')
      return fetch(`http://localhost:3000/me`, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchusers = async () => {
      const data = await displayUser()
      setFetchedusers(data.data)
    }
    fetchusers()
  }, [])
  

  useEffect(() => {
    if (fetchedusers) {
      setname(fetchedusers.name)
      setgender(fetchedusers.gender)
      setemail(fetchedusers.email)
      setroleid(fetchedusers.roleid)
    }
  }, [fetchedusers])

  const namehandler = (event: any) => {
    setname(event.target.value)
  }
  const genderhandler = (event: any) => {
    setgender(event.target.value)
  }
  const emailhandler = (event: any) => {
    setemail(event.target.value)
  }
  const numberhandler = (event: any) => {
    setenterednumber(event.target.value)
  }
  const cancelHandler = (event: any) => {
    Router.push('/user-list')
  }

  const idd = fetchedusers._id

  async function edituser(credentials) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/users/${idd}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }

  const handlesubmit = async (event: any) => {
    event.preventDefault()
    console.log(name)
    const data = await edituser({
      name,gender,email
    })
    console.log(name,gender)

    if (!data.error) {
      setMessage({ ...message, open: true, text: 'User Updated.', type: 'success' })
      setTimeout(() => {
        Router.push('/user-list')
      }, 2000)
      
      
      
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }

  }

  return (
    <Card>
      <CardHeader title='My Profile' titleTypographyProps={{ variant: 'h6' }} />
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
             
            >
              
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              
            </Select>
            </Grid>
            

            {/* <Grid item xs={12}>
            
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={roleid}
              label="Age"
              onChange={rolehandler}
              required
             
            >
              
              
              <MenuItem value={0}>Super Admin</MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>User</MenuItem>
            </Select>
            </Grid> */}
            
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
                  Edit 
                </Button>
                <Button size='large' color='secondary' variant='outlined' onClick={cancelHandler}>
                  Back
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

export default Userform
