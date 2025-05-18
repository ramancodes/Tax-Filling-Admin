"use client";
import React, { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector, RootState } from "../../store";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const {
    bearerToken,
    apiState: { status, isError, message },
    isLoginError,
  } = useAppSelector((state: RootState) => state.application);
  
  useEffect(() => {
    setIsAuthenticated(!!bearerToken);
  }, [bearerToken]);

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/dashboard/overview');
    }
  }, [isAuthenticated]);
  
  return (
    <div>
      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center mt-10 bg-gray-100">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
            <Image
              width={180}
              height={180}
              src="/logo.svg"
              alt="SimpleTax Logo"
              className="h-13 w-max"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Admin Panel</h1>
            <p className="text-gray-600 mb-8">Manage your users, tax fillings, and other details.</p>
          </div>
        </div>
      )}
    </div>
  );
}