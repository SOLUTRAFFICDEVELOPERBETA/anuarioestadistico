export const STICKY_COLOR = ['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740']

export const CHART_COLORS = [
  '#ea5362',
  '#54647e',
  '#5b9ee5',
  '#4bccad',
  '#9fd468',
  '#fdca61',
  '#f4a166',
  '#98ea84',
  '#7eb7e8',
  '#43463f',
  '#858adf'
]

export const COLORS = [
  '#1976d2',
  '#0d47a1',
  '#2962ff',
  '#01579b',
  '#dc004e',
  '#b71c1c',
  '#f44336',
  '#bf360c',
  '#ff9800',
  '#ff6f00',
  '#2196f3',
  '#006064',
  '#4caf50',
  '#1b5e20',
  '#546e7a',
  '#455a64',
  '#263238',
  '#212121',
  '#cccccc',
  '#ffffff'
]

export function randomHexColorCode () {
  const n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}
