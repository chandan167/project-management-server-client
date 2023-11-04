import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import AppRouter from "./AppRouter"
import { useMemo } from "react";
import { getDesignTokens } from "./config/theme";
import themeSignal from "./logic/theme.logic";


function App() {


  const theme = useMemo(() => {
    return createTheme(getDesignTokens(themeSignal.getTheme))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSignal.getTheme])

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <AppRouter />
          </SnackbarProvider>
        </>
      </ThemeProvider>

    </>
  )
}

export default App
