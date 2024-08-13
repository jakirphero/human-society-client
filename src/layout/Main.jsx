import { Outlet, useLocation } from "react-router-dom";
import Header from "../shard/Header/Header";

const Main = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('signUp')
    return (
        <div>
            {noHeader || < Header />}
            <Outlet />
        </div>
    );
};

export default Main;