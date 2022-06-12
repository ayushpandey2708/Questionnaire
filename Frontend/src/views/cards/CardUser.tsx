// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { useState, useEffect, forwardRef, Fragment, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import { defaultMaxListeners } from 'events'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Pencil from 'mdi-material-ui/Pencil'
import { IconButton } from '@mui/material'
import Delete from 'mdi-material-ui/Delete'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide, { SlideProps } from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import Chip from '@mui/material/Chip'
const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

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

const TableCustomized = userid => {
  // if (typeof window !== 'undefined') {
  //   const token = localStorage.getItem('token')
  // }

  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

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

  const [fetchedroles, setfetchedroles] = useState([])

  useEffect(() => {
    async function displayRoles() {
      const token = localStorage.getItem('token')

      return fetch('http://localhost:3000/roles', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchroles = async () => {
      const user = await displayRoles()
      setfetchedroles(user.data)
      setValues({ ...values, users: user.data, isUserDataAvailable: true, error: '' })
    }

    fetchroles()
  }, [fetchedroles])

  // console.log(fetchedroles)

  async function deleteRole(id) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/roles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(data => data.json)
  }
  const delrole = async id => {
    const msg = await deleteRole(id)
    console.log(msg)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>Role Name</StyledTableCell>
              {/* <StyledTableCell align='right'>Gender</StyledTableCell> */}
              <StyledTableCell align='center'>Permissions</StyledTableCell>
              <StyledTableCell align='right'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {values.isUserDataAvailable ? (
              fetchedroles
                .filter(role => {
                  return role.isActive == true
                })
                .map(fetchedrole => (
                  <StyledTableRow key={fetchedrole._id}>
                    {/* {if(fetchedrole.isActive){} */}
                    <StyledTableCell align='left'>{fetchedrole.display_name}</StyledTableCell>
                    <StyledTableCell align='left'>
                      {fetchedrole.policies.map((fetchedpolicy,index) => (
                        <Chip
                          variant='outlined'
                          key={index}
                          label={fetchedpolicy}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      ))}
                      
                      {/* {row.policies.map((item, index) => (
                        <Chip
                          variant='outlined'
                          key={index}
                          label={item}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      ))} */}
                      {/* <Button variant='contained' size='smalll' onClick={handleClickOpen}>
                        View Permissions
                      </Button>
                      <Dialog
                        open={open}
                       
                       
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        aria-labelledby='alert-dialog-slide-title'
                        aria-describedby='alert-dialog-slide-description'
                      >
                        <DialogTitle id='alert-dialog-slide-title'>View Permissions</DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description'>
                         
                          
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                      </Dialog> */}
                    </StyledTableCell>
                    {/* <StyledTableCell align='right'>{fetchedrole.email}</StyledTableCell> */}
                    <StyledTableCell align='right'>
                      {' '}
                      <Link href={`/role/${fetchedrole._id}`}>
                        <IconButton variant='contained' size='small'>
                          <Pencil />
                        </IconButton>
                      </Link>
                      <IconButton variant='secondary' size='small' onClick={() => delrole(fetchedrole._id)}>
                        Delete
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={
          fetchedroles.filter((role) => {
            return role.isActive == true
          }).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableCustomized
