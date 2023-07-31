import { Outlet } from "react-router-dom";

function LayoutComponent() {
  return (
    <div>
      <div>
        <h3>I'm the Layout Component Navbar</h3>
      </div>
      <Outlet />
      <div>
        <h3>Im a Footer</h3>
      </div>
    </div>
  );
}

export default LayoutComponent;
