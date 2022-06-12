// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import router from 'next/router'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'
import Pencil from 'mdi-material-ui/Pencil'
import { IconButton } from '@mui/material';
import Delete from 'mdi-material-ui/Delete'
// import SearchBar from 'material-ui-search-bar'

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const TableStickyHeader = () => {
  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [values, setValues] = useState({
    users: [],
    isUserDataAvailable: false,
    error: ''
  })


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [fetchedpermissions, setfetchedpermissions] = useState([])

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
      const user = await displayPermission()
      setfetchedpermissions(user.data)
      setValues({ ...values, users: user.data, isUserDataAvailable: true, error: '' })
    }

    fetchpermissions()
  }, [fetchedpermissions])

  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const addpermission = () => {
    router.push('/permission')
  }

  async function deleteUser(id) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/policy/${id}`, {
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

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={10} md={10}>
              <Typography variant='h4' sx={{ marginTop: 4 }}>
                Permissions List
              </Typography>
              {/* <SearchBar placeholder='SEarch here' autoFocus /> */}
            </Grid>
            <Grid item xs={2} md={2}>
              <Button variant='contained' size='large' onClick={addpermission}>
                Add Permission
              </Button>
            </Grid>
          </Grid>

          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='left'>Name</StyledTableCell>
                <StyledTableCell align='left'>Description</StyledTableCell>
                <StyledTableCell align='left'>Created At</StyledTableCell>

                <StyledTableCell align='left'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.isUserDataAvailable ? (fetchedpermissions.filter((permission)=>{
                return permission.isActive==true
              }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(fetchedpermission =>
                 (
                  <StyledTableRow key={fetchedpermission._id}>
                    <StyledTableCell component='th' scope='row'>
                      {fetchedpermission.display_name}
                    </StyledTableCell>
                    <StyledTableCell align='left'>{fetchedpermission.description}</StyledTableCell>
                    <StyledTableCell align='left'>{fetchedpermission.createdAt}</StyledTableCell>
                    <StyledTableCell align='left'>
                      {' '}
                      <Link href={`/permissions/${fetchedpermission._id}`}>
                        <IconButton variant='contained' size='small'>
                          <Pencil/>
                        </IconButton>
                      </Link>{' '}
                      <IconButton variant='secondary' size='small' onClick={() => deluser(fetchedpermission._id)}>
                        <Delete/>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ) 
              )
              ):(
                <StyledTableRow key='0'>
                  <StyledTableCell component='th' align='center' colSpan='100%' scope='row'>
                    <Box sx={{ width: '100%', height: '40px' }}>
                      <LinearProgress />
                      {/* <ReactLoading type='cylon' color='#0000FF' /> */}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            
            rowsPerPageOptions = { [10, 15, 20]}
            component='div'
            count={fetchedpermissions.filter((permission) => {
              return permission.isActive == true
            }).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

            />

        </Paper>
      </Grid>
    </Grid>
  )
}

export default TableStickyHeader
