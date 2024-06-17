export function AppBar({username}){
    
    return (
        <div className="flex justify-between h-14 shadow">
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
            Paytm App
        </div>
<div className="flex">
    <div className="flex flex-col justify-center h-full mr-4 ">
Hello, {username}
    </div>
    <div className=" text-xl rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 items-center">
        {/* <div className="flex flex-col justify-center h-full text-xl"> */}

        U
        {/* </div> */}
    </div>
</div>
    </div>
    )
}