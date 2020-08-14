const datalabels = {
  backgroundColor: '#fff',
  align: 'center',
  anchor: 'end',
  padding: 5,
  borderRadius: 2,
  clamp: true
}

export const BAR_OPTIONS = {
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        display: true,
        type: 'linear',
        position: 'left',
        gridLines: {
          display: false
        },
        tricks: {
          beginAtZero: true,
          precision: 0,
          fixedStepSize: 1
        }
      }
    ]
  },
  responsive: true,
  legend: {
    display: false
  },
  elements: {
    line: {
      fill: false
    }
  },
  plugins: {
    datalabels
  }
}

export const PIE_OPTIONS = {
  responsive: true,
  legend: {
    display: false
  },
  tooltips: {
    mode: 'index',
    axis: 'y'
  },
  plugins: {
    datalabels: {
      ...datalabels,
      align: 'center',
      anchor: 'center'
    }
  },
  elements: {
    line: {
      fill: false
    }
  }
}

export const LINE_OPTIONS = {
  responsive: true,
  tooltips: {
    mode: 'index',
    axis: 'y'
  },
  legend: {
    display: false
  },
  elements: {
    line: {
      fill: false
    }
  },
  plugins: {
    datalabels
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        display: true,
        position: 'left',
        gridLines: {
          display: false
        },
        tricks: {
          beginAtZero: true,
          precision: 0,
          fixedStepSize: 1
        }
      }
    ]
  }
}

export const HORIZONTAL_OPTIONS = {
  responsive: true,
  tooltips: {
    mode: 'index',
    axis: 'y'
  },
  legend: {
    display: false
  },
  elements: {
    line: {
      fill: false
    }
  },
  plugins: {
    datalabels
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        // stacked: true,
        tricks: {
          beginAtZero: true,
          precision: 0,
          fixedStepSize: 1
        }
      }
    ],
    yAxes: [
      {
        display: true,
        position: 'left',
        gridLines: {
          display: false
        },
        stacked: true
      }
    ]
  }
}

export const CHART_PIE = 'pie'
export const CHART_BAR = 'bar'
export const CHART_LINE = 'line'
export const CHART_AREA = 'area'
export const CHART_RADAR = 'radar'
export const CHART_RADIAL = 'radial'
export const CHART_COMPOSE = 'compose'

export const CHART_TYPES = {
  [CHART_LINE]: 'Linear',
  [CHART_BAR]: 'Barras',
  [CHART_AREA]: 'Area',
  [CHART_COMPOSE]: 'Compuesto',
  [CHART_PIE]: 'Pastel',
  [CHART_RADAR]: 'Radar',
  [CHART_RADIAL]: 'Radial'
}

export const CHARTS_LINES_TYPES = ['basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']

export const GRAPHIC_TYPES = ['bar', 'pie', 'line', 'doughnut', 'horizontal']

export const DEFAULT_CHART = {
  labels: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4'],
  datasets: [
    {
      backgroundColor: ['#629749', '#ffb04c', '#ff833a', '#f05545'],
      borderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000'],
      borderWidth: 1,
      hoverBackgroundColor: ['#33691e', '#f57f17', '#e65100', '#b71c1c'],
      hoverBorderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000'],
      data: [12, 5, 4, 16],
      datalabels: {
        color: ['#629749', '#ffb04c', '#ff833a', '#f05545'],
        backgroundColor: '#fff',
        borderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000']
      }
    }
  ]
}
