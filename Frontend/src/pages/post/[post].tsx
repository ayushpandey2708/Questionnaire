import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardPostForm from 'src/views/cards/CardPostForm'

import { useState } from 'react'
import { useRouter } from 'next/router'

const CardPost = () => {
  const router = useRouter();

  const { post } = router.query

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h3'>Posts</Typography>
      </Grid>

      <Grid item xs={12} sm={20} md={20}>
        <CardPostForm   post={post} />
      </Grid>
    </Grid>
  )
}

export default CardPost