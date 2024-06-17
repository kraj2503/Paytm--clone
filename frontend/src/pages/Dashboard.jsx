import { useNavigate } from "react-router-dom";
import { AppBar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import Heading from "../Components/Heading";
import { Users } from "../Components/Users";
import { useEffect, useState } from "react";
import axios from 'axios';

export function Dashboard() {
const [loading,setLoading] = useState(true)
const [balance,setBalance] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                    
                if (response.status == "200") {
           setLoading(false);
           const formattedBalance = parseFloat(response.data.balance).toFixed(2);
           setBalance(formattedBalance)
                
                }
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                navigate("/signin")
            }
        }
        
        fetchData();
        
       
    }, []);

    if(loading==true){
        return<>
        Loading . . .</>
    }


    return (
        <div className="">

            <AppBar username={"User"} />
            <div className="px-6 pt-5">

                <Balance value={balance} />

                <Users />
            </div>
        </div>
    )
}