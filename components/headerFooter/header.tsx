"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import {logout} from '../../store/applications/actions'
import { useRouter, usePathname  } from "next/navigation";
import toast from "react-hot-toast";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const {
      bearerToken,
      apiState: { status, isError, message },
      isLoginError,
  } = useAppSelector((state: RootState) => state.application);

  React.useEffect(() => {
    if(isLoginError){
      toast.error(message);
    }
  }, [isLoginError]);
  
  const handleLogout = () =>{
    dispatch(logout());
    router.push("/");
  }

  useEffect(() => {
    setIsAuthenticated(!!bearerToken);
  }, [bearerToken]);

  useEffect(() => {
    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Head>
        <title>SimpleTax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header & Navbar */}
      <header className="shadow-md bg-[#303c8c]">
        <div className="flex flex-col justify-center items-center w-full">
          <div className={`flex items-center justify-between px-8 py-2 w-full`}>
            <Link href='/'>
                <Image
                width={180}
                height={180}
                src="/logo-dark.svg"
                alt="SimpleTax Logo"
                className="h-13 w-max"
                />
            </Link>
            {
              !isAuthenticated ? (
                <div className="pr-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center px-4 py-1 border bg-white border-white text-gray-800 hover:bg-gray-200 hover:text-[#303c8c] rounded mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-1 border bg-white border-white text-gray-800 hover:bg-gray-200 hover:text-[#303c8c] rounded"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pr-4">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer inline-flex items-center px-4 py-1 border bg-white border-white text-gray-800 hover:bg-gray-200 hover:text-[#303c8c] rounded mr-2"
                  >
                    Logout
                  </button>
                </div>
              )
            } 
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;