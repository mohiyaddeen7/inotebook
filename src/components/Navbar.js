import { useEffect } from "react";
import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(prop) {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]); //demonstration of useLocation
  return (
    <>
      <div className="navBar text-black flex justify-between items-center p-2 bg-green-400">
        <h3 className="p-2 text-xl font-bold">
          <NavLink to={"/"}>{prop.name}</NavLink>
        </h3>
        <nav>
          <ul className="flex justify-center items-center">
            <li className="p-2">
              {/* two ways of accessing location , 1 - is NavLink with isActive and isPending ,
            2 - is using useLocation hook*/}
              <NavLink
                to={"/"}
                style={({ isActive }) => {
                  return {
                    visibility: isActive ? "visible" : "",
                    pointerEvents: isActive ? "none" : "",
                    color: isActive ? "white" : "",
                  };
                }}
                className="NavItem flex justify-center items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl "
              >
                <span className="material-symbols-outlined ">home</span>
                <span className="invisible NavItemSpan transition-all">
                  Home
                </span>
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to={"/about"}
                style={{
                  pointerEvents: location.pathname === "/about" ? "none" : "",
                  color: location.pathname === "/about" ? "white" : "",
                }}
                className="NavItem flex justify-center items-center border-2 border-transparent hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl"
              >
                <span className="material-symbols-outlined">info</span>
                <span className="invisible NavItemSpan">About</span>
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to={"/"}
                className="NavItem flex justify-center items-center border-2 border-transparent hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl"
              >
                <span className="material-symbols-outlined">
                  contact_support
                </span>
                <span className="invisible NavItemSpan">Contact</span>
              </NavLink>
            </li>
            {!localStorage.getItem("token") && (
              <li className="p-2">
                <NavLink
                  to={"/login"}
                  style={{
                    pointerEvents: location.pathname === "/login" ? "none" : "",
                    color: location.pathname === "/login" ? "white" : "",
                  }}
                  className="NavItem flex justify-center items-center border-2 border-transparent hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl"
                >
                  <span className="material-symbols-outlined">login</span>
                  <span className="invisible NavItemSpan">Login</span>
                </NavLink>
              </li>
            )}
            {!localStorage.getItem("token") && (
              <li className="p-2">
                <NavLink
                  to={"/signup"}
                  style={{
                    pointerEvents:
                      location.pathname === "/signup" ? "none" : "",
                    color: location.pathname === "/signup" ? "white" : "",
                  }}
                  className="NavItem flex justify-center items-center border-2 border-transparent hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl"
                >
                  <span className="material-symbols-outlined">
                    app_registration
                  </span>
                  <span className="invisible NavItemSpan">Signup</span>
                </NavLink>
              </li>
            )}
            {localStorage.getItem("token") && (
              <li className="p-2">
                <button
                  type="button"
                  onClick={onClick}
                  className="NavItem flex justify-center items-center border-2 border-transparent hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded-3xl"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="invisible NavItemSpan">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  name: "Brand logo",
  mode: "light",
};
