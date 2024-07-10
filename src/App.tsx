import { RouterProvider, Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { router } from './routes/router'
// import AppRouter from './routes/router'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { cacheRtl, theme as rtlTheme } from './styles/rtlTheme'
import { ThemeProvider, CacheProvider } from '@emotion/react';
import InitializedAuth from "./auth/InitializedAuth";
import { createTheme, ThemeProvider as ThemeProviderStyle } from '@mui/material/styles';
import Login from './forms_and_inputes/LoginForm'
import SignIn from './forms_and_inputes/SigninForm'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { PATHS } from './routes/paths'
import AuthGuard from './auth/AuthGuard'
import AddItemPage from './pages/AddItemPage'
import ItemsTable from './pages/ItemsPage'
import OutlinedCard from './pages/PropfilePage'
import AllRequests from './pages/AllRequestsPage'
import CustomLayout from './layouts/backHomeLayout'
import About from './pages/AboutPage'

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
});
// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <ThemeProvider theme={rtlTheme}>
//         <CacheProvider value={cacheRtl}>
//           <div dir="rtl">
//             <Provider store={store} >
//               <InitializedAuth />
//               <RouterProvider router={router} />
//               {/* <AppRouter/> */}
//             </Provider>
//           </div>
//         </CacheProvider>
//       </ThemeProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
const App = () => (
  <Provider store={store} >
    <InitializedAuth />
    <BrowserRouter basename="/lost-and-found-frontend">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/loosings" element={<ItemsTable type={'loosings'} />} />
        <Route path="/findings" element={<ItemsTable type={'findings'} />} />
        <Route path="/addItem" element={<AuthGuard><AddItemPage /></AuthGuard>} />
        <Route path="/login" element={<div><CustomLayout /> <Login /></div>} />
        <Route path="/signin" element={<><CustomLayout /><SignIn /></>} />
        <Route path="/profile" element={<><CustomLayout /><OutlinedCard /></>} />
        <Route path="/requests" element={<><CustomLayout /><AllRequests /></>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
export default App;
