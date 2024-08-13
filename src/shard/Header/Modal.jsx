const Modal = ({ user, logOut }) => {

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <div
            className="fixed top-0 right-0 mt-16 w-[300px] h-auto bg-gray-100 shadow-lg p-5 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description">

            <div className="flex flex-col items-center text-center mb-4">
                <div className="avatar ">
                    <div className="w-14 rounded-full">
                        <img src={user?.photoURL} alt="User Avatar" className="w-10 h-auto" />
                    </div>
                </div>
                <h2 id="modal-title" className="text-xl font-bold">{user?.displayName || 'User'}</h2>
                <p id="modal-description w-full">{user?.email}</p>
                <div className="divider w-full"></div>
                {user && (
                    <button
                        onClick={handleLogOut}
                        className="btn btn-ghost">
                        LogOut
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;
