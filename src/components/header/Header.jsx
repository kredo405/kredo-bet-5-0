import { useNavigate } from "react-router-dom";
import logo from "./kredi-logo.png";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Футбол",
      link: "/home/football",
      logo: "https://img.icons8.com/?size=100&id=9820&format=png&color=209BFF",
    },
  ];

  return (
    <div className="relative">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className=" max-w-7xl px-2 sm:px-6 lg:px-10">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to={"/home/top"} className="flex items-center">
                    <img
                      className="block h-14 w-auto lg:hidden"
                      src={logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-12 w-auto lg:block"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                  <div className="hidden sm:ml-16 sm:block">
                    <div className="flex">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={"/home/top"}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium flex items-center"
                          )}
                        >
                          <img
                            className="w-5 mr-2"
                            src={item.logo}
                            alt="logo"
                          />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className=" px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={"/home/top"}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium flex items-center"
                    )}
                  >
                    <img className="w-5 mr-2" src={item.logo} alt="logo" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
