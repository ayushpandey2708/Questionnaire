// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { TextField } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import  { useRouter } from 'next/router'
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'

const CardNavigationCenter = permissions => {
  const [display_name, setdisplay_name] = useState('')
  const [description, setdescription] = useState('')

  const [fetchedpermissions, setfetchedpermissions] = useState()
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

 
  const descriptionhandler = event => {
    setdescription(event.target.value)
  }
  const display_namehandler = event => {
    setdisplay_name(event.target.value)
  }

  const router = useRouter()

  useEffect(() => {
    async function displayPermission() {
      const token = localStorage.getItem('token')
      return fetch(`http://localhost:3000/policy/${permissions.permissions}`, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchpermissions = async () => {
      const data = await displayPermission()
      setfetchedpermissions(data.data)
    }
    fetchpermissions()
  }, permissions.permissions)

  useEffect(() => {
    if (fetchedpermissions) {
      setdisplay_name(fetchedpermissions.display_name)
      setdescription(fetchedpermissions.description)
    }
  }, [fetchedpermissions])
  // ** State
  async function editpermission(credentials) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/policy/${permissions.permissions}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }

  const submithandler = async (event: any) => {
    event.preventDefault()
    console.log(display_name, description)
    const data = await editpermission({
      display_name,
      description,
      
    })
    console.log(data)

    if (!data.error) {
      setMessage({ ...message, open: true, text: 'Permission Updated.', type: 'success' })
      setTimeout(() => {
        router.push('/view-permissions')
      }, 2000)
      router.push('/view-permissions')
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }
  }

  const discardhandler = () => {
    router.push('/view-permissions')
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center' }}>
        <form onSubmit={submithandler}>
          <Typography variant='h3' sx={{ marginBottom: 2 }}>
            Edit Permission
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 4 }}>
            Permission you may use and assign to your users.
          </Typography>
          <TextField
            id='permisssion'
            placeholder='Enter Permisssion display_name'
            display_name='permission'
            margin='normal'
            fullWidth
            label='Permission display_name'
            type='text'
            onChange={display_namehandler}
            value={display_name}
            required
          />

          <TextField
            id='description'
            placeholder='Enter description'
            display_name='description'
            margin='normal'
            fullWidth
            label='Description display_name'
            type='text'
            onChange={descriptionhandler}
            value={description}
            required
          />
          <FormControlLabel control={<Checkbox />} label='Set as core Permission' />
          <Grid>
            <Button type='submit' size='large' variant='contained' sx={{ mt: 4, mb: 3 }} onSubmit={submithandler}>
              Save
            </Button>{' '}
            <Button size='large' color='secondary' variant='outlined' onClick={discardhandler}>
              Discard
            </Button>
          </Grid>
        </form>
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

export default CardNavigationCenter
