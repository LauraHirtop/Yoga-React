import '../public/styles/style.css'
import { Provider } from 'next-auth/client'
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0
      }}
      session={pageProps.session} >
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
