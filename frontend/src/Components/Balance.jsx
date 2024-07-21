import Logout from "./Logout";

// eslint-disable-next-line react/prop-types
export function Balance({ value }) {

    return (
        <div className="flex justify-between">
            <div className="flex font-bold text-lg">
                Your Balance
                <div className="font-semibold ml-4 text-lg">
                    Rs. {value}
                </div>
            </div>
            <Logout />
        </div>
    )

}