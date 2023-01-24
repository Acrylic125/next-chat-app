import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, responsiveFontSizes, StyledEngineProvider } from "@mui/material/styles";
import { Box, Container, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

const clientSideEmotionCache = createEmotionCache();

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DA127D",
      "50": "#FFE3EC",
      "100": "#FFB8D2",
      "200": "#FF8CBA",
      "300": "#F364A2",
      "400": "#E8368F",
      "500": "#DA127D",
      "600": "#BC0A6F",
      "700": "#A30664",
      "800": "#870557",
      "900": "#620042",
    },
    grey: {
      "50": "#F5F7FA",
      "100": "#E4E7EB",
      "200": "#CBD2D9",
      "300": "#9AA5B1",
      "400": "#7B8794",
      "500": "#616E7C",
      "600": "#52606D",
      "700": "#3E4C59",
      "800": "#323F4B",
      "900": "#1F2933",
    },
    background: {
      default: "#1F2933",
      paper: "#1F2933",
    },
    text: {
      primary: "#F5F7FA",
    },
  },
});
theme = responsiveFontSizes(theme);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CacheProvider value={clientSideEmotionCache}>
          <QueryClientProvider client={queryClient}>
            <Box className="w-screen h-screen" bgcolor="grey.900" color="grey.50">
              <Component {...pageProps} />
            </Box>
          </QueryClientProvider>
        </CacheProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
