import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../index";
import menu from "../../assets/menu.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menushow, setMenushow] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-white border-b-3 relative ">
      <Container>
        <nav className="flex text-sm md:text-xl my-1 justify-between sm:justify-center items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="hidden sm:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
          <button
            className="pl-3 shrink-0 sm:hidden"
            onClick={() => {
              setMenushow(!menushow);
            }}
          >
            <img src={menu} alt="menu_icon" width="25" />
          </button>
        </nav>
        {menushow && (
            <ul className="bg-white sm:hidden text-center flex flex-col py-2 absolute top-22 right-0 w-screen">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="border-b-2">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMenushow(false);
                      }}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
