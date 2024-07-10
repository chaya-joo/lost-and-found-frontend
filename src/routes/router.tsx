import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { PATHS } from './paths'
import Login from '../forms_and_inputes/LoginForm'
import SignIn from '../forms_and_inputes/SigninForm'
import AuthGuard from '../auth/AuthGuard'
import AddItemPage from '../pages/AddItemPage'
import ItemsTable from '../pages/ItemsPage'
import OutlinedCard from '../pages/PropfilePage'
import AllRequests from '../pages/AllRequestsPage'
import CustomLayout from '../layouts/backHomeLayout'
import About from '../pages/AboutPage'
const basename = '/lost-and-found-frontend';
export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: PATHS.home,
                element: <h1 style={{ fontSize: '200' }}>home</h1>
            },
            {
                path: PATHS.about,
                element: <About />
            },
            {
                path: PATHS.lossings,
                element: <ItemsTable type={'loosings'} />
            },
            {
                path: PATHS.findings,
                element: <ItemsTable type={'findings'} />
            },
            {
                path: PATHS.addItem,
                element: <AuthGuard><AddItemPage /></AuthGuard>
            },
        ]
    },
    {
        path: PATHS.login,
        element: <>
            <div>
                <CustomLayout />
                <Login />
            </div>
        </>
    },
    {
        path: PATHS.signin,
        element: <><CustomLayout /><SignIn /></>
    },
    {
        path: PATHS.profile,
        element: <><CustomLayout /><OutlinedCard /></>
    },
    {
        path: PATHS.requests,
        element: <><CustomLayout /><AllRequests /></>
    }
])
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';
// import { PATHS } from './paths';
// import Login from '../forms_and_inputs/LoginForm';
// import SignIn from '../forms_and_inputs/SigninForm';
// import AuthGuard from '../auth/AuthGuard';
// import AddItemPage from '../pages/AddItemPage';
// import ItemsTable from '../pages/ItemsPage';
// import OutlinedCard from '../pages/ProfilePage';
// import AllRequests from '../pages/AllRequestsPage';
// import CustomLayout from '../layouts/backHomeLayout';
// import About from '../pages/AboutPage';

// const AppRouter = () => (
//     <BrowserRouter basename="/lost-and-found-frontend">
//         <Routes>
//             <Route path="/" element={<MainLayout />}>
//                 <Route path={PATHS.home} element={<h1 style={{ fontSize: '200' }}>home</h1>} />
//                 <Route path={PATHS.about} element={<About />} />
//                 <Route path={PATHS.lossings} element={<ItemsTable type={'loosings'} />} />
//                 <Route path={PATHS.findings} element={<ItemsTable type={'findings'} />} />
//                 <Route path={PATHS.addItem} element={<AuthGuard><AddItemPage /></AuthGuard>} />
//             </Route>
//             <Route path={PATHS.login} element={<>
//                 <div>
//                     <CustomLayout />
//                     <Login />
//                 </div>
//             </>} />
//             <Route path={PATHS.signin} element={<>
//                 <CustomLayout />
//                 <SignIn />
//             </>} />
//             <Route path={PATHS.profile} element={<>
//                 <CustomLayout />
//                 <OutlinedCard />
//             </>} />
//             <Route path={PATHS.requests} element={<>
//                 <CustomLayout />
//                 <AllRequests />
//             </>} />
//         </Routes>
//     </BrowserRouter>
// );

// export default AppRouter;
