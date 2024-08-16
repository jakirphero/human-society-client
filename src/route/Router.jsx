import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home/Home";
import PostForm from "../pages/postForm/PostForm";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/userProfile.jsx/UserProfile";
import MyProfile from "../pages/myProfile/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<PrivateRoute><Main></Main></PrivateRoute>),
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "postForm",
                element: <PostForm></PostForm>
            },
            {
                path: "userProfile/:email",
                element: <UserProfile />
            },
            {
                path: "myProfile",
                element: <MyProfile />
            }
        ]
    },
    {
        path: "login",
        element: <Login></Login>
    },
    {
        path: "signUp",
        element: <SignUp></SignUp>
    },
]);

export default router;