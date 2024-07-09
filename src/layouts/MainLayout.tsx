import { Outlet } from "react-router-dom"
import ResponsiveAppBar from "./NavBar"
export default function MainLayout() {
  return <>
    <ResponsiveAppBar />
    <main
      style={{ paddingTop: '65px', marginTop: '30px' }}
    >
      <Outlet />
    </main>
    {/* <footer style={{ position: 'fixed', marginTop: '500px', inset: 0, fontSize: '60px', backgroundColor: 'GrayText', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '20px', justifyContent: 'center', alignItems: 'center' ,color:'white'}}>
        צרו קשר
        <br />
        בכתובת מייל: prwyyqtsly@gmail.com
        <br />
        בטלפון: 0522222222
      </div>
    </footer > */}
  </>
}



