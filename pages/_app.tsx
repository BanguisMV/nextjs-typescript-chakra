import '../styles/globals.css'
import { ChakraProvider, Container} from "@chakra-ui/react"
import NextNprogress from 'nextjs-progressbar';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider >
        <Container maxW="container.lg" padding={4} >
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
          <Component {...pageProps} />
        </Container>
  </ChakraProvider>
  )
}

export default MyApp
