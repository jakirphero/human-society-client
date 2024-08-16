import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faThumbsUp as faLike, faComment as faComment, faShareAlt, faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyProfileCard = ({ post, refetch }) => {
    const { userImage, userName, text, image } = post;
    const [isExpanded, setIsExpanded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleDelete = async (post) => {
        console.log(post)
        const res = await axiosSecure.delete(`/post/${post._id}`);
        console.log(res);
        if (res.status === 200) {
            refetch();
        }
    }
    return (
        <div className="card w-full md:w-2/3 bg-white shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative">
            <div className="card-body p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userImage} alt="User Avatar" className="object-cover w-full h-full rounded-full" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold ml-4 text-gray-800">{userName}</h3>
                    </div>
                    <div className="relative">
                        <button onClick={toggleMenu} className="p-2 text-gray-600 hover:text-gray-900">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        {menuOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <button>
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Edit
                                    </button>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <button onClick={() => handleDelete(post)}>
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <p className="text-gray-700 mb-4">
                    {isExpanded || text.length <= 120 ? text : `${text.slice(0, 120)}...`}
                    {text.length > 120 && (
                        <button
                            onClick={toggleText}
                            className="text-blue-500 hover:underline ml-1">
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </p>
                {image && (
                    <figure className="relative mb-6">
                        <img
                            src={image}
                            alt="Post Image"
                            className="object-cover w-full h-60 rounded-lg shadow-md"
                        />
                    </figure>
                )}
                <div className="card-actions flex justify-between items-center">
                    <button className="btn btn-outline btn-primary flex items-center space-x-2">
                        <FontAwesomeIcon icon={faLike} /> <span>Like</span>
                    </button>
                    <button className="btn btn-outline btn-primary flex items-center space-x-2">
                        <FontAwesomeIcon icon={faComment} /> <span>Comment</span>
                    </button>
                    <button className="btn btn-outline btn-primary flex items-center space-x-2">
                        <FontAwesomeIcon icon={faShareAlt} /> <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfileCard;
