import { userContext } from "../../userContext.jsx";
import { useContext, useState } from "react";
import { supabase } from "../../supabase.js";
function WorkSpaceInputUi({ form }) {
    const { workspace, addWorkSpace, workspaceimageUrl, setworkspaceImageUrl, setworkSpaceOpen, loading, users } = useContext(userContext)
    const { setworkspacename,
        workspacename,
    } = form;

    console.log(workspace);

    const handleUpload = async (file) => {
        if (!file) return;

        const filePath = `profile${file.name}`
        const { data, error } = await supabase.storage.from("workspace").upload(filePath, file)
        console.log(data, error);
        const result = supabase.storage.from("workspace").getPublicUrl(filePath, file)
        console.log(result);

        console.log(result.data.publicUrl);

        setworkspaceImageUrl(result.data.publicUrl)

    };

    const userType = ["client", "Manager"]

    const handleType = (e) => {
        setType(e.target.value)
    }
    return (
        <>


            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
            />

            {workspaceimageUrl && (
                <img
                    style={{
                        width: "200px",
                        height: "200px",
                        background: "red"
                    }}
                    src={workspaceimageUrl}
                    alt="Uploaded"

                />
            )}


            <input
                type="text"
                onChange={(e) => {
                    setworkspacename(e.target.value)
                }}
                placeholder="Organisation name"
            />
            <br />


            <input
                type="text"
                onChange={(e) => {
                }}
                placeholder="User Email"
            />
            <br />
            <select
                onChange={handleType}
            >
                {userType.map((item) => (
                    <option
                        onChange={() => {
                            setType(item)

                        }}
                    >{item}</option>
                ))}
            </select>
            <br />

            {loading
                ?
                (

                    <div>Creating...</div>
                ) :

                (<button
                    onClick={() => {
                        addWorkSpace(workspaceimageUrl, workspacename, users.type)
                        if (!loading) {
                            setworkSpaceOpen(false)

                        }

                    }}
                >add workspace</button>)

            }
        </>
    )
}

export default WorkSpaceInputUi;