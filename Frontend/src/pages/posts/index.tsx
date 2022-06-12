import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
import CardMobile from 'src/views/cards/CardMobile'
import Button from '@mui/material/Button'
import Router from 'next/router'

const Showpost = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
      
      <Button variant='contained' size='large' onClick={() => Router.push("add-post")}> Add Post</Button>
      </Grid>
  <CardVerticalRatings />
  
  </Grid>
  )
}
export default Showpost
