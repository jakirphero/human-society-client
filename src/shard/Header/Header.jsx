import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Modal from "./Modal";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const [isModalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const navMenus = (
        <>
            <li className="hover:text-blue-500">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} className="text-xl" />
                </Link>
            </li>
            <li className="hover:text-blue-500">
                <Link to="/videos">
                    <FontAwesomeIcon icon={faVideo} className="text-xl" />
                </Link>
            </li>
            <li className="hover:text-blue-500">
                <Link to="/groups">
                    <FontAwesomeIcon icon={faUsers} className="text-xl" />
                </Link>
            </li>
        </>
    );

    return (
        <div className="navbar bg-gray-200 fixed top-0 left-0 right-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navMenus}
                    </ul>
                </div>
                <p className="text-xl capitalize">human<span className="text-xl text-blue-500">Society</span></p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navMenus}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button
                            onClick={toggleModal}
                            className="h-10 w-10 rounded-full hover:bg-slate-500"
                        >
                            <img src={user?.photoURL} alt="user img" className="h-10 w-10 rounded-full mr-5" />
                        </button>
                    </> : <>
                        <button
                            className="h-10 w-10 rounded-full mr-5">
                        </button>
                    </>
                }
            </div>
            {isModalOpen && <Modal toggleModal={toggleModal} user={user} logOut={logOut} />}
        </div>
    );
};

export default Header;
