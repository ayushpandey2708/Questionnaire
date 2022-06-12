// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { PopperUnstyled } from '@mui/base'
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'
const CardPostForm = post => {
  console.log(post)

  // let navigate = useNavigate();
  const [body, setbody] = useState('')
  const [title, settitle] = useState('')
  const [posterror, setposterror] = useState('')
  const [titleerror, settitleerror] = useState('')
  const [fetchedposts, setFetchedposts] = useState([])

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
  const posthandler = (event: any) => {
    setbody(event.target.value)
  }
  const titlehandler = (event: any) => {
    settitle(event.target.value)
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
  }

  async function editpost(credentials) {
    return fetch(`http://localhost:3000/posts/${post.post}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }
  const status = 'published'
  const addposthandler = async (event: any) => {
    event.preventDefault()
    setposterror('')
    settitleerror('')

    const data = await editpost({
      title,
      body,
      status
    })
    if (!data.error) {
      console.log(data.data)
      setMessage({ ...message, open: true, text: 'Post Updated.', type: 'success' })
      setTimeout(() => {
        Router.push('/posts')
      }, 2000)
      setbody('')
      settitle('')
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }
  }

  const cancelhandler = () => {
    Router.push('/posts')
  }

  useEffect(() => {
    async function displayPost() {
      const token = localStorage.getItem('token')
      return fetch(`http://localhost:3000/posts/${post.post}`, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchusers = async () => {
      const posts = await displayPost()
      setFetchedposts(posts.data)
    }

    fetchusers()
  }, [])
  console.log(fetchedposts)

  useEffect(() => {
    if (fetchedposts) {
      settitle(fetchedposts.title)
      setbody(fetchedposts.body)
    }
  }, [fetchedposts])

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
            defaultValue={title}
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
            defaultValue={body}
            required
          />

          <Button type='submit' variant='contained' sx={{ mt: 4, mb: 3 }} onSubmit={addposthandler}>
            Edit Post
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

export default CardPostForm
