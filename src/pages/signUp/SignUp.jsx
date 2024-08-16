import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";
import axios from "axios";
const image_hosting_key = import.meta.env.VITE_IMAG_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.image[0]);

        axios.post(image_hosting_api, formData)
            .then(imgResponse => {
                const imageURL = imgResponse.data.data.display_url;
                return createUser(data.email, data.password)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);

                        return updateUserProfile(data.name, imageURL)
                            .then(() => {
                                console.log('User info updated');

                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    photoURL: imageURL
                                };
                                return axiosPublic.post('/users', userInfo);
                            });
                    });
            })
            .then(res => {
                if (res.data.insertedId) {
                    console.log('User added to the database');
                    reset();
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error occurred:', error);
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
                console.error('Response headers:', error.response?.headers);
            });
    }
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
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="input input-bordered w-full"
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered w-full"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                {/* <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                </div> */}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Profile Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        {...register("image", { required: true })}
                                        className="file-input file-input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                            </form>
                            <p>Already have an Account? <Link to='/login' className="text-red-500">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;