import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { router } from './routes/router'
// import AppRouter from './routes/router'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { cacheRtl, theme as rtlTheme } from './styles/rtlTheme'
import { ThemeProvider, CacheProvider } from '@emotion/react';
import InitializedAuth from "./auth/InitializedAuth";
import { createTheme, ThemeProvider as ThemeProviderStyle } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={rtlTheme}>
        <CacheProvider value={cacheRtl}>
          <div dir="rtl">
            <Provider store={store} >
              <InitializedAuth />
              <RouterProvider router={router} />
              {/* <AppRouter/> */}
            </Provider>
          </div>
        </CacheProvider>
      </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;
