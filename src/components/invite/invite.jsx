import { useContext } from "react";
import { userContext } from "../../userContext";

function Invitaion() {
    const { allUsers } = useContext(userContext)
    console.log(allUsers);

    return (
        <>
            <select>
                {allUsers.map((item) => (
                    <option value={item.firstname}>{item.firstname}</option>
                ))}
            </select>
        </>
    )
}

export default Invitaion;