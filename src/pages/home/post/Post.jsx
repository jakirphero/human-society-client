import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faLike, faComment as faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import usePost from "../../../hook/usePost";
import { Link } from "react-router-dom";

const Post = () => {
    const [isExpended, setIsExpended] = useState(false);
    const [posts] = usePost();
    console.log(posts);
    const toggleText = (postId) => {
        setIsExpended((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };
    return (
        <>
            {
                posts.map(post => (
                    <div key={post._id} className="card bg-base-100 w-[90%] mx-auto my-8 cursor-pointer shadow-xl overflow-hidden">
                        <div className="card-body h-full flex flex-col justify-between">
                            <div className="card-title flex items-center mb-1">
                                <img
                                    src={post.userImage}
                                    alt="Image"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                                <Link to={`/userProfile/${post.userEmail}`}>
                                    <span className="text-blue-500 hover:underline capitalize">{post.userName}</span>
                                </Link>
                            </div>
                            <div>
                                <p>
                                    {isExpended[post._id] || post.text.length <= 100 ? post.text : `${post.text.slice(0, 100)}...`}
                                    {post.text.length > 100 && (
                                        <button
                                            onClick={() => toggleText(post._id)}
                                            className="text-blue-500 hover:underline ml-1">
                                            {isExpended[post._id] ? 'Show Less' : 'Show More'}
                                        </button>
                                    )}
                                </p>
                            </div>
                            <div className="relative flex items-center justify-center w-full h-[300px] mt-5">
                                <img
                                    src={post.image}
                                    alt=""
                                    className="object-cover w-auto h-[300px] rounded-xl"
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
                ))
            }
        </>
    );
};

export default Post;
