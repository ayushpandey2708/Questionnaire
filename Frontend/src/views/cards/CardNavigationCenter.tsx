// ** React Imports
import { useState } from 'react'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { TextField } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'

const CardNavigationCenter = props => {
  const router = useRouter()
  // ** State
  const [name, setname] = useState()
  const [description, setdescription] = useState()
  const [nameerror, setnameerror] = useState()
  const [display_name, setdisplay_name] = useState()

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

  const namehandler = event => {
    setname(event.target.value)
    setdisplay_name(event.target.value)
  }
  const descriptionhandler = event => {
    setdescription(event.target.value)
  }

  async function createPermission(credentials) {
    const token = localStorage.getItem('token')
    {
      console.log(token)
    }
    return fetch('http://localhost:3000/policy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }

  const submithandler = async (event: any) => {
    event.preventDefault()
    const data = await createPermission({ name, display_name, description })

    if (!data.error) {
      console.log(data.data)
      setMessage({ ...message, open: true, text: 'Permission Created.', type: 'success' })
      setTimeout(() => {
        router.push('/view-permissions')
      }, 2000)
      setname('')
      setdescription('')
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
            Add New Permission
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 4 }}>
            Permission you may use and assign to your users.
          </Typography>

          <TextField
            id='permisssion'
            placeholder='Enter Permisssion Name'
            name='name'
            margin='normal'
            fullWidth
            label='Permission Name'
            type='text'
            onChange={namehandler}
            value={name}
            required
          />
          <TextField
            id='description'
            placeholder='Enter Description'
            name='description'
            margin='normal'
            fullWidth
            label='description'
            type='text'
            onChange={descriptionhandler}
            value={description}
            required
          />

          <FormControlLabel control={<Checkbox />} label='Set as core name' />
          <Grid>
            <Button type='submit' size='large' variant='contained' sx={{ mt: 4, mb: 3 }} onSubmit={submithandler}>
              Create
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
