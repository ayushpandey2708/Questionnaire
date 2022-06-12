// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import { IconButton } from '@mui/material';
import Pencil from 'mdi-material-ui/Pencil'

import Delete from 'mdi-material-ui/Delete'


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

  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const TableCustomized = userid => {
  const router = useRouter()
  const [fetchedusers, setFetchedusers] = useState([])
  const [userlist, setUserlist] = useState([])
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

  useEffect(() => {
    async function displayUser() {
      const token = localStorage.getItem('token')
      return fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(data => data.json())
    }

    const fetchusers = async () => {
      const user = await displayUser()
      setFetchedusers(user.data)
      setValues({ ...values, users: user.data, isUserDataAvailable: true, error: '' })
    }

    fetchusers()
  }, [fetchedusers])

  async function deleteUser(id) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3000/users/${id}`, {
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
  const statusObj: StatusObj = {
    user: { color: 'info' },

    admin: { color: 'error' },

    partner: { color: 'primary' },

    client: { color: 'warning' },

    superadmin: { color: 'success' }
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>UserName</StyledTableCell>
              <StyledTableCell align='left'>Gender</StyledTableCell>
              <StyledTableCell align='left'>Email</StyledTableCell>
              <StyledTableCell align='left'>Role</StyledTableCell>
              <StyledTableCell align='left'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.isUserDataAvailable ? (
              fetchedusers
                .filter(user => {
                  return user.isActive == 'true'
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(fetcheduser => (
                  <StyledTableRow key={fetcheduser._id}>
                    {/* {if(fetcheduser.isActive){} */}
                    <StyledTableCell align='left'>{fetcheduser.name}</StyledTableCell>
                    <StyledTableCell align='left'>{fetcheduser.gender}</StyledTableCell>
                    <StyledTableCell align='left'>{fetcheduser.email}</StyledTableCell>
                    <StyledTableCell align='left'>
                      <Chip
                        label={fetcheduser.role}
                        color={statusObj[fetcheduser.role].color}
                        sx={{
                          height: 24,

                          fontSize: '0.75rem',

                          textTransform: 'capitalize',

                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {' '}
                      <Link href={`/users/${fetcheduser._id}`}>
                        <IconButton variant='contained' size='small'>
                          <Pencil/>
                        </IconButton>
                      </Link>
                      <IconButton variant='secondary' size='small' onClick={() => deluser(fetcheduser._id)}>
                        <Delete/>
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
          fetchedusers.filter(user => {
            return user.isActive == 'true'
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
