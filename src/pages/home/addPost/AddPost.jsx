import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons/faPhotoFilm";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AddPost = () => {
    return (
        <Link to="/" className="block w-[90%] mx-auto">
            <div className="card bg-base-100 w-full shadow-xl mt-8 h-[150px] overflow-hidden">
                <div className="card-body h-full flex flex-col justify-between py-2">
                    <div className="card-title flex items-center">
                        <img
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="Image"
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <span className="text-blue-500 hover:underline">Create Your Post</span>
                    </div>
                    <div className="divider"></div>
                    <div className=" flex items-center space-x-4">
                        <p><FontAwesomeIcon icon={faVideo} className="mr-1 text-red-400" />Live</p>
                        <p><FontAwesomeIcon icon={faPhotoFilm} className="mr-1 text-blue-400" />Photo</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AddPost;