import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import CSpinner from '../Components/CSpinner';
import { Button } from '../Components/Button';
import Logout from '../Components/Logout';
export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [transferResponse, setTransferResponse] = useState('');
    const [transferLoading, setTransferLoading] = useState(false);


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
                    // navigate("/dashboard");
                }
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                navigate("/signin")
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading == true) {
        return <>
            Loading . . .</>
    }

    return <div className='flex flex-col'>
        <div className='absolute top-6 left-6 border px-2 py-1 font-medium rounded bg-slate-50 hover:bg-slate-200'>
            <button onClick={() => {
                navigate('/dashboard')
            }}>&lt; Dashboard</button>
        </div>
        <div className="absolute top-6 right-6">
            <Logout /> {/* Adjust padding directly in Button component if necessary */}
        </div>
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-3 w-96 bg-white shadow-lg rounded-lg"
                >

                    <div className="flex flex-col space-y-1.5 px-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="px-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name[0].toUpperCase()}{name.slice(1)}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {

                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    min="0"

                                />
                            </div>
                            {(error && !transferResponse) && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {transferResponse && <p className="text-green-800 text-sm mt-2">{transferResponse}</p>}

                            <button onClick={async () => {
                                setTransferLoading(true);
                                setError("")
                                try {
                                    setTransferResponse("")
                                    const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                        to: id,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    })
                                    setTransferResponse(response.data.message)

                                }
                                catch (error) {
                                    setError(error.response ? error.response.data.message : error.message);
                                }
                                finally {
                                    setTransferLoading(false); // Hide loading indicator
                                }
                            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                {transferLoading ? <CSpinner /> : 'Initiate Transfer'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

