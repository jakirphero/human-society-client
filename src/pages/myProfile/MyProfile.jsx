import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import MyProfileCard from "./MyProfileCard";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const [userPosts, setUserPosts]= useState([]);
    // useEffect(() => {
    //     if (user?.email) {
    //         axiosSecure.get(`/post/${user.email}`)
    //             .then(res => {
    //                 setUserPosts(res.data)
    //                 console.log(res.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching user posts:', error);
    //             });
    //     }
    // }, [user, axiosSecure]);
    const { data: userPosts = [], refetch } = useQuery({
        queryKey: ['userPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/post/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    })
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="relative border-b-4  w-full text-center py-12">
                <div className="bg-white p-6 mt-16 rounded-full shadow-2xl inline-block relative z-10 mx-auto">
                    <div className="avatar">
                        <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={user?.photoURL}
                                alt="User Profile"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-extrabold mt-6 capitalize">{user.displayName || 'User Name'}</h2>
            </div>
            <div className="w-full max-w-5xl flex flex-col items-center space-y-8 mt-8 px-4">
                {userPosts.map(post => (
                    <MyProfileCard key={post._id} post={post} refetch={refetch}/>
                ))}
            </div>
        </div>
    );
};

export default MyProfile;