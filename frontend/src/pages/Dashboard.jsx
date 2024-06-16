import { AppBar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import Heading from "../Components/Heading";
import { Users } from "../Components/Users";

export function Dashboard() {
    return (
        <div className="">

            <AppBar username={"User"} />
<div className="px-6 pt-5">

            <Balance value={2000} />

            <Users/>
</div>
        </div>
    )
}