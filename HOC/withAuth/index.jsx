/* eslint-disable space-before-function-paren */
/* eslint-disable react/display-name */
import React from 'react'
import MainLayout from '../../Layout/main'
import AuthContext from '../../contexts/auth'
import LoadingContainer from '../../containers/loading'

/**
 * @description Metodo para veridicar si el usuario esta auteticado y  así poderle mostrar la página
 * @param {Any} Page 
 */
export default function withAuth(Page) {
  return () => {
    const { user } = React.useContext(AuthContext)
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
      if (user) {
        setLoaded(true)
      } else {
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
