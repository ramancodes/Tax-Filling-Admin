'use client';
import { redirect } from 'next/navigation';
import { useAppSelector, RootState } from "../store";
import { useEffect } from 'react';

export default function Dashboard() {

  const {
      bearerToken
  } = useAppSelector((state: RootState) => state.application);

  useEffect(()=>{
    if(bearerToken){
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  } ,[]);
}