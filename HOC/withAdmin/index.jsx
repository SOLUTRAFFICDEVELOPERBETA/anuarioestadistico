/* eslint-disable space-before-function-paren */
/* eslint-disable react/display-name */
import React from 'react'
import MainLayout from '../../Layout/main'
import AuthContext from '../../contexts/auth'
import LoadingContainer from '../../containers/loading'
import { useRouter } from 'next/router'
import AlertContext from '../../contexts/alert'

/**
 * @description Metodo para veridicar si el usuario esta auteticado y es admin y así poderle mostrar la página
 * @param {Any} Page 
 */
export default function withAdmin(Page) {
  return () => {
    const router = useRouter()
    const { showMessage } = React.useContext(AlertContext)
    const { user } = React.useContext(AuthContext)
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
      if (user) {
        const { role } = user
        if (role === 'admin') {
          setLoaded(true)
        } else {
          showMessage('Acceso denegado', 'error')
          router.push('/')
        }
      } else {
        router.push('/')
        setLoaded(false)
      }
    }, [user])

    return (
      <MainLayout>
        {loaded ? <Page /> : <LoadingContainer />}
      </MainLayout>
    )
  }
}
