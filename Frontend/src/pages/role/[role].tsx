// ** React Imports
import { ChangeEvent, forwardRef, MouseEvent, useState, useEffect } from 'react'

// ** MUI Imports
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material'
import * as React from 'react'
import Alert from '@mui/material/Alert'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const EditRole = () => {
  const router = useRouter()
  const role = router.query
  const id = role.role
  console.log(id)
  // ** States
  const [name, setname] = useState('')
  const [display_name, setdisplay_name] = useState('')
  const [policyid, setpolicyid] = useState([])
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

  const handlepolicychange = event => {
    if (policyid.includes(parseInt(event.target.value))) {
      var index = policyid.indexOf(parseInt(event.target.value))
      
        policyid.splice(index,1 )
        
      
    } else {
      setpolicyid([...policyid, parseInt(event.target.value)])
    }
  }

  
  const [fetchedpermissions, setfetchedpermissions] = useState([])
  const [fetchedrole, setfetchedrole] = useState()

  const rolehandler = event => {
    setname(event.target.value)
    setdisplay_name(event.target.value)
  }

  useEffect(() => {
    async function displayPermission() {
      const token = localStorage.getItem('token')

      return fetch('http://localhost:3000/policy', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchpermissions = async () => {
      const users = await displayPermission()
      setfetchedpermissions(users.data)
    }

    fetchpermissions()
  }, [])

  const cancelhandler = () => {
    router.push('/roles')
  }

  useEffect(() => {
    async function displayRole() {
      const token = localStorage.getItem('token')

      return fetch(`http://localhost:3000/roles/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchRole = async () => {
      const users = await displayRole()
      setfetchedrole(users.data)
    }

    fetchRole()
  }, [fetchedpermissions,id])

  useEffect(() => {
    if (fetchedrole) {
      setname(fetchedrole.name)
      setpolicyid(fetchedrole.policyid)
      setdisplay_name(fetchedrole.display_name)
    }
  }, [fetchedrole])

  async function editRole(credentials) {
    const token = localStorage.getItem('token')

    return fetch(`http://localhost:3000/roles/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }

  const submithandler = async event => {
    event.preventDefault()

    const data = await editRole({ name, policyid, display_name })

    console.log(data)

    if (!data.error) {
      setMessage({ ...message, open: true, text: 'Role Updated.', type: 'success' })
      setTimeout(() => {
        router.push('/roles')
      }, 2000)
      
      
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Edit Role' titleTypographyProps={{ variant: 'h6' }} subheader='Set Role Permissions ' />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={submithandler}>
            <CardContent>
              <Grid item xs={12} md={12}>
                <TextField required fullWidth label='Role Name' onChange={rolehandler} value={name} />
              </Grid>
              <Divider sx={{ margin: 0 }} />
              <Grid item xs={12} md={12}>
                <Typography variant='h6' sx={{ marginTop: 4 }}>
                  Role Permissions
                </Typography>

                <Divider sx={{ margin: 0 }} />
              </Grid>
              <Grid container>
                <Grid item md={1.7} xs={1.7}>
                  User
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_user' ? (
                    <Grid item md={1.7} xs={1.7}>
                      <input
                        type='checkbox'
                        onChange={handlepolicychange}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}
                      />
                      Create
                    </Grid>
                  ) : null
                )}

                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'register_user' ? (
                    <Grid item md={1.7} xs={1.7}>
                      <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id} 
                      checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}/>
                      Register User
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_users' ? (
                <Grid item md={1.7} xs={1.7}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id} 
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}/>
                  Read
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_user' ? (
                <Grid item md={1.7} xs={1.7}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Update
                </Grid>
                ) : null
                )}
                 {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_user' ? (
                <Grid item md={1.7} xs={1.7}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Delete
                </Grid>
                 ) : null
                 )}
                 {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_password' ? (
                <Grid item md={1.7} xs={1.7}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Update Password
                </Grid>
                 ) : null
                 )}
              </Grid>
              <Divider sx={{ margin: 0 }} />

              <Grid container>
             
                <Grid item md={2.4} xs={2.4}>
                  Post
                </Grid>
               
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_post' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Create
                </Grid>
                 ) : null
                 )}
                 {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_post' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Read
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_post' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Update
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_post' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Delete
                </Grid>
                ) : null
                )}
              </Grid>
              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={2.4} xs={2.4}>
                  Permission
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_policy' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Create
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_policy' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Read
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_policy' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id} 
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}/>
                  Update
                </Grid>
                ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_policy' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Delete
                </Grid>
                ) : null
                )}
              </Grid>
              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={2.4} xs={2.4}>
                  Role
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_role' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Create
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_role' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Read
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_role' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Update
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_role' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id} 
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}/>
                  Delete
                </Grid>
                 ) : null
                 )}
              </Grid>
              <Divider sx={{ margin: 0 }} />
              <Grid container>
                <Grid item md={2.4} xs={2.4}>
                  Special Permissions
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_superadmin' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Create Superadmin
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_admin' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Create Admin
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_admin' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id} 
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''}/>
                  Update Admin
                </Grid>
                 ) : null
                 )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'Farzi' ? (
                <Grid item md={2.4} xs={2.4}>
                  <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={fetchedpermission._id}
                  checked={policyid.includes(fetchedpermission._id) ? 'checked' : ''} />
                  Farzi Testing
                </Grid>
                 ) : null
                 )}
              </Grid>
              <Grid container></Grid>

              <Divider sx={{ margin: 0 }} />
            </CardContent>

            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={cancelhandler}>
                Back
              </Button>
            </CardActions>
          </form>
        </Card>
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
      </Grid>
    </Grid>
  )
}

export default EditRole
