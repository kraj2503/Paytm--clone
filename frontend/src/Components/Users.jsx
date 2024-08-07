/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    const [debouncedFilter, setDebouncedFilter] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 300);

        // Cleanup function to clear the timeout if filter changes
        return () => {
            clearTimeout(handler);
        };
    }, [filter]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=` + debouncedFilter, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setUsers(response.data.user);
            });
    }, [debouncedFilter]);
    return <>
        <div className="font-bold mt-6 text-lg">
            Users

        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();
    // console.log(user)
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName[0].toUpperCase()}{user.firstName.slice(1)} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}