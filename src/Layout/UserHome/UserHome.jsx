import useAuth from "../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth(); 

    return (
        <section>
            <h2 className="text-3xl">Hi, Welcome {user?.displayName ? user.displayName : "Back" }</h2>
            
        </section>
    );
};

export default UserHome;