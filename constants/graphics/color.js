// Variables para obtener los colores de las gráficas.
const hex = [23, 162, 184, 0, 123, 255];

// Paletas de colores básicas para la gráficas
export const constants = [
    '#007bff',
    '#6610f2',
    '#053145',
    '#2b7494',
    '#8543c4',
    '#6f42c1',
    '#20c997',
    '#17a2b8',
    '#7ec3de',
    '#9775e6',
    '#4404d9',
    '#04abd9'
];

// Método para obtener un elemento aleatorio del arreglo de hex.
const getColorHex = () => {
    return Math.floor(Math.random() * hex.length);
};

// Método para obtener un color aleatorio.
export const randomColor = () => {
    // const rgb = Math.floor(Math.random() * 666666 + 333333);
    // return `#${rgb}`;
    return `rgb(${hex[getColorHex()]}, ${hex[getColorHex()]}, ${hex[getColorHex()]})`;
};

/**
 * Método para obtener una paleta de colores aleatoria.
 * @param size Tamaño de la paleta
 */
export const getRandomPalette = (size) => {
    if (size <= constants.length) {
        return constants;
    } else {
        const colors = new Array(size);
        colors.fill('');
        colors.forEach((color, index) => {
            colors[index] = randomColor();
        });
        return colors;
    }
};

export default { constants, randomColor, getRandomPalette };
