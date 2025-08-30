import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function LayOut() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default LayOut