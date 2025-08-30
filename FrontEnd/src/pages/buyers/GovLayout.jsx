import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar';

function GovLayout() {
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

export default GovLayout