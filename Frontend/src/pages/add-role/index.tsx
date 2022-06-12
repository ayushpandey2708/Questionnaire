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

const AddRole = () => {
  const router = useRouter()
  // ** States
  const [name, setname] = useState('')
  const [display_name, setdisplay_name] = useState('')
  const [policyid1, setpolicyid1] = useState([])
  const [usercheckedAll, setusercheckedAll] = useState(false)
  const [postcheckedAll, setpostcheckedAll] = useState(false)
  const [permissioncheckedAll, setpermissioncheckedAll] = useState(false)
  const [rolecheckedAll, setrolecheckedAll] = useState(false)
  const [specialcheckedAll, setspecialcheckedAll] = useState(false)
  const [mastercheckedAll, setmastercheckedAll] = useState(false)
  const [userchecked, setuserchecked] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
    update_password: false,
    register_user: false
  })
  const [postchecked, setpostchecked] = useState({
    create: false,
    read: false,
    update: false,
    delete: false
  })
  const [permissionchecked, setpermissionchecked] = useState({
    create: false,
    read: false,
    update: false,
    delete: false
  })
  const [rolechecked, setrolechecked] = useState({
    create: false,
    read: false,
    update: false,
    delete: false
  })

  const [specialchecked, setspecialchecked] = useState({
    createadmin: false,
    createsuperadmin: false,
    updateadmin: false
  })
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
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
  }

  const [fetchedpermissions, setfetchedpermissions] = useState([])

  const rolehandler = event => {
    setname(event.target.value)
    setdisplay_name(event.target.value)
  }

  const cancelhandler = () => {
    router.push('/roles')
  }

  const userselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (
          policyid1[i] === 0 ||
          policyid1[i] === 1 ||
          policyid1[i] === 2 ||
          policyid1[i] === 3 ||
          policyid1[i] === 4 ||
          policyid1[i] === 5
        ) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setusercheckedAll(value)
      setuserchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 0, 1, 2, 3, 4, 5])
      setusercheckedAll(value)
      setuserchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }
  const postselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (policyid1[i] === 8 || policyid1[i] === 9 || policyid1[i] === 10 || policyid1[i] === 11) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setpostcheckedAll(value)
      setpostchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 8, 9, 10, 11])
      setpostcheckedAll(value)
      setpostchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }
  const roleselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (policyid1[i] === 16 || policyid1[i] === 17 || policyid1[i] === 18 || policyid1[i] === 19) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setrolecheckedAll(value)
      setrolechecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 16, 17, 18, 19])
      setrolecheckedAll(value)
      setrolechecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }
  const permissionselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (policyid1[i] === 12 || policyid1[i] === 13 || policyid1[i] === 14 || policyid1[i] === 15) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setpermissioncheckedAll(value)
      setpermissionchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 12, 13, 14, 15])
      setpermissioncheckedAll(value)
      setpermissionchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }

  const specialselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (policyid1[i] === 20 || policyid1[i] === 21 || policyid1[i] === 22) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setspecialcheckedAll(value)
      setspecialchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 20, 21, 22])
      setspecialcheckedAll(value)
      setspecialchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }

  const masterselectAll = value => {
    if (!value) {
      for (var i = 0; i < policyid1.length; i++) {
        if (
          policyid1[i] === 20 ||
          policyid1[i] === 21 ||
          policyid1[i] === 22 ||
          policyid1[i] === 12 ||
          policyid1[i] === 13 ||
          policyid1[i] === 14 ||
          policyid1[i] === 15 ||
          policyid1[i] === 0 ||
          policyid1[i] === 1 ||
          policyid1[i] === 2 ||
          policyid1[i] === 3 ||
          policyid1[i] === 4 ||
          policyid1[i] === 5 ||
          policyid1[i] === 11 ||
          policyid1[i] === 10 ||
          policyid1[i] === 9 ||
          policyid1[i] === 8 ||
          policyid1[i] === 16 ||
          policyid1[i] === 17 ||
          policyid1[i] === 18 ||
          policyid1[i] === 19
        ) {
          policyid1.splice(i, 1)
          i--
        }
      }

      setspecialcheckedAll(value)
      setspecialchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setpostcheckedAll(value)
      setpostchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setrolecheckedAll(value)
      setrolechecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setpermissioncheckedAll(value)
      setpermissionchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setusercheckedAll(value)
      setuserchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    } else {
      setpolicyid1([...policyid1, 0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22])
      setspecialcheckedAll(value)
      setspecialchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setpostcheckedAll(value)
      setpostchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setrolecheckedAll(value)
      setrolechecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setpermissioncheckedAll(value)
      setpermissionchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
      setusercheckedAll(value)
      setuserchecked(prevState => {
        const newState = { ...prevState }
        for (const inputName in newState) {
          newState[inputName] = value
        }
        return newState
      })
    }
  }

  const usertoggleCheck = inputName => {
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
    setuserchecked(prevState => {
      const newState = { ...prevState }
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }
  const posttoggleCheck = inputName => {
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
    setpostchecked(prevState => {
      const newState = { ...prevState }
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }
  const roletoggleCheck = inputName => {
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
    setrolechecked(prevState => {
      const newState = { ...prevState }
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }
  const permissiontoggleCheck = inputName => {
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
    setpermissionchecked(prevState => {
      const newState = { ...prevState }
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }
  const specialtoggleCheck = inputName => {
    if (policyid1.includes(parseInt(event.target.value))) {
      var index = policyid1.indexOf(parseInt(event.target.value))

      policyid1.splice(index, 1)
    } else {
      setpolicyid1([...policyid1, parseInt(event.target.value)])
    }
    setspecialchecked(prevState => {
      const newState = { ...prevState }
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }

  useEffect(() => {
    let allchecked = true
    for (const inputName in userchecked) {
      if (userchecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setusercheckedAll(true)
    } else {
      setusercheckedAll(false)
    }
  }, [userchecked])
  useEffect(() => {
    let allchecked = true
    for (const inputName in rolechecked) {
      if (rolechecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setrolecheckedAll(true)
    } else {
      setrolecheckedAll(false)
    }
  }, [rolechecked])
  useEffect(() => {
    let allchecked = true
    for (const inputName in postchecked) {
      if (postchecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setpostcheckedAll(true)
    } else {
      setpostcheckedAll(false)
    }
  }, [postchecked])
  useEffect(() => {
    let allchecked = true
    for (const inputName in permissionchecked) {
      if (permissionchecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setpermissioncheckedAll(true)
    } else {
      setpermissioncheckedAll(false)
    }
  }, [permissionchecked])

  useEffect(() => {
    let allchecked = true
    for (const inputName in specialchecked) {
      if (specialchecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setspecialcheckedAll(true)
    } else {
      setspecialcheckedAll(false)
    }
  }, [specialchecked])

  useEffect(() => {
    let allchecked = true
    for (const inputName in specialchecked) {
      if (specialchecked[inputName] == false) {
        allchecked = false
      }
    }
    for (const inputName in permissionchecked) {
      if (permissionchecked[inputName] == false) {
        allchecked = false
      }
    }
    for (const inputName in postchecked) {
      if (postchecked[inputName] == false) {
        allchecked = false
      }
    }
    for (const inputName in rolechecked) {
      if (rolechecked[inputName] == false) {
        allchecked = false
      }
    }
    for (const inputName in userchecked) {
      if (userchecked[inputName] == false) {
        allchecked = false
      }
    }
    if (allchecked) {
      setmastercheckedAll(true)
    } else {
      setmastercheckedAll(false)
    }
  }, [specialchecked, postchecked, permissionchecked, rolechecked, userchecked])

  

  async function createRole(credentials) {
    const token = localStorage.getItem('token')

    return fetch('http://localhost:3000/roles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
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

  const submithandler = async event => {
    event.preventDefault()
    const policyid = [...new Set(policyid1)]

    const data = await createRole({ name, policyid, display_name })

    console.log(data)

    if (!data.error) {
      setMessage({ ...message, open: true, text: 'Role Created.', type: 'success' })
      setTimeout(() => {
        router.push('/roles')
      }, 2000)
    } else {
      setMessage({ ...message, open: true, text: data.message, type: 'error' })
    }
  }

  console.log(policyid1)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Add Role' titleTypographyProps={{ variant: 'h6' }} subheader='Set Role Permissions ' />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={submithandler}>
            <CardContent>
              <Grid item xs={12} md={12}>
                <TextField required fullWidth label='Role Name' onChange={rolehandler} value={name} />
              </Grid>
              <Divider sx={{ margin: 0 }} />
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Typography variant='h6' sx={{ marginTop: 4 }}>
                    Role Permissions
                    {/* <input type='checkbox' onChange={handlepolicychange} name='intern' color='primary' value={1} />
                    Select All Policy */}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={4} xs={5}>
                  Super Admin
                </Grid>
                <Grid item md={8} xs={8}>
                  <input
                    type='checkbox'
                    name='intern'
                    color='primary'
                    checked={mastercheckedAll}
                    onChange={event => masterselectAll(event.target.checked)}
                  />
                  Select All Permission
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={1.5} xs={1.5}>
                  User
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_user' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('create')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['create']}
                      />
                      Create
                    </Grid>
                  ) : null
                )}

                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'register_user' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('register_user')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['register_user']}
                      />
                      Register User
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_users' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('read')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['read']}
                      />
                      Read
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_user' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('update')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['update']}
                      />
                      Update
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_user' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('delete')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['delete']}
                      />
                      Delete
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_password' ? (
                    <Grid item md={1.5} xs={1.5}>
                      <input
                        type='checkbox'
                        onChange={() => usertoggleCheck('update_password')}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        checked={userchecked['update_password']}
                      />
                      Update Password
                    </Grid>
                  ) : null
                )}
                <Grid item md={1.5} xs={1.5}>
                  <input
                    type='checkbox'
                    onChange={event => userselectAll(event.target.checked)}
                    name='intern'
                    color='primary'
                    checked={usercheckedAll}
                  />
                  Select All
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={2} xs={2}>
                  Post
                </Grid>

                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_post' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                        onChange={() => posttoggleCheck('create')}
                        checked={postchecked['create']}
                      />
                      Create
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_post' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => posttoggleCheck('read')}
                        checked={postchecked['read']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Read
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_post' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => posttoggleCheck('update')}
                        checked={postchecked['update']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Update
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_post' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => posttoggleCheck('delete')}
                        checked={postchecked['delete']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Delete
                    </Grid>
                  ) : null
                )}
                <Grid item md={2} xs={2}>
                  <input
                    type='checkbox'
                    name='intern'
                    color='primary'
                    onChange={event => postselectAll(event.target.checked)}
                    checked={postcheckedAll}
                  />
                  Select All
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={2} xs={2}>
                  Permission
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_policy' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => permissiontoggleCheck('create')}
                        checked={permissionchecked['create']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Create
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_policy' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => permissiontoggleCheck('read')}
                        checked={permissionchecked['read']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Read
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_policy' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => permissiontoggleCheck('update')}
                        checked={permissionchecked['update']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Update
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_policy' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => permissiontoggleCheck('delete')}
                        checked={permissionchecked['delete']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Delete
                    </Grid>
                  ) : null
                )}
                <Grid item md={2} xs={2}>
                  <input
                    type='checkbox'
                    onChange={event => permissionselectAll(event.target.checked)}
                    checked={permissioncheckedAll}
                    name='intern'
                    color='primary'
                  />
                  Select All
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0 }} />

              <Grid container>
                <Grid item md={2} xs={2}>
                  Role
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_role' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => roletoggleCheck('create')}
                        checked={rolechecked['create']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Create
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'show_role' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => roletoggleCheck('read')}
                        checked={rolechecked['read']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Read
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_role' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => roletoggleCheck('update')}
                        checked={rolechecked['update']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Update
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'delete_role' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => roletoggleCheck('delete')}
                        checked={rolechecked['delete']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Delete
                    </Grid>
                  ) : null
                )}
                <Grid item md={2} xs={2}>
                  <input
                    type='checkbox'
                    name='intern'
                    color='primary'
                    onChange={event => roleselectAll(event.target.checked)}
                    checked={rolecheckedAll}
                  />
                  Select All
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0 }} />
              <Grid container>
                <Grid item md={2} xs={2}>
                  Special Permissions
                </Grid>
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_superadmin' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => specialtoggleCheck('createsuperadmin')}
                        checked={specialchecked['createsuperadmin']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Create Superadmin
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'create_admin' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => specialtoggleCheck('createadmin')}
                        checked={specialchecked['createadmin']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Create Admin
                    </Grid>
                  ) : null
                )}
                {fetchedpermissions.map(fetchedpermission =>
                  fetchedpermission.name == 'update_admin' ? (
                    <Grid item md={2} xs={2}>
                      <input
                        type='checkbox'
                        onChange={() => specialtoggleCheck('updateadmin')}
                        checked={specialchecked['updateadmin']}
                        name='intern'
                        color='primary'
                        value={fetchedpermission._id}
                      />
                      Update Admin
                    </Grid>
                  ) : null
                )}

                <Grid item md={2} xs={2}>
                  <input
                    type='checkbox'
                    name='intern'
                    color='primary'
                    onChange={event => specialselectAll(event.target.checked)}
                    checked={specialcheckedAll}
                  />
                  Select All
                </Grid>
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

export default AddRole
