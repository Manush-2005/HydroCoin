import React from 'react'

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-[#0f1411]">
            <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-white">
                    HYDRO<span className="text-hydrogen-neon">COIN</span>
                </span>
            </div>
            <ul className="flex space-x-8">
                <li><a href="#" className="hover:text-hydrogen-neon">Home</a></li>
                <li><a href="#" className="hover:text-hydrogen-neon">What's new</a></li>
            </ul>
        </nav>
    )
}

export default Navbar