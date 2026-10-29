function Garbage(params) {
    return (
        <>
            {/* {<div className={styles.taskIcon}
                style={{
                    background: `${categoryColor?.color}38`
                }}>
                {Icon && <Icon color={categoryColor?.color} />}
            </div>} */}




            {/* {<div className={styles.category}>
                <div className={styles.categorySign}
                    style={{
                        background: categoryColor?.color
                    }}
                >
                </div>
                <div className={styles.categoryTitle}>{item.category || categoryColor?.name}</div>
                <div className={styles.seperate}></div>
                <div className={styles.date}>
                    <div className={styles.dateChild}>
                        {new Date(`${item.date}T${item.time}`).getDate()}
                    </div>

                    <div className={styles.dateChild}>
                        {months[`${new Date(`${item.date}T${item.time}`).getMonth()}`]}
                    </div>

                    <div className={styles.dateChild}>


                        {12 < new Date(`${item.date}T${item.time}`).getHours() ? new Date(`${item.date}T${item.time}`).getHours() - 12 : new Date(`${item.date}T${item.time}`).getHours()}:{new Date(`${item.date}T${item.time}`).getMinutes()}
                        {12 < new Date(`${item.date}T${item.time}`).getHours() - 12 ? "Am" : "PM"}
                    </div>

                </div>

            </div>} */}

            {/*<div className={styles.priority}
                style={{
                    background: `${priorityColor?.color}35`,
                    color: priorityColor?.color
                }}
            >{priorityColor?.name}</div>*/}


        </>
    )
}

export default Garbage
allow update: if request.auth != null
    && resource.data.uid == request.auth.uid
    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(["members"]);
import { useState } from "react";
import { supabase } from "../supabase";

function File() {
    const [imageUrl, setImageUrl] = useState("");

    const handleUpload = async (file) => {
        if (!file) return;
        const filePath = `profile${file.name}`
        const { data, error } = await supabase.storage.from("ProfileImage").upload(filePath, file)
        console.log(data, error);
        const result = supabase.storage.from("ProfileImage").getPublicUrl(filePath, file)
        console.log(result);

        console.log(result.data.publicUrl);

        setImageUrl(result.data.publicUrl)

    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
            />
            const result = supabase.storage.from("ProfileImage").getPublicUrl(filePath, file)
            console.log(result);

            console.log(result.data.publicUrl);

            setImageUrl(result.data.publicUrl)
            {imageUrl && (
                <img
                    style={{
                        width: "200px",
                        height: "200px",
                        background: "red"
                    }}
                    src={imageUrl}
                    alt="Uploaded"

                />
            )}
        </>
    );
}

export default File;


const addUnderTodo = async (
    id,
    task,
    description,
    date,
    time,
    category,
    priority
) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in");
    }

    await addDoc(
        collection(db, "todos", id, "subTodo"),
        {
            task,
            description,
            date,
            time,
            category,
            priority,
            uid: user.uid
        }
    );
    console.log(id);
    //    cont s= {
    //   title: "Website Redesign",
    //   description: "Redesign the client website",
    //   workspace_id: "workspace123",
    //   uid: "user123",
    //   status: "active",
    //   priority: "high",
    //   color: "#6366f1",
    //   imageUrl: "",
    //   createdAt: serverTimestamp(),
    //   updatedAt: serverTimestamp(),
    //   dueDate: null,
    //   isArchived: false,
    //   client: "Rohan"
    //   budget: 25000


    // }
};




