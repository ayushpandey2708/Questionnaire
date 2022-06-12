import React from 'react'
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'

const adduser = () => {
    
  return (
    <DatePickerWrapper>
      <Grid container spacing={1}>
        <Grid item xs={20} md={15}>
          <FormLayoutsBasic/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
export default adduser;
