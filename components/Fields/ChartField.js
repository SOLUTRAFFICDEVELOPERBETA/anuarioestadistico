import React from 'react'
import PropTypes from 'prop-types'
// import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, MenuItem, Paper, Popover, Switch, TextField, Tooltip, Typography, useTheme } from '@material-ui/core'
import { AssessmentTwoTone, CloudDownloadTwoTone, CloudUploadTwoTone, DeleteForever, DragHandle, EditAttributes } from '@material-ui/icons'
import { CHARTS_LINES_TYPES, CHART_AREA, CHART_BAR, CHART_COMPOSE, CHART_LINE, CHART_PIE, CHART_RADAR, CHART_RADIAL, CHART_TYPES } from '../../constants/chart'
import { useRouter } from 'next/router'
import AlertContext from '../../contexts/alert'
import { UploadFile } from '../../constants/files'
import * as Recharts from 'recharts'
import fb from '../../config/firebase'
import { CHART_COLORS, randomHexColorCode } from '../../constants/colors'
import ColorPick from '../ColorPick'
import { GRID_SIZES } from '../../constants/documents'
import { grey } from '@material-ui/core/colors'
import { DragPreviewImage, useDrag } from 'react-dnd'
import styled from '@emotion/styled'

const ChartContainer = styled(Box)`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 0px auto;

  :focus-within {
    background-color: #eee;
    z-index: 5;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  }

  :hover {
    grid-template-columns: 30px auto;
  }

  .dragger {
    align-self: center;
    justify-self: center;
    width: 24px;
    height: 24px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
  }

  :hover .dragger {
    visibility: visible;
    opacity: 1;
  }

  .dragger:hover {
    cursor: move;
  }
`

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  option: {
    minWidth: theme.spacing(20)
  },
  download: {
    minHeight: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2)
  },
  drag: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.grey['100'],
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    border: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.light
  }
}))

/**
 * Método para obtener la información del Chart
 * @param {Array} csv Documento a revisar
 */
function getChartData (csv) {
  return new Promise((resolve, reject) => {
    console.time('csv')
    const keys = csv.map(row => {
      const [, key] = Object.entries(row).find(r => r[0] === '')
      return ({ key: key.toLowerCase() })
    })
    // console.log({ keys })
    const fields = []
    keys.forEach(($key, index) => {
      Object.entries(csv[index]).forEach(([key, value]) => {
        const pos = fields.findIndex(fld => fld.name === key && key !== '')
        if (key !== '' && pos === -1) {
          fields.push({ name: key, [$key.key]: parseFloat(value) })
        } else if (pos !== -1) {
          fields[pos] = { ...fields[pos], [$key.key]: parseFloat(value) }
        }
      })
    })
    console.timeEnd('csv')
    // console.log({ fields })
    resolve({ keys, fields })
  })
}

const getRadius = (size, index) => {
  const unit = 100 / size

  return [0 + (unit * index) + (unit * 0.2), unit + (unit * index) - (unit * 0.2)]
}

const AttributesForm = ({ open, onClose, type, data, onSubmit }) => {
  if (!open) return null

  const { keys = [] } = data

  const [info, setInfo] = React.useState([...keys])

  const handleChange = (key, data) => {
    const $info = info.map($key => $key.key === key ? ({ ...$key, ...data }) : $key)
    setInfo($info)
  }

  const handleSubmit = () => {
    onSubmit({ ...data, keys: info })
    onClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Editar atributos de la gráfica</DialogTitle>
      <DialogContent>
        {info.map($key => {
          const { key, disabled = false, unit = '', stackId = '', format = type, type: $type = 'monotone', color = randomHexColorCode() } = $key
          return (
            <Box padding={2} marginBottom={1} component={Paper} variant="outlined" key={key}>
              <Typography variant="subtitle2" color="primary" gutterBottom>{key.toUpperCase()}</Typography>
              <Collapse in={[CHART_LINE, CHART_BAR, CHART_AREA, CHART_COMPOSE, CHART_RADAR].includes(type)}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={unit}
                  label="Unidades"
                  onChange={({ target: { value } }) => handleChange(key, { unit: value })}
                />
              </Collapse>
              <Collapse in={type === CHART_BAR}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={stackId}
                  label="Identificador de la barra"
                  disabled={type !== CHART_BAR}
                  placeholder="En las gráficas de barras las barras con el mismo nombre se apilaran"
                  onChange={({ target: { value } }) => handleChange(key, { stackId: value })}
                />
              </Collapse>
              <Collapse in={type === CHART_COMPOSE}>
                <TextField
                  select
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={format}
                  disabled={type !== CHART_COMPOSE}
                  label="Clase de Gráfico"
                  onChange={({ target: { value } }) => handleChange(key, { format: value })}
                >
                  {Object.entries(CHART_TYPES).filter(([key]) => [CHART_LINE, CHART_AREA, CHART_BAR].includes(key)).map(([key, $type]) => (
                    <MenuItem disabled={format === key} value={key} key={`select-format-option-${key}`}>
                      {$type}
                    </MenuItem>
                  ))}
                </TextField>
              </Collapse>
              <Collapse in={[CHART_LINE, CHART_AREA].includes(format)}>
                <TextField
                  select
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={$type}
                  disabled={![CHART_LINE, CHART_AREA].includes(format)}
                  label="Tipo de Gráfico"
                  onChange={({ target: { value } }) => handleChange(key, { type: value })}
                >
                  {CHARTS_LINES_TYPES.map(tp => (
                    <MenuItem key={tp} value={tp}>{tp.toUpperCase()}</MenuItem>
                  ))}
                </TextField>
              </Collapse>
              <List dense>
                <ListItem>
                  <ListItemText primary="Visibilidad" />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={!disabled}
                      color="primary"
                      onChange={({ target: { checked } }) => handleChange(key, { disabled: !checked })}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Color" primaryTypographyProps={{ style: { color } }} />
                  <ListItemSecondaryAction>
                    <ColorPick color={color} colors={CHART_COLORS} onChange={(rgb) => handleChange(key, { color: rgb })} />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Box>
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button color="primary" size="small" variant="outlined" onClick={onClose}>Cerrar</Button>
        <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

AttributesForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const ChartLineLabel = ({ x, y, stroke, value }) => {
  const theme = useTheme()

  const size = value.toString().length
  const width = size * 10

  const { light, main } = theme.palette.augmentColor({ main: stroke })

  return (
    <g>
      {/* <rect {...getRectProps()} height={20} rx={5} ry={5} fill={stroke}> </rect> */}
      <rect
        x={x - (width / 2)}
        y={y - 20}
        rx={2}
        ry={2}
        width={width}
        height={15}
        fill={light}
        stroke={main}
      />
      <text
        x={x}
        y={y}
        dy={-10}
        fill={theme.palette.getContrastText(stroke)}
        fontSize={10}
        textAnchor="middle"
      >
        {value}
      </text>
    </g>
  )
}

ChartLineLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const ChartBarLabel = ({ x, y, width, value, stroke }) => {
  const theme = useTheme()

  const size = value.toString().length
  const { main, light, contrastText } = theme.palette.augmentColor({ main: stroke })

  if ((size * 10) > width) return null

  return (
    <g>
      <rect x={x} y={y - 20} width={width} height={15} fill={light} stroke={main} />
      <text x={x + width / 2} y={y} dy={-10} fill={contrastText} fontSize={10} textAnchor="middle">{value}</text>
    </g>
  )
}

ChartBarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  stroke: PropTypes.number.isRequired
}

const ChartBarLabelSimple = ({ x, y, width, height, value, stroke }) => {
  const theme = useTheme()

  const size = value.toString().length
  const { contrastText } = theme.palette.augmentColor({ main: stroke })

  if ((size * 10) > width || height < 12) return null

  return <text x={x + width / 2} y={y + 10} fill={contrastText} fontSize={10} textAnchor="middle">{value}</text>
}

ChartBarLabelSimple.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired
}

/**
 * Tooltip para los Pie
 * @param {{ payload: Array }} props Propiedades del componente
 */
const ChartPieTooltip = ({ payload = [] }) => (
  <React.Fragment>
    <Box paddingY={1} paddingX={2} component={Paper} variant="outlined">
      {payload.map((section, index) => {
        const { name, value, payload, dataKey } = section

        const { fill } = payload

        return (
          <div key={`tooltip-pie-${name}-${index}`} style={{ marginBottom: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>{name}</Typography>
            <Typography
              variant="caption"
              display="block"
              style={{
                color: grey[600], fontWeight: 500, textTransform: 'uppercase', fontSize: 10
              }}
            >
              {dataKey}
            </Typography>
            <Typography
              variant="h6"
              display="block"
              gutterBottom
              style={{
                color: fill
              }}
            >
              {value}
            </Typography>
          </div>
        )
      })}
    </Box>
  </React.Fragment>
)

ChartPieTooltip.propTypes = {
  payload: PropTypes.array.isRequired
}

const CustomTooltip = ({ active, payload, label }) => active ? (
  <Box paddingY={1} paddingX={2} component={Paper} variant="outlined">
    <Typography variant="h5" color="primary" gutterBottom>{label}</Typography>
    {payload.map((section, key) => {
      const { color, name, unit, value } = section
      return (
        <div key={key} style={{ color, marginBottom: 4 }}>
          <Typography
            variant="caption"
            display="block"
            style={{
              color: grey[600], fontWeight: 500, textTransform: 'uppercase', fontSize: 10
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            display="inline"
            style={{
              marginRight: 4
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="caption"
            color="inherit"
            display="inline"
            style={{ fontStyle: 'italic' }}
          >
            {unit}
          </Typography>
        </div>
      )
    })}
  </Box>
) : null

CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
}

const ChartField = ({ id, value, size = 6, onChange, onDelete }) => {
  const classes = useStyles()
  const { query } = useRouter()
  const { showMessage } = React.useContext(AlertContext)
  const [loading, setLoading] = React.useState(false)
  const [attributes, setAttributes] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const theme = useTheme()
  const { data = {}, type = CHART_LINE } = value
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'ITEM', id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  /**
   * Método para abrir el popover
   * @param {Event} event Evento de click de la celda
   */
  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  // Método para cerrar el popover
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeProps = ({ target: { name, value } }) => {
    onChange({ [name]: value })
  }

  const handleChangeValue = ({ target: { name, value: $value } }) => {
    const $val = { ...value, [name]: $value }
    onChange({ value: $val })
  }

  const open = Boolean(anchorEl)

  /**
     * Método para actualizar la imagen
     * @param {FileList} files Archivos a subir
     */
  const handleUpdateFile = async files => {
    try {
      setLoading(true)
      const [file] = files
      const { path } = await UploadFile(file, `anuario/charts/${query.id}`, `${id}.csv`).then(url => url)

      // console.log({ path })

      const readCSV = fb.functions.httpsCallable('onReadCSV')

      readCSV(path).then(res => {
        getChartData(res.data).then((data) => {
          setLoading(false)
          onChange({ value: { ...value, data } })
        })
        // console.log(res.data)
      })
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const handleSaveChanges = (data) => {
    onChange({ value: { ...value, data } })
  }

  const getChart = () => {
    const { keys = [], fields = [] } = data
    if (keys.length !== 0) {
      switch (type) {
        case CHART_LINE:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.LineChart
                data={fields}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5
                }}
              >
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                <Recharts.Legend />
                <Recharts.Tooltip content={<CustomTooltip />} />
                <Recharts.Brush dataKey="name" height={30} stroke={theme.palette.primary.main} />
                {keys.map($key => {
                  const { key, type = 'monotone', unit = '', disabled = false, color = randomHexColorCode() } = $key

                  if (disabled) return null

                  return (
                    <Recharts.Line
                      key={key}
                      id={`line-chart-${key}`}
                      type={type}
                      dataKey={key}
                      stroke={color}
                      unit={unit}
                      activeDot={{ r: 6 }}
                      label={
                        <ChartLineLabel
                          stroke={color}
                        />
                      }
                    />
                  )
                })}
              </Recharts.LineChart>
            </Recharts.ResponsiveContainer>
          )
        case CHART_BAR:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.BarChart
                data={fields}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5
                }}
              >
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                <Recharts.Legend />
                <Recharts.Tooltip content={<CustomTooltip />} />
                <Recharts.Brush dataKey="name" height={30} stroke={theme.palette.primary.main} />
                {keys.map($key => {
                  const { key, unit = '', disabled = false, stackId = '', color = randomHexColorCode() } = $key

                  if (disabled) return null

                  // console.log({ stackId })

                  return (
                    <Recharts.Bar
                      key={key}
                      id={`bar-chart-${key}`}
                      dataKey={key}
                      fill={color}
                      unit={unit}
                      stackId={stackId !== '' ? stackId : key}
                      label={stackId === '' ? <ChartBarLabel stroke={color} /> : <ChartBarLabelSimple stroke={color} />}
                    />
                  )
                })}
              </Recharts.BarChart>
            </Recharts.ResponsiveContainer>
          )
        case CHART_AREA:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.AreaChart
                data={fields}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5
                }}
              >
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                <Recharts.Legend />
                <Recharts.Tooltip content={<CustomTooltip />} />
                <Recharts.Brush dataKey="name" height={30} stroke={theme.palette.primary.main} />
                {keys.map($key => {
                  const { key, type = 'monotone', unit = '', disabled = false, color = randomHexColorCode() } = $key

                  const { main, light } = theme.palette.augmentColor({ main: color })

                  if (disabled) return null

                  return (
                    <Recharts.Area
                      key={key}
                      type={type}
                      id={`bar-chart-${key}`}
                      dataKey={key}
                      stackId={`area-${id}`}
                      fill={light}
                      stroke={main}
                      unit={unit}
                      activeDot={{ r: 6 }}
                    />
                  )
                })}
              </Recharts.AreaChart>
            </Recharts.ResponsiveContainer>
          )
        case CHART_PIE:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.PieChart
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5
                }}
              >
                <Recharts.Tooltip content={<ChartPieTooltip />} />
                {keys.filter(({ disabled = false }) => !disabled).map(($key, index) => {
                  const { key, color = randomHexColorCode() } = $key

                  const [inner, outer] = getRadius([...keys].filter(({ disabled }) => !disabled).length, index)

                  return (
                    <Recharts.Pie
                      key={key}
                      data={fields}
                      innerRadius={inner}
                      outerRadius={outer}
                      id={`pie-chart-${key}`}
                      paddingAngle={index === 0 ? 0 : 5}
                      dataKey={key}
                      fill={color}
                    />
                  )
                })}
                <Recharts.Tooltip />
              </Recharts.PieChart>
            </Recharts.ResponsiveContainer>
          )
        case CHART_RADIAL: {
          const { key, color = randomHexColorCode() } = keys[0]

          const { main, light, contrastText } = theme.palette.augmentColor({ main: color })

          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.RadialBarChart innerRadius={20} data={fields}>
                <Recharts.RadialBar
                  minAngle={20}
                  fill={main}
                  label={{ position: 'end', fill: contrastText }}
                  background={{ fill: light }}
                  clockWise
                  dataKey={key}
                />
              </Recharts.RadialBarChart>
            </Recharts.ResponsiveContainer>
          )
        }
        case CHART_RADAR:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.RadarChart data={fields}>
                <Recharts.PolarGrid />
                <Recharts.PolarAngleAxis dataKey="name" />
                <Recharts.PolarRadiusAxis />
                <Recharts.Tooltip content={<CustomTooltip />} />
                {keys.map($key => {
                  const { key, unit = '', disabled = false, color = randomHexColorCode() } = $key

                  const { main, light } = theme.palette.augmentColor({ main: color })

                  if (disabled) return null

                  return (
                    <Recharts.Radar
                      key={key}
                      type={type}
                      id={`bar-chart-${key}`}
                      fillOpacity={0.6}
                      dataKey={key}
                      fill={light}
                      stroke={main}
                      unit={unit}
                    />
                  )
                })}
                <Recharts.Tooltip />
                <Recharts.Legend iconSize={10} />
              </Recharts.RadarChart>
            </Recharts.ResponsiveContainer>
          )
        case CHART_COMPOSE:
          return (
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.ComposedChart
                data={fields}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5
                }}
              >
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                <Recharts.Legend />
                <Recharts.Tooltip content={<CustomTooltip />} />
                <Recharts.Brush dataKey="name" height={30} stroke={theme.palette.primary.main} />
                {keys.map($key => {
                  const { key, type = 'monotone', unit = '', format = CHART_LINE, disabled = false, color = randomHexColorCode() } = $key

                  if (disabled) return null

                  switch (format) {
                    case CHART_LINE:
                      return (
                        <Recharts.Line
                          key={key}
                          id={`line-chart-${key}`}
                          type={type}
                          dataKey={key}
                          stroke={color}
                          unit={unit}
                          activeDot={{ r: 6 }}
                        />
                      )
                    case CHART_BAR: {
                      const { light, main } = theme.palette.augmentColor({ main: color })
                      return (
                        <Recharts.Bar
                          key={key}
                          id={`bar-chart-${key}`}
                          dataKey={key}
                          fill={light}
                          stroke={main}
                          fillOpacity={0.2}
                          unit={unit}
                        />
                      )
                    }
                    case CHART_AREA: {
                      const { light, main } = theme.palette.augmentColor({ main: color })
                      return (
                        <Recharts.Area
                          key={key}
                          type={type}
                          id={`area-chart-${key}`}
                          stackId={`area-${id}`}
                          dataKey={key}
                          fill={light}
                          stroke={main}
                          fillOpacity={0.2}
                          unit={unit}
                          activeDot={{ r: 6 }}
                        />
                      )
                    }
                    default:
                      return null
                  }
                })}
              </Recharts.ComposedChart>
            </Recharts.ResponsiveContainer>
          )
        default:
          return (<p>{type}</p>)
      }
    } else {
      return (
        <Box className={classes.download}>
          <Typography variant="body1" color="primary" paragraph>
            Para subir los datos por favor seguir la plantilla que se dispone a continuación, favor de dejar el valor de la casilla A1 en blanco
          </Typography>
          <Button
            style={{ marginBottom: '0.5rem' }}
            startIcon={<CloudDownloadTwoTone />}
            color="primary"
            variant="outlined"
            size="small"
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://firebasestorage.googleapis.com/v0/b/wise-365ab.appspot.com/o/assets%2FPlantilla%20para%20datos%20de%20una%20Grafica.xlsx?alt=media&token=00d27cbd-a5e5-48b6-a8ba-5454e04ba292"
          >
            Descargar plantilla
          </Button>
          <label htmlFor={`upload-chart-data-${id}`}>
            <Button variant="contained" color="primary" size="small" component="div" startIcon={<CloudUploadTwoTone />}>
              subir información
            </Button>
          </label>
          <input
            id={`upload-chart-data-${id}`}
            type="file"
            name={`upload-chart-data-${id}`}
            multiple={false}
            style={{ display: 'none' }}
            onChange={(e) => handleUpdateFile(e.target.files)}
          />
        </Box>
      )
    }
  }

  const DraggingCard = () => (
    <React.Fragment>
      <Paper className={classes.drag}>
        <AssessmentTwoTone fontSize="large" />
      </Paper>
    </React.Fragment>
  )

  if (isDragging) return <DraggingCard />

  return (
    <React.Fragment>
      <DragPreviewImage connect={preview} src="/static/images/DragPreview.png" />
      <ChartContainer onContextMenu={handleClick}>
        <span className="dragger" ref={drag}>
          <DragHandle fontSize="small" style={{ fill: grey[500] }} />
        </span>
        <div>
          {loading ? (
            <div className={classes.download}>
              <CircularProgress />
            </div>
          ) : (
            <div data-uploading={loading}>
              {getChart()}
            </div>
          )}
        </div>
      </ChartContainer>
      <AttributesForm open={attributes} type={type} onClose={() => setAttributes(false)} data={data} onSubmit={handleSaveChanges} />
      {open && (
        <Popover
          id={`popover-open-${id}`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box padding={1}>
            <Grid container spacing={1} alignContent="center" alignItems="center">
              <Grid item>
                <TextField
                  fullWidth
                  label="Tamaño del objeto"
                  select
                  size="small"
                  variant="outlined"
                  value={size}
                  name="size"
                  onChange={handleChangeProps}
                  className={classes.option}
                >
                  {GRID_SIZES.slice(2).map($size => (
                    <MenuItem disabled={size === $size.value} value={$size.value} key={`select-size-option-${id}-${$size.value}`}>
                      {$size.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Tipo de Gráfica"
                  select
                  size="small"
                  variant="outlined"
                  value={type}
                  name="type"
                  onChange={handleChangeValue}
                  className={classes.option}
                >
                  {Object.entries(CHART_TYPES).map(([key, $type]) => (
                    <MenuItem disabled={type === key} value={key} key={`select-type-option-${id}-${key}`}>
                      {$type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <label htmlFor={`upload-chart-data-${id}`}>
                  <Tooltip title="Cambiar datos" interactive>
                    <IconButton component="div" size="small">
                      <CloudUploadTwoTone color="primary" />
                    </IconButton>
                  </Tooltip>
                </label>
                <input
                  id={`upload-chart-data-${id}`}
                  type="file"
                  name={`upload-chart-data-${id}`}
                  multiple={false}
                  style={{ display: 'none' }}
                  onChange={(e) => handleUpdateFile(e.target.files)}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Editar Contenido" interactive>
                  <IconButton size="small" onClick={() => setAttributes(true)}>
                    <EditAttributes color="primary" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Borrar" interactive>
                  <IconButton size="small" onClick={() => onDelete(id)}>
                    <DeleteForever color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Popover>
      )}
    </React.Fragment>
  )
}

ChartField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ChartField
