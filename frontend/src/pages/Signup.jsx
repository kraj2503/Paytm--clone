import { Bottomwarning } from "../Components/Bottomwarning";
import { Button } from "../Components/Button";
import Heading from "../Components/Heading";
import { InputBox } from "../Components/Inputbox";
import Subheading from "../Components/Subheading";
import { useState } from "react";
import axios from 'axios'
export default function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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

                    <div className="pt-4">
                        <Button onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                userName,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token)
                        }} label={"Sign up"} />

                    </div>
                    <div>
                        <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                    </div>

                </div>
            </div>

        </div>
    )
}