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
        <div className="card bg-base-100 w-[90%] mx-auto my-8 cursor-pointer shadow-xl overflow-hidden">
            <div className="card-body h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userImage} alt="User Avatar" className="object-cover w-full h-full rounded-full" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold ml-4 text-gray-800">{userName}</h3>
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
                <div className="flex items-center">
                    <button className="mr-4">
                        <FontAwesomeIcon icon={faLike} /> <span>Like</span>
                    </button>
                    <button className="mr-4">
                        <FontAwesomeIcon icon={faComment} /> <span>Comment</span>
                    </button>
                    <button className="mr-4">
                        <FontAwesomeIcon icon={faShareAlt} /> <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
