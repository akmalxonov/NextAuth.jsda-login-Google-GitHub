"use client"
import React from 'react';
import { signOut, useSession} from "next-auth/react"

const Dashboard = () => {
    const {data} =useSession()
    console.log(data);
    
    const logOut =()=>{
        signOut({redirect:true,callbackUrl:"/login"})
    }
    
    return (
        <div>
            Dashboard
            <button className='border-1 px-5  py-2 bg-red-500 hover:bg-amber-300 rounded-2xl transition duration-300 ease-in-out  ' onClick={logOut}>LogOut</button>
        </div>
    );
}

export default Dashboard;
