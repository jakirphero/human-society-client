import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faThumbsUp as faLike, faComment as faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const Post = () => {
    const [isExpended, setIsExpended] = useState(false);
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quidem.";
    const toggleExpend = () => {
        setIsExpended(!isExpended)
    }

    return (
        <div className="w-[90%] mx-auto my-8">
            <Link to="/" className="block">
                <div className="card bg-base-100 w-full shadow-xl overflow-hidden">
                    <div className="card-body h-full flex flex-col justify-between">
                        <div className="card-title flex items-center mb-1">
                            <img
                                src="https://www.w3schools.com/html/pic_trulli.jpg"
                                alt="Image"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span className="text-blue-500 hover:underline">My Name</span>
                        </div>
                        <div>
                            <p className="inline">
                                {isExpended ? text : `${text.substring(0, 100)}`}
                                {!isExpended && text.length > 100 && (
                                    <>
                                        ...{" "}
                                        <button
                                            onClick={toggleExpend}
                                            className="text-blue-500 hover:underline ml-1"
                                        >
                                            Show More
                                        </button>
                                    </>
                                )}
                                {isExpended && (
                                    <button
                                        onClick={toggleExpend}
                                        className="text-blue-500 hover:underline ml-1"
                                    >
                                        Show Less
                                    </button>
                                )}
                            </p>
                        </div>
                        <div className="relative flex items-center justify-center w-full h-[300px]">
                            <img
                                src="https://www.w3schools.com/html/pic_trulli.jpg"
                                alt=""
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center">
                            <p><FontAwesomeIcon className="mr-1" icon={faLike} />Like</p>
                            <p><FontAwesomeIcon className="mr-1" icon={faComment} />Comment</p>
                            <p><FontAwesomeIcon className="mr-1" icon={faShareAlt} />Share</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Post;
