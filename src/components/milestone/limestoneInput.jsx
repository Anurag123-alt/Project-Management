import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext.jsx";
import useMilestone from "./usemilestone.jsx"
function Lime() {
    const { id } = useParams();
    const { workspace } = useContext(userContext)
    const wsId = workspace.find(item => item.selected == true)
    const { addLimeStone, milestone } = useMilestone(id, wsId)

    const navigate = useNavigate()
    const [Text, setText] = useState("")
    return (
        <div>
            {(!milestone || !wsId || !id) && (milestone.length == 0) ? (<p>Loading...</p>) :
                milestone.map((item) => (
                    <h1 key={item.milestone_id}
                        onClick={() => {
                            navigate(`/milestonedetails/${item.milestone_id}/${item.project_id}`)
                        }}
                    >{item.title}</h1>
                ))}

            <input type="text" onChange={(e) => {
                setText(e.target.value)
            }} />
            <button
                onClick={() => {
                    addLimeStone(id, Text)
                }}
            >
                Create Limestone
            </button>

        </div>
    );
}

export default Lime;