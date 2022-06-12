// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CardUser from 'src/views/cards/CardUser'

const Roles = () => {
  const router = useRouter()
  const clickhandler = () => {
    router.push('/add-role')
  }
  return (
    <Grid container spacing={6}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={10} md={10}>
            <Typography variant='h4' sx={{ marginTop: 4 }}>
              Roles List
            </Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Button variant='contained' size='large' onClick={clickhandler}>
              Add Role
            </Button>
            
          </Grid>
        </Grid>
        <CardUser></CardUser>
      </Paper>
    </Grid>
  )
}

export default Roles
