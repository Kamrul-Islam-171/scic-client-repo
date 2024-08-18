import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";






const NavBar = () => {

    

   

    const { user, logOut } = useContext(AuthContext);
    

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }



    const handleLogout = () => {
        console.log('please logout');
        logOut()
            .then(() => {
                console.log('sign out successfully');
            })
            .catch(error => {
                console.log(error)
            })
    }



    const navlinks = <>
        <NavLink className={({ isActive }) =>
            isActive ? " font-semibold border-b-2 bg-blue-500 text-white px-5 py-2 " : " font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/'>Home</NavLink>
        
        
    </>

    return (
        <div className="">
            <div className=" w-full z-50 top-0 shadow-md ">


                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul onClick={scrollToTop} tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navlinks}
                            </ul>
                        </div>
                        <Link onClick={scrollToTop} to={'/'} className="  w-[60px] h-[50px] "><img className="w-full h-full" src={'/product.webp'} alt="" /></Link>
                        <Link onClick={scrollToTop} to={'/'} className=" font-bold text-lg md:text-xl lg:text-2xl flex gap-0 "><span className="text-gray-500">Product</span><span className="text-blue-500">Bazzar</span></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul onClick={scrollToTop} className="menu menu-horizontal px-1 flex gap-5">
                            {navlinks}
                        </ul>
                    </div>

                    <div className="navbar-end space-x-3 ">
                        {
                            user ?
                                <>
                                    <div className="dropdown dropdown-end tooltip tooltip-bottom tooltip-success tooltip-" data-tip={user?.displayName}>
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-9 rounded-full">
                                                <img alt="Not found" src={user.photoURL} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                            <li>
                                                <Link to='/userProfile' className="justify-between">
                                                    Profile

                                                </Link>
                                            </li>
                                            <li><Link>{user?.displayName}</Link></li>

                                        </ul>
                                    </div>

                                    <div onClick={scrollToTop} className=''>
                                        <button onClick={handleLogout} className="btn rounded-none bg-blue-500 hover:bg-blue-800 text-white font-medium  border-none px-4">LogOut</button>
                                    </div>
                                </>
                                :
                                <>
                                    <div onClick={scrollToTop} className=''>
                                        <Link to='/register' className="btn rounded-none bg-blue-500 hover:bg-blue-800 text-white font-medium  border-none px-4">Register</Link>
                                    </div>
                                    <div onClick={scrollToTop} className=''>
                                        <Link to='/login' className="btn rounded-none bg-blue-500 hover:bg-blue-800 text-white font-medium  border-none px-4">LogIn</Link>

                                    </div>
                                </>
                        }
                        

                    </div>



                </div>

            </div>
        </div>
    );
};

export default NavBar;