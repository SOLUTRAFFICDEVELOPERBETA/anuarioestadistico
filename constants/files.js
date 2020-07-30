/* eslint-disable no-undef */
import fb from '../config/firebase'
import moment from 'moment'

/**
 * Método para subir archivos
 * @param {File} file Archivo a subir
 * @param {string} path Ruta del archivo
 * @param {string} name Nombre del archivo
 * @param {(progress) => void} onSnap Función para obtener el progreso de subida
 * @param {(error) => void} onError Función de error
 */
export function UploadFile (
  file,
  path = '/wise',
  name = '',
  onSnap = (progress) => console.log('Progress', progress),
  onError = (error) => console.error('Upload Error:', error)
) {
  return new Promise((resolve, reject) => {
    const upload = new File([file], name || file.name)
    const ref = fb.storage.ref(`${path}/${upload.name}`)
    const task = ref.put(file)
    task.on('state_changed', (snap) => {
      var pro = (snap.bytesTransferred / snap.totalBytes) * 100
      onSnap(pro)
    }, (error) => {
      onError(error)
    }, () => {
      task.snapshot.ref.getDownloadURL().then(url => {
        resolve({
          url,
          path: `${path}/${ref.name}`,
          name: ref.name
        })
      })
    })
  })
}

/**
 * Método para eliminar un archivo
 * @param {string} path Ruta del archivo
 */
export function handleDeleteFile (path) {
  return fb.storage.ref(path).delete()
}

/**
 * Método para descargar un archivo CSV o JSON
 * @param {string} data Información a descargar
 * @param {'csv' | 'json'} type Tipo de dato
 * @param {string} name Nombre del archivo
 */
export function downloadDoc (data, type, name) {
  const str = `data:text/${type};charset=utf-8,` + encodeURIComponent(data)
  const anchor = document.createElement('a')
  anchor.setAttribute('href', str)
  anchor.setAttribute('target', '_blank')
  anchor.setAttribute('download', `${name}_key_&_${moment().format('lll')}.csv`)
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}