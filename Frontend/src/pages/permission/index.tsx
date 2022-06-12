// ** MUI Imports
import Grid from '@mui/material/Grid'

import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'

const CardBasic = () => {
  return (
    <Grid container spacing={6} justifyContent='center'>
      <Grid item xs={12} md={6}>
        <CardNavigationCenter />
      </Grid>
    </Grid>
  )
}

export default CardBasic
