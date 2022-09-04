import '../styles/global.css';
import { AppProps } from 'next/app';
// pages/_app.js

// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primaryFontColor: '#FFFFFF',
  secondaryFontColor: '#EF4874',
  plainOldBlue: 'blue',
  primaryBgColor: '#552EA3',
  actionPrimary: {
    default: '#000000',
    900: '#000000',
    800: '#000000',
    700: '#000000',
    600: '#000000',
    500: '#000000',
    400: '#000000',
    300: '#000000',
    200: '#000000',
    100: '#000000',
    50: '#000000'
  },
  actionSecondary: {
    default: '#EF4874',
    900: '#EF4874',
    800: '#EF4874',
    700: '#EF4874',
    600: '#EF4874',
    500: '#EF4874',
    400: '#EF4874',
    300: '#EF4874',
    200: '#EF4874',
    100: '#EF4874',
    50: '#EF4874'
  }
};

const theme = extendTheme({
  colors,
  components: {
    Text: {
      baseStyle: (_props) => ({
        color: colors.primaryFontColor,
      }),
      variants: {
        // used as <Text variant="secondary">
        secondary: (_props) => ({
          color: colors.secondaryFontColor
        })
      }
    }
  },

  styles: {
    global: (_props) => ({
      // Optionally set global CSS styles
      body: {
        color: colors.primaryFontColor
      }
    })
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
