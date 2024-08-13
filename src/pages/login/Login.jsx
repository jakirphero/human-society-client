
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
        .then(result=> {
            const user = result.user;
            console.log(user);
            navigate('/')
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
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered w-full"
                                        {...register("email")}
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
                                        {...register("password")}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </form>
                            <p>New to Account? <Link to='/signUp' className="text-red-500">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;