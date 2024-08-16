import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faThumbsUp as faLike, faComment as faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ post }) => {
    const { userImage, userName, text, image } = post;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="card w-full md:w-2/3 bg-white shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="card-body p-6">
                <div className="flex items-center mb-6">
                    <div className="avatar">
                        <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={userImage} alt="User Avatar" className="object-cover w-full h-full rounded-full" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold ml-4 text-gray-800">{userName}</h3>
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

export default ProfileCard;
