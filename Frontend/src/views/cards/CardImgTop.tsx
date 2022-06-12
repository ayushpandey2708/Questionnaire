// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { TextField } from '@mui/material'
import button from 'src/@core/theme/overrides/button'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Router from 'next/router'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import * as React from 'react'

const CardImgTop = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
  }

  async function createpost(credentials) {
    return fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }
  // let navigate = useNavigate();
  const [body, setbody] = useState('')
  const [title, settitle] = useState('')
  const [posterror, setposterror] = useState('')
  const [titleerror, settitleerror] = useState('')
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
    setMessage({...message, open: false})
  }
  const posthandler = (event: any) => {
    setbody(event.target.value)
  }
  const titlehandler = (event: any) => {
    settitle(event.target.value)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })
  

  const status = 'published'

  const addposthandler = async (event: any) => {
    event.preventDefault()

    setposterror('')
    settitleerror('')

    const data = await createpost({
      title,
      body,
      status
    })

    if (!data.error) {
      console.log(data.data)
      setMessage({...message, open: true, text: 'Post Created.', type: 'success'})
        setTimeout(() => {
          Router.push('/posts')
        }, 2000)
      // Router.push('/posts')
      setbody('')
      settitle('')
    } else {
      

      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }
  }

  const cancelhandler = () => {
    Router.push('/posts')
  }

  return (
    <Card>
      <CardMedia sx={{ height: '15rem' }} image='/images/cards/glass-house.png' />
      <CardContent>
        <form onSubmit={addposthandler}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            Enter Your Posts
          </Typography>
          <TextField
            id='title'
            placeholder='Title'
            name='title'
            margin='normal'
            fullWidth
            label='Title'
            type='text'
            onChange={titlehandler}
            value={title}
            required
          />

          <TextField
            placeholder='Description'
            id='description'
            name='description'
            margin='normal'
            fullWidth
            label='Description'
            multiline
            rows={6}
            type='text'
            onChange={posthandler}
            value={body}
            required
          />

          <Button type='submit' variant='contained' sx={{ mt: 4, mb: 3 }} onSubmit={addposthandler}>
            Add Post
          </Button>
          {'    '}
          <Button size='large' color='secondary' variant='outlined' onClick={cancelhandler}>
            Back
          </Button>
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

export default CardImgTop
