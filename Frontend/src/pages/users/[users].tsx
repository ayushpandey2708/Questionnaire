import React from 'react'
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import  Userform from 'src/views/form-layouts/Userform'

import { useRouter } from 'next/router'


import { useState, useEffect } from 'react'

const displayusers = () => {
  const router = useRouter()
  const { users } = router.query
  console.log(users)
  
 

 
   
  
 

  return (
    <DatePickerWrapper>
      <Grid container spacing={1}>
        <Grid item xs={20} md={15}>
          <Userform id={users} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
export default displayusers
