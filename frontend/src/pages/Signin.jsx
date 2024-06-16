import { Bottomwarning } from "../Components/Bottomwarning";
import { Button } from "../Components/Button";
import Heading from "../Components/Heading";
import { InputBox } from "../Components/Inputbox";
import Subheading from "../Components/Subheading";

export default function Signin(){
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center  ">

            <div className="bg-white rounded-lg h-max text-center p-2 px-4 w-80">

            <Heading label={"Sign In"}/>
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox placeholder={"Johndoe@mail.com"} label = {"Email"} />
            <InputBox placeholder={"**********"} label = {"Password"} />
            <div className=" pt-4">

            <Button label={"Sign In"}/>
            <Bottomwarning label={"Dont have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            </div>
                    
            </div>
            </div>

        </div>
        

    )
}