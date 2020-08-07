const datalabels = {
  backgroundColor: '#fff',
  align: 'center',
  anchor: 'end',
  padding: 5,
  borderRadius: 2,
  clamp: true
}

export const BAR_OPTIONS = {
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
  },
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
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
  },
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

export const POLAR_OPTIONS = {
  legend: {
    position: 'bottom',
  },
  scale: {
    gridLines: {
      color: 'rgb(204, 204, 204)',
      borderDash: [3, 3],
    },
    ticks: {
      fontColor: 'rgb(204, 204, 204)',
    },
  },
};
export const GRAPHIC_TYPES = ['bar', 'pie', 'line', 'doughnut', 'horizontal', 'polar']

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
