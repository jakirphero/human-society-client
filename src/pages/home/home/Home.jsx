
import AddPost from "../addPost/AddPost";
import History from "../History/History";
import Post from "../post/Post";

const Home = () => {
    return (
        <div className="flex mx-auto max-w-screen-xl">
            <div className="hidden md:block md:w-[20%] p-4 fixed h-full top-20 left-0">
                <h2>Left Sidebar</h2>
                <p>Content for the Left sidebar</p>
            </div>
            <div className="bg-slate-200 w-full md:w-[60%] p-4  md:ml-[20%] md:mr-[20%]">
                <History />
                <AddPost />
                <Post />
            </div>
            <div className="hidden md:block md:w-[20%] p-4 fixed h-full top-20 right-0">
                <h2>Right Sidebar</h2>
                <p>Content for the right sidebar</p>
            </div>
        </div>
    );
};

export default Home;