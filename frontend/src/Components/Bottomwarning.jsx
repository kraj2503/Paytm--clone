import { Link } from "react-router-dom"

export function Bottomwarning({ label, buttonText ,to }) {
    return (
        <div className="flex justify-center text-sm py-2 ">
            {label}
            <Link className="pl-1 underline cursor-pointer" to={to}>
                {buttonText} 
            </Link>
        </div>
    )
}