"use client";
import React from "react";
import Image from 'next/image';
import { useAppDispatch, useAppSelector, RootState } from "../../store";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const {
    bearerToken
  } = useAppSelector((state: RootState) => state.application);
  
  return (
    <div>
      {!bearerToken ? (
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
            <p className="text-gray-600 mb-8">Please Login to continue.</p>
          </div>
        </div>
      ):(
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