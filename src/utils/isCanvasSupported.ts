const canvas = document.createElement('canvas')
const isCanvasSupported = !!(canvas.getContext && canvas.getContext('2d'))

export default isCanvasSupported