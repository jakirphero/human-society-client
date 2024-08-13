import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";

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
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('User info Update')
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    navigate('/')
                                }
                            })
                    })
            })
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
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
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