import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header id="title"><h1>Lotion</h1>
        <div id="sub-title">
            Like Notion, but worse.
        </div></header>
      <div id="content">
        {/* child components get injected here and replace <Outlet /> */}
        <Outlet />
      </div>
    </>
  )
}

export default Layout;