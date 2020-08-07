
/**
 * Método para mover objeto dentro de un array
 * @param {Array} arr Arreglo
 * @param {number} index Indice
 * @param {string} $index $index
 */
export function moveArray (arr, index, $index) {
    if ($index >= arr.length) {
      var k = $index - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice($index, 0, arr.splice(index, 1)[0])
    return arr // for testing
  }
  