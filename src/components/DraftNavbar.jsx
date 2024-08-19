import React, { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { navItems } from "./../data/constants";
import { contact } from "./../data/constants";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnMaximize = useCallback(() => {
    if (window.innerWidth > 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnMaximize);
    return () => {
      window.removeEventListener("resize", closeMenuOnMaximize);
    };
  }, [closeMenuOnMaximize]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNavLinkClick = (path, index = null) => {
    handleCloseMenu();
    if (index !== null) {
      setOpenDropdownIndex(null);
    }
    navigate(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
          <nav className="flex justify-between items-center py-3">
            {/* logo */}
            <a
              href="/"
              className="flex items-center gap-3 text-2xl text-black font-semibold"
            >
              <img src="../images/logo/logo.png" alt="" className="w-28 mr-2" />
            </a>

            {/* nav items for large devices */}
            <ul className="hidden lg:flex gap-12">
              {navItems.map(({ path, title, dropdown, subItems }, index) => (
                <li
                  key={path}
                  className="relative text-base text-black hover:text-primary duration-300 flex items-center"
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => handleNavLinkClick(path)}
                  >
                    {title}
                  </NavLink>
                  {dropdown && (
                    <div
                      className="relative ml-2 flex items-center"
                      onClick={() => toggleDropdown(index)}
                      onMouseEnter={() => setOpenDropdownIndex(index)}
                      onMouseLeave={() =>
                        // Only close dropdown if not hovering over it
                        setTimeout(() => {
                          if (
                            !document
                              .querySelector(`[data-dropdown-${index}]`)
                              ?.contains(document.activeElement)
                          ) {
                            setOpenDropdownIndex(null);
                          }
                        }, 100)
                      }
                    >
                      {openDropdownIndex === index ? (
                        <ChevronUp className="cursor-pointer" />
                      ) : (
                        <ChevronDown className="cursor-pointer" />
                      )}
                      {openDropdownIndex === index && (
                        <ul
                          data-dropdown={index}
                          className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md whitespace-nowrap"
                          onMouseEnter={() => setOpenDropdownIndex(index)}
                          onMouseLeave={() => {
                            setTimeout(() => {
                              if (
                                !document
                                  .querySelector(`[data-dropdown-${index}]`)
                                  ?.contains(document.activeElement)
                              ) {
                                setOpenDropdownIndex(null);
                              }
                            }, 100);
                          }}
                        >
                          {subItems.map((subItem) => (
                            <li
                              key={subItem.path}
                              className="px-4 py-2 hover:bg-gray-100 text-black hover:text-primary duration-300"
                            >
                              <NavLink
                                to={subItem.path}
                                className="block"
                                onClick={() =>
                                  handleNavLinkClick(subItem.path, index)
                                }
                              >
                                {subItem.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <ul className="hidden lg:flex justify-center space-x-12 items-center">
              {contact.map(({ path, title }) => (
                <li
                  key={path}
                  className="bg-primary text-white rounded-md flex gap-2 hover:bg-primary/80 duration-300"
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex gap-2 py-2 px-3"
                        : "flex gap-2 py-2 px-3"
                    }
                  >
                    {title} <ArrowRight />
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* mobile menu */}
            <div className="lg:hidden block">
              <button onClick={handleMenuToggler}>
                {isMenuOpen ? (
                  <FaXmark className="w-5 h-5 text-primary" />
                ) : (
                  <FaBarsStaggered className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>
          </nav>

          {/* mobile menu items */}
          <div
            className={`px-4 bg-primary py-5 mb-2 rounded-xl ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul>
              {navItems.map(({ path, title, dropdown, subItems }, index) => (
                <li
                  key={path}
                  className="relative text-base text-white py-1 hover:text-black/70 duration-300"
                >
                  <div className="flex items-center">
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? "active-black" : ""
                      }
                      onClick={() => handleNavLinkClick(path)}
                    >
                      {title}
                    </NavLink>
                    {dropdown && (
                      <div
                        className="ml-2"
                        onClick={() => toggleDropdown(index)}
                      >
                        {openDropdownIndex === index ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </div>
                    )}
                  </div>
                  {dropdown && (
                    <ul
                      className={`pl-4 mt-2 ${
                        openDropdownIndex === index ? "block" : "hidden"
                      }`}
                      onMouseEnter={() => setOpenDropdownIndex(index)}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          if (
                            !document
                              .querySelector(`[data-dropdown-${index}]`)
                              ?.contains(document.activeElement)
                          ) {
                            setOpenDropdownIndex(null);
                          }
                        }, 100);
                      }}
                    >
                      {subItems.map((subItem) => (
                        <li
                          key={subItem.path}
                          className="py-1 text-white hover:text-black/70"
                        >
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              isActive ? "active-black block" : "block"
                            }
                            onClick={() =>
                              handleNavLinkClick(subItem.path, index)
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <ul className="lg:flex justify-center space-x-12 items-center">
              {contact.map(({ path, title }) => (
                <li
                  key={path}
                  className="bg-primary text-white hover:text-black duration-300 flex gap-2 hover:translate-x-1"
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "active-black flex gap-2" : "flex gap-2"
                    }
                    onClick={() => handleNavLinkClick(path)}
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;