// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { Alert } from '@mui/material'
import { Dialog } from '@mui/material'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'

import LinearProgress from '@mui/material/LinearProgress'

const CardVerticalRatings = () => {
  const router = useRouter()
  const [fetchedposts, setFetchedposts] = useState([])
  const [open, setOpen] = useState(false)

  const [values, setValues] = useState({
    users: [],
    isUserDataAvailable: false,
    error: ''
  })

  useEffect(() => {
    async function displayPost() {
      const token = localStorage.getItem('token')
      return fetch('http://localhost:3000/posts', {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchposts = async () => {
      const posts = await displayPost()
      setFetchedposts(posts.data)
      setValues({ ...values, users: posts.data, isUserDataAvailable: true, error: '' })
    }

    fetchposts()
  }, [fetchedposts])

  async function deleteUser(id) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(data => data.json)
  }
  const deluser = async id => {
    const msg = await deleteUser(id)
    console.log(msg)
  }

  const cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '28vw'
  }

  return (
    <Grid container spacing={6}>
      {values.isUserDataAvailable ? (
        fetchedposts.map(fetchedpost => (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title={fetchedpost.title} />
              <CardContent>
                <Typography variant='body2' sx={{ marginBottom: 3.25 }}>
                  {fetchedpost.body}
                </Typography>
              </CardContent>
              <CardActions className='card-action-dense'>
                <Link href={`/post/${fetchedpost._id}`}>
                  <Button variant='contained' size='small'>
                    Edit
                  </Button>
                </Link>

                <Button variant='secondary' size='small' onClick={() => deluser(fetchedpost._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid container>
          <Grid item xs={6} md={6}></Grid>
          <Grid item xs={6} item md={6}>
          <Box sx={{ width: '100%', height: '40px' }}>
            <CircularProgress color='success' />
            {/* <ReactLoading type='cylon' color='#0000FF' /> */}
          </Box>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
export default CardVerticalRatings
