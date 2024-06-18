import { Bottomwarning } from "../Components/Bottomwarning";
import { Button } from "../Components/Button";
import Heading from "../Components/Heading";
import { InputBox } from "../Components/Inputbox";
import Subheading from "../Components/Subheading";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [Pass, setPass] = useState(false);
    const navigate = useNavigate()
    const [verified, setVerifed] = useState(false)
    const [error, setError] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.status == "200") {

                    navigate("/dashboard");
                }
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        }
        fetchData();
    }, [verified]);

    return (
        <div className="bg-slate-300 h-screen flex justify-center">

            <div className=" flex flex-col justify-center">
                <div className="bg-white w-80 text-center h-max rounded-lg p-2 px-4">
                    <Heading label={"Sign Up"} />
                    <Subheading label={"Enter your information to create account"} />

                    <InputBox onChange={e => {
                        setFirstName(e.target.value)
                    }} placeholder="John" label={"First Name"} />

                    <InputBox onChange={e => {
                        setLastName(e.target.value)
                    }} placeholder="Doe" label={"Last Name"} />

                    <InputBox onChange={e => {
                        setUserName(e.target.value)
                    }} placeholder="Johndoe@mail.com" label={"Email"} />


                    <InputBox onChange={e => {
                        setPassword(e.target.value)
                    }} placeholder="**********" label={"Password"} />
                    {(password.length < 8) && Pass && <p className="text-gray-600 text-md mt-2">{"Minimum password length -> 8"}</p>}
                    <div className="pt-4">
                        <Button onClick={async () => {
                            setPass(true);
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    userName,
                                    firstName,
                                    lastName,
                                    password
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            } catch (error) {
                                setError(error.response ? error.response.data.message : error.message); // Set error message
                            }
                        }} label={"Sign up"} />
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}

                    <div>
                        <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                    </div>

                </div>
            </div>

        </div>
    )

}