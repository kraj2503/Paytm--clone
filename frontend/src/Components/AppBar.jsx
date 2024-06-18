export function AppBar({ username }) {

    return (
        <div className="flex justify-between h-14 shadow">
            <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
                Paytm App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 ">
                    Hello, {username[0].toUpperCase()}{username.slice(1)}
                </div>
                <div className=" text-xl rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 items-center">
                    {/* <div className="flex flex-col justify-center h-full text-xl"> */}

                    {username[0].toUpperCase
                        ()}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}