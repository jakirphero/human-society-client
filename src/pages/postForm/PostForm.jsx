import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
const image_hosting_key = import.meta.env.VITE_IMAG_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const PostForm = () => {
    const {user} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const postItem = {
                text: data.text,
                image: res.data.data.display_url,
                userEmail: user?.email,
                userImage: user?.photoURL,
                userName: user?.displayName
            }
            const postRes = await axiosSecure.post('/post', postItem)
            if (postRes.data.insertedId) {
                reset();
                navigate('/')
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Submit Your Details</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Your Message</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Enter your message here..."
                                        {...register("text")}
                                    ></textarea>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Upload a File</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        {...register("image")}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;