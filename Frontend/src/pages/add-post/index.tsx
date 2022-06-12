// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardImgTop from 'src/views/cards/CardImgTop'

import { useState } from 'react'

const CardBasic = () => {
  // const [bloglist, setbloglist] = useState([])

  // const addblog = (Postname: any, Titlename: any) => {
  //   setbloglist(prevBlogList => {
  //     return [
  //       ...prevBlogList,
  //       { titlename: Titlename, id: Math.random().toString() },
  //       { postname: Postname, id: Math.random().toString() }
  //     ]
  //   })
  // }
  

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h3'>Posts</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <CardImgTop  />
      </Grid>
    </Grid>
  )
}

export default CardBasic
