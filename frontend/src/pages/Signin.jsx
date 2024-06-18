import { useState, useEffect } from "react";
import { Bottomwarning } from "../Components/Bottomwarning";
import { Button } from "../Components/Button";
import Heading from "../Components/Heading";
import { InputBox } from "../Components/Inputbox";
import Subheading from "../Components/Subheading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.status == "200") {
                    setLoading(false);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                setLoading(false);

            }
        }

        fetchData();


    }, []);

    if (loading == true) {
        return <>
            Loading . . .</>
    }


    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center  ">

                <div className="bg-white rounded-lg h-max text-center p-2 px-4 w-80">

                    <Heading label={"Sign In"} />
                    <Subheading label={"Enter your credentials to access your account"} />
                    <InputBox placeholder={"Johndoe@mail.com"} label={"Email"} onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                    <InputBox placeholder={"**********"} label={"Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <div className=" pt-4">

                        <Button label={"Sign In"} onClick={async () => {

                            try {

                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    userName,
                                    password
                                })
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard")
                            }
                            catch (error) {
                                setError(error.response ? error.response.data.message : error.message); // Set error message
                            }
                        }} />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}

                        <Bottomwarning label={"Dont have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                    </div>

                </div>
            </div>

        </div>


    )

}