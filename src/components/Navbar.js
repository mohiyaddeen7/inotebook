import { useEffect, useRef } from "react";
import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(prop) {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onLogoutPhone = () => {
    hamburgerMenuFunc();
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();

  const hamburgerMenuFunc = () => {
    try {
      document
        .querySelector(".navSideBar")
        .classList.toggle("translate-y-full");
      document.querySelector(".menuOpen").classList.toggle("hidden");
      document.querySelector(".menuClose").classList.toggle("hidden");
      document.querySelector(".backgroundBlur").classList.toggle("hidden");
    } catch (error) {}
  };

  useEffect(() => {
    console.log(location);
  }, [location]); //demonstration of useLocation
  try {
    return (
      <div className="sticky top-0">
        <div className="backgroundBlur absolute h-screen w-screen backdrop-blur-sm -z-10 hidden">
          hi
        </div>
        <div className="navBar text-black flex justify-between items-center p-2 bg-green-400">
          <h3 className="p-2 text-xl font-bold">
            <NavLink to={"/"}>{prop.name}</NavLink>
          </h3>
          <nav className="w-50 flex justify-end h-20 z-10">
            <button
              className="hamburgerMenu  justify-center items-center"
              id="hamburgerMenu"
              onClick={hamburgerMenuFunc}
            >
              <span className="material-symbols-outlined menuOpen">menu</span>
              <span className="material-symbols-outlined hidden menuClose">
                menu_open
              </span>
              Menu
            </button>

            <ul className="flex justify-center items-center navLaptop">
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
                      pointerEvents:
                        location.pathname === "/login" ? "none" : "",
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
                    onClick={onLogout}
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

        <div className="navSideBar fixed bg-green-400 shadow-2xl shadow-green-200 h-full left-0 z-10 top-0 w-1/2 transform  transition-transform translate-y-full duration-200">
          <h3 className="p-2 text-xl font-bold">
            <NavLink to={"/"}>{prop.name}</NavLink>
          </h3>
          <nav className="w-full flex items-center justify-center z-10">
            <ul className="flex flex-col justify-center items-center navMobile w-full">
              <li className="p-2 w-full flex">
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
                  className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                  onClick={hamburgerMenuFunc}
                >
                  <span className="material-symbols-outlined ">home</span>
                  <span className="invisible NavItemSpan transition-all ">
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="p-2 flex w-full">
                <NavLink
                  to={"/about"}
                  style={{
                    pointerEvents: location.pathname === "/about" ? "none" : "",
                    color: location.pathname === "/about" ? "white" : "",
                  }}
                  className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                  onClick={hamburgerMenuFunc}
                >
                  <span className="material-symbols-outlined">info</span>
                  <span className="invisible NavItemSpan">About</span>
                </NavLink>
              </li>
              <li className="p-2 flex w-full">
                <NavLink
                  to={"/"}
                  className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                  onClick={hamburgerMenuFunc}
                >
                  <span className="material-symbols-outlined">
                    contact_support
                  </span>
                  <span className="invisible NavItemSpan">Contact</span>
                </NavLink>
              </li>
              {!localStorage.getItem("token") && (
                <li className="p-2 flex w-full">
                  <NavLink
                    to={"/login"}
                    style={{
                      pointerEvents:
                        location.pathname === "/login" ? "none" : "",
                      color: location.pathname === "/login" ? "white" : "",
                    }}
                    className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                    onClick={hamburgerMenuFunc}
                  >
                    <span className="material-symbols-outlined">login</span>
                    <span className="invisible NavItemSpan">Login</span>
                  </NavLink>
                </li>
              )}
              {!localStorage.getItem("token") && (
                <li className="p-2 flex w-full">
                  <NavLink
                    to={"/signup"}
                    style={{
                      pointerEvents:
                        location.pathname === "/signup" ? "none" : "",
                      color: location.pathname === "/signup" ? "white" : "",
                    }}
                    className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                    onClick={hamburgerMenuFunc}
                  >
                    <span className="material-symbols-outlined">
                      app_registration
                    </span>
                    <span className="invisible NavItemSpan">Signup</span>
                  </NavLink>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="p-2 flex w-full">
                  <button
                    type="button"
                    onClick={onLogoutPhone}
                    className="NavItem flex justify-start items-center border-2 border-transparent  hover:border-white hover:bg-white hover:text-green-500 transition-all  border-solid p-2 rounded w-full"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="invisible NavItemSpan">Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    alert("Internal server error");
  }
}

Navbar.defaultProps = {
  name: "Brand logo",
  mode: "light",
};
