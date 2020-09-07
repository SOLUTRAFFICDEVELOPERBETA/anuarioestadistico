/* eslint-disable no-unused-vars */
export const GENERAL_OPTIONS = {
    MIN: {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        elements: {
            line: {
                fill: false
            }
        },
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
                    display: false,
                    gridLines: {
                        display: false
                    }
                }
            ]
        }
    },
    FULL: {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            line: {
                fill: false
            }
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
                    }
                }
            ]
        }
    }
};

export const POPULATION_OPTIONS = {
    MIN: {
        responsive: true,
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        elements: {
            line: {
                fill: false
            }
        },
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
                    display: false,
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem) {
                    return Number(tooltipItem.value).toExponential(2);
                }
            }
        }
    },
    FULL: {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            line: {
                fill: false
            }
        },
        plugins: {
            datalabels: {
                display: 'auto',
                formatter: function (value, context) {
                    const num = Number(value);
                    return `${num.toExponential(1)}`;
                }
            }
        },
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem) {
                    return Number(tooltipItem.value).toExponential(2);
                }
            }
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        callback: function (value) {
                            return Math.abs(value);
                        }
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
                    ticks: {
                        callback: function (value) {
                            return parseFloat(value).toExponential(2);
                        }
                    }
                }
            ]
        }
    }
};

export const DISTRIBUTION_OPTIONS = {
    MIN: {
        responsive: true,
        plugins: {
            datalabels: {
                display: false,
                formatter: function (value, context) {
                    const num = parseFloat(value);
                    return `${num.toExponential(1)}`;
                }
            }
        },
        legend: {
            display: false
        },
        elements: {
            line: {
                fill: false
            }
        },
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem) {
                    return tooltipItem.value.replace('-', '') + '%';
                }
            }
        },
        scales: {
            xAxes: [
                {
                    display: false,
                    gridLines: {
                        display: false
                    },
                    stacked: true
                }
            ],
            yAxes: [
                {
                    display: false,
                    gridLines: {
                        display: false
                    },
                    stacked: true
                }
            ]
        }
    },
    FULL: {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            line: {
                fill: false
            }
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    const num = Number(value);
                    return `${Math.abs(num)}%`;
                }
            }
        },
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem) {
                    return tooltipItem.value.replace('-', '') + '%';
                }
            }
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    stacked: true,
                    labelString: 'porcentaje',
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value) {
                            return Math.abs(value) + '%';
                        }
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
};

export const GRAPHIC_OPTIONS = {
    responsive: true,
    tooltips: {
        mode: 'label',
        callbacks: {
            title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem) {
                return tooltipItem.value;
            }
        }
    },
    elements: {
        line: {
            fill: false
        }
    },
    plugins: {
        datalabels: {
            display: 'auto',
            formatter: function (value, context) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
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
                type: 'linear',
                display: true,
                position: 'left',
                gridLines: {
                    display: false
                },
                tricks: {
                    min: 0,
                    beginAtZero: true
                }
            }
        ]
    }
};

export const DEFAULT_OPTIONS = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    plugins: {
        datalabels: {
            display: true,
            formatter: function (value, context) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
    },
    legend: {
        display: true
    },
    elements: {
        line: {
            fill: false
        }
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
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    callback: function (value) {
                        if (!isNaN(value)) {
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }
                        return value;
                    }
                }
            }
        ]
    }
};

export const RADAR_OPTION = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    plugins: {
        datalabels: {
            display: true
        }
    },
    legend: {
        display: true
    },
    elements: {
        line: {
            fill: false
        }
    },
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100
        }
    },
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
                display: false,
                gridLines: {
                    display: false
                }
            }
        ]
    }
};
