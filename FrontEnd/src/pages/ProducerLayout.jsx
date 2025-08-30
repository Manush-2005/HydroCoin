import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './producer/Sidebar';

function ProducerLayOut() {
    return (
        <>
            <main className="flex">
                <Sidebar />
                <div className="w-full">
                    <Outlet />
                </div>
                
            </main>
        </>
    )
}

export default ProducerLayOut