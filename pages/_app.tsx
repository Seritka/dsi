import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { renderImage } from '@utils/consoleImage'
const theme = extendTheme({
  fonts: {
    heading: "Pretendard",
    body: "Pretendard",
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    renderImage('https://media.discordapp.net/attachments/864139837857333271/868847381163151360/A4A4.png')
  }, [])

  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
}
export default MyApp
