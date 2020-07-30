import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableSortLabel,
  Toolbar,
  TablePagination,
  Tooltip,
  IconButton
} from '@material-ui/core'
import moment from 'moment'
import { useRouter } from 'next/router'
import SearchInput from '../components/SearchInput'
import { red } from '@material-ui/core/colors'
import { Close, NavigateNext } from '@material-ui/icons'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Titulo' },
  { id: 'lastModified', numeric: true, disablePadding: false, label: 'Ultima modificación' }
]

function DocumentTableHead ({ classes, order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

DocumentTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: '1 1 100%'
  }
}))

const DocumentTableToolbar = ({ onSearch }) => {
  const classes = useToolbarStyles()

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <SearchInput placeholder="Buscar por nombre" onSearch={onSearch} />
      </div>
    </Toolbar>
  )
}

DocumentTableToolbar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  delete: {
    backgroundColor: red[500],
    color: theme.palette.getContrastText(red[500]),
    marginRight: theme.spacing(1),

    '&:hover': {
      color: red[500]
    }
  },
  send: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const DocumentsTable = ({ documents, onDelete }) => {
  const classes = useStyles()
  const router = useRouter()
  const [docs, setDocs] = React.useState([...documents])
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('lastModified')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { query: { id } } = router

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearch = ({ search }) => {
    const array = [...documents].filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    setDocs(array)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, docs.length - page * rowsPerPage)

  React.useEffect(() => {
    setDocs(documents)
  }, [documents])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DocumentTableToolbar onSearch={handleSearch} />
        <TableContainer>
          <Table className={classes.table}>
            <DocumentTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(docs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell scope="row">{row.title}</TableCell>
                      <TableCell scope="row" align="right">{moment(row.lastModified).format('ll')}</TableCell>
                      <TableCell scope="row" align="center" padding="none">
                        <Tooltip title="Borrar"  arrow>
                          <IconButton size="small" className={classes.delete} onClick={() => onDelete(row.id)}>
                            <Close fontSize="small"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Abrir" arrow>
                          <IconButton
                            size="small"
                            className={classes.send}
                            onClick={() => router.push('/paginas/createPages/[id]', `/paginas/createPages/${row.id}`)}
                          >
                            <NavigateNext fontSize="small"  />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={docs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

DocumentsTable.propTypes = {
  documents: PropTypes.array,
  onDelete: PropTypes.func
}

export default DocumentsTable
