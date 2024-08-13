import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons/faPhotoFilm";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const AddPost = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="block w-[90%] mx-auto cursor-pointer">
            <div className="card bg-base-100 w-full shadow-xl mt-8 h-[150px] overflow-hidden">
                <div className="card-body h-full flex flex-col justify-between py-2">
                    <div className="card-title flex items-center">
                        <div className="avatar ">
                            <div className="w-14 rounded-full">
                                <button>
                                    <img src={user?.photoURL} alt="User Avatar" className="w-10 h-auto" />
                                </button>
                            </div>
                        </div>
                        <Link to="/postForm"><span className="text-blue-500 hover:underline">Create Your Post</span></Link>
                    </div>
                    <div className="divider"></div>
                    <div className=" flex items-center space-x-4">
                        <p><FontAwesomeIcon icon={faVideo} className="mr-1 text-red-400" />Live</p>
                        <p><FontAwesomeIcon icon={faPhotoFilm} className="mr-1 text-blue-400" />Photo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;