import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faLike, faComment as faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import usePost from "../../../hook/usePost";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const Post = () => {
    const [isExpended, setIsExpended] = useState({});
    const [posts, setPosts] = usePost();
    const [isCommentOpen, setIsCommentOpen] = useState({});
    const [commentText, setCommentText] = useState({});
    const axiosPublic = useAxiosPublic();

    const toggleText = (postId) => {
        setIsExpended((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const toggleCommentSection = (postId) => {
        setIsCommentOpen((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleLike = async (postId) => {
        try {
            const res = await axiosPublic.put(`/post/${postId}/like`);
            if (res.data.modifiedCount > 0) {
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
                ));
            }
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    const handleCommentChange = (postId, value) => {
        setCommentText(prev => ({
            ...prev,
            [postId]: value
        }));
    };

    const handleCommentSubmit = async (postId) => {
        if (!commentText[postId]) return;
        try {
            const commentData = { text: commentText[postId] };
            const res = await axiosPublic.post(`/post/${postId}/comment`, commentData);

            if (res.data.message === 'Comment added successfully') {
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, comments: [...post.comments, commentData] } : post
                ));
                setCommentText(prev => ({ ...prev, [postId]: '' }));
            }
        } catch (error) {
            console.error("Error submitting the comment:", error);
        }
    };

    return (
        <>
            {posts.map(post => (
                <div key={post._id} className="card bg-base-100 w-[90%] mx-auto my-8 cursor-pointer shadow-xl overflow-hidden">
                    <div className="card-body h-full flex flex-col justify-between">
                        {/* Post content */}
                        <div className="card-title flex items-center mb-1">
                            <img
                                src={post.userImage}
                                alt="User"
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
                        {post.image && (
                            <div className="relative flex items-center justify-center w-full h-[300px] mt-5">
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="object-cover w-auto h-[300px] rounded-xl"
                                />
                            </div>
                        )}
                        <div className="divider"></div>
                        <div className="flex items-center">
                            <button onClick={() => handleLike(post._id)} className="mr-4">
                                <FontAwesomeIcon className="mr-1 hover:text-blue-500" icon={faLike} />
                                <span className="text-red-500">{post.likes || 0}</span> Like
                            </button>
                            <button onClick={() => toggleCommentSection(post._id)} className="mr-4">
                                <FontAwesomeIcon className="mr-1 hover:text-blue-500" icon={faComment} />Comment
                            </button>
                            <button>
                                <FontAwesomeIcon className="mr-1 hover:text-blue-500" icon={faShareAlt} />Share
                            </button>
                        </div>
                        {/* Comment section */}
                        {isCommentOpen[post._id] && (
                            <div className="mt-4">
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Write a comment..."
                                    value={commentText[post._id] || ''}
                                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                ></textarea>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() => handleCommentSubmit(post._id)}
                                >
                                    Submit
                                </button>
                                <div className="mt-4">
                                    {post.comments && post.comments.map((comment, index) => (
                                        <div key={index} className="border-b border-gray-300 py-2">
                                            <p className="capitalize">{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Post;
