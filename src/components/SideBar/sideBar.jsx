import styles from "./sideBar.module.css"
import { useNavigate } from "react-router-dom"
import {
    NotebookPen, Sidebar, Home, SquareCheckBigIcon, Blocks, Calendar, BarChartIcon, Bell, Settings, Trash2, LogOut,
    User, BadgePlus, UserPlus, CircleUserRound, LogIn, Droplet, ArrowBigDown, ChevronRight, ChevronDown, Plus, Building2,
    Menu, Sun, Moon,
    Check
} from "lucide-react"
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { userContext } from "../../userContext.jsx"

export default function SideBar() {
    const navigate = useNavigate();
    const { theme, toggleTheme, updateTheme, users, workspace, selectedWorkSpace, loading, setworkSpaceOpen, sidebarOpen,
        SetsidebarOpen } = useContext(userContext)
    console.log(theme);
    console.log(workspace);
    const [dropDownOpen, SetdropDownOpen] = useState(false)


    const logoutUser = async () => {
        try {
            await signOut(auth)

            navigate("/")

        }
        catch (err) {
            console.log(err);

        }
    }


    const handleToggleUser = () => {
        // logoutUser()
        if (!users?.uid) return;

        const newTheme =
            users.theme === "light"
                ? "dark"
                : "light";

        updateTheme(users.uid, newTheme);
    };

    return (
        <>
            <aside className={styles.sideBar}>

                <div className={`${styles.asideContainer} ${sidebarOpen == true ? styles.sideBarOpen : styles.sideBarClose}
        ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"
                    }`}>
                    <div className={`${styles.asideDropdowncontainer} ${users.theme == "light" ? "light" : "dark"}`} onClick={() => {
                        SetdropDownOpen(dropDownOpen ? false : true)
                    }}
                    >
                        <div className={styles.asideTitleIcon}>

                            {workspace.length > 0 && workspace.find(item => item.selected === true) ? (<img
                                src={workspace.find(item => item.selected === true)?.imageUrl}


                            />) :
                                <img src="\src\image\images3.jpg" />


                            }

                        </div>
                        <div className={styles.asideTitleContainer}>


                            <div className={styles.asideTitle}>

                                {workspace.find(item => item.selected === true)?.workspacename}

                            </div>
                            <div className={styles.wsNum}>
                                {workspace.length == 0 ? "No " : workspace.length} workspace
                            </div>
                        </div>

                        <div className={styles.DropDownBtn}>
                            <ChevronDown />
                        </div>





                        {dropDownOpen && <div className={`${styles.dropDown} ${users.theme == "light" ? "light" : "dark"} ${users.theme == "light" ? "light_shadow" : "dark_shadow"}`}>
                            {workspace.map((space) => (
                                <div key={space.workspace_id} className={`${styles.optionContainer} ${space.selected == true
                                    ? styles.dropDownaccent : ""}`}>
                                    {space.selected == true && <div className={styles.hrLine}></div>}
                                    <div className={styles.wsOptionImage} style={{
                                        borderWidth: "2px", borderStyle: "solid",
                                        borderColor: `${users.theme == "light" ? "var(--shadow_light)" : "var(--shadow_dark)"}`
                                    }}>
                                        <img src={space?.imageUrl} alt="Uploaded" />
                                    </div>

                                    <div className={styles.wsOption} key={space.workspace_id} onClick={() => {

                                        selectedWorkSpace(space.workspace_id)
                                    }}
                                    >
                                        {space.workspacename}
                                    </div>
                                    {space.selected == true && <Check size={20} color="#7c3dfb" />}
                                </div>


                            ))}

                            <div onClick={() => {
                                setworkSpaceOpen(true)
                            }}
                                className={styles.wsButton}>
                                <Plus /> AddWorkspace
                            </div>
                        </div>}
                    </div>




                    <div className={styles.asideListContainer}>
                        <div className={styles.asideList} onClick={() => {
                            navigate("/")
                        }}
                        >
                            <div className={styles.asideListIcon}>
                                <User className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Register</div>

                        </div>

                        <div className={styles.asideList} onClick={() => {
                            navigate("/signin")
                        }}
                        >
                            <div className={styles.asideListIcon}>
                                <LogIn className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Login</div>

                        </div>
                        <div className={styles.asideList} onClick={() => {
                            navigate("/dashboard")
                        }}
                        >
                            <div className={styles.asideListIcon}>
                                <Home className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Home</div>

                        </div>
                        <div className={styles.asideList} onClick={() => {
                            navigate("/todo")
                        }}
                        >
                            <div className={styles.asideListIcon}>
                                <SquareCheckBigIcon className={styles.icon} size={21} />

                            </div>
                            <div className={styles.asideListTitle}>My Tasks</div>

                        </div>

                        <div className={styles.asideList}>
                            <div className={styles.asideListIcon}>
                                <Calendar className={styles.icon} size={21} />

                            </div>
                            <div className={styles.asideListTitle}>Calender</div>

                        </div>
                        <div className={styles.asideList}>
                            <div className={styles.asideListIcon}>
                                <BarChartIcon className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Statistics</div>

                        </div>
                        <div className={styles.asideList}>
                            <div className={styles.asideListIcon}>
                                <Bell className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Notification</div>

                        </div>
                        <div className={styles.asideList} onClick={() => {
                            navigate("/workspacesetting")
                        }}
                        >
                            <div className={styles.asideListIcon}>
                                <Settings className={styles.icon} size={21} />
                            </div>
                            <div className={styles.asideListTitle}>Settings</div>

                        </div>
                        <div className={styles.asideTheme} // onClick={()=> {
                            // logoutUser()
                            // }}
                            onClick={() => {
                                handleToggleUser()
                                toggleTheme()
                            }}
                        >
                            <div className={styles.asideListThemeIcon}>
                                {users.theme == "light" ?
                                    <Sun className={styles.icon} size={21} /> :
                                    <Moon className={styles.icon} size={21} />}
                            </div>
                            <div className={styles.asideListThemeTitle}>{users.theme}</div>
                        </div>
                    </div>


                </div>
                <div className={`${styles.absoluteClose} ${sidebarOpen == false && styles.sideBarCLoseDiv}`}
                    onClick={() => {
                        SetsidebarOpen(false)
                        SetdropDownOpen(false)
                    }}
                ></div>

            </aside>

            <aside className={`${styles.tabasideContainer} ${users.theme === "light" ? "light_card" : "dark_card"}
        ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                <div className={`${styles.tabasideBar} ${users.theme == "light" ? "light" : "dark"}`} onClick={() => {

                    SetsidebarOpen(true)
                }}
                >

                    <Menu />
                </div>




                <div className={styles.tabasideListContainer}>
                    <div className={`${styles.tabasideList}`} onClick={() => {
                        navigate("/")
                    }}
                    >
                        <User className={styles.icon} size={21} />

                    </div>
                    <div className={`${styles.tabasideList}`} onClick={() => {
                        navigate("/signin")
                    }}
                    >
                        <LogIn className={styles.icon} size={21} />

                    </div>
                    <div className={`${styles.tabasideList}`} onClick={() => {
                        navigate("/dashboard")
                    }}
                    >
                        <Home className={styles.icon} size={21} />

                    </div>
                    <div className={`${styles.tabasideList}`} onClick={() => {
                        navigate("/todo")
                    }}
                    >
                        <SquareCheckBigIcon className={styles.icon} size={21} />


                    </div>

                    <div className={`${styles.tabasideList}`}>
                        <Calendar className={styles.icon} size={21} />


                    </div>
                    <div className={`${styles.tabasideList}`}>
                        <BarChartIcon className={styles.icon} size={21} />

                    </div>
                    <div className={`${styles.tabasideList}`}>
                        <Bell className={styles.icon} size={21} />

                    </div>
                    <div className={`${styles.tabasideList}`} onClick={() => {
                        navigate("/workspacesetting")
                    }}
                    >
                        <Settings className={styles.icon} size={21} />
                    </div>


                    <div className={styles.tabasideTheme} // onClick={()=> {
                        // logoutUser()
                        // }}
                        onClick={() => {
                            handleToggleUser()
                            toggleTheme()
                        }}
                    >
                        {users.theme == "light" ?
                            <Sun className={styles.icon} size={21} /> :
                            <Moon className={styles.icon} size={21} />}

                    </div>
                </div>



            </aside>


        </>
    )
}