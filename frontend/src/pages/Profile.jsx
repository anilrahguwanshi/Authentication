import { useEffect, useState } from "react";
import api from "../apis/api";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/profile/profile")
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, []);


    if (!user) return <div className="text-center mt-20 text-gray-400">Loading...</div>;

    return (
        <div className="h-screen flex items-center justify-center bg-[#080808]">
            <div className="cardContainer w-[550px] text-center space-y-5">
                <div className="text-red-500 text-4xl font-extrabold">
                    Your Profile
                </div>

                <div className="text-lg text-gray-200 space-y-3">
                    <p><span className="text-red-400 font-semibold">Name:</span> {user.name}</p>
                    <p><span className="text-red-400 font-semibold">Email:</span> {user.email}</p>
                    <p><span className="text-red-400 font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>

                <button
                    className="primaryBtn text-white"
                    onClick={() => window.location.reload()}
                >
                    Refresh Profile
                </button>
            </div>
        </div>
    );
}
