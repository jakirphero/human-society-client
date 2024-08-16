import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import ProfileCard from "./ProfileCard";

const UserProfile = () => {
    const { email } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (email) {
                const res = await axiosSecure.get(`/post/${email}`);
                setUserPosts(res.data);

                if (res.data.length > 0) {
                    const { userName, userImage } = res.data[0];
                    setUserInfo({ name: userName, image: userImage });
                }
            }
        };
        fetchUserPosts();
    }, [email, axiosSecure]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="relative border-b-4  w-full text-center py-12">
                <div className="bg-white p-6 mt-16 rounded-full shadow-2xl inline-block relative z-10 mx-auto">
                    <div className="avatar">
                        <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={userInfo.image || "https://via.placeholder.com/150"}
                                alt="User Profile"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-extrabold mt-6 capitalize">{userInfo.name || 'User Name'}</h2>
            </div>
            <div className="w-full max-w-5xl flex flex-col items-center space-y-8 mt-8 px-4">
                {userPosts.map(post => (
                    <ProfileCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
