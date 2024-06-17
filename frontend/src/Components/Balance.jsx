import {useNavigate } from "react-router-dom";

export function Balance({ value }) {
   const navigate = useNavigate();
    function logout(){
    localStorage.removeItem('token');
    navigate('/signin')
   }
   
    return (
        <div className="flex justify-between">
            <div className="flex font-bold text-lg">
                Your Balance
                <div className="font-semibold ml-4 text-lg">
                    Rs. {value}
                </div>
            </div>
                <button onClick={logout} className="border px-2 py-1 font-medium rounded bg-slate-50 hover:bg-slate-200">Log out</button>

        </div>
    )
}