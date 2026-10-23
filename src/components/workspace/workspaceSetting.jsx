import style from "./workspaceSetting.module.css"
import SideBar from "../SideBar/sideBar";
import { userContext } from "../../userContext";
import { useContext } from "react";
import { Bell, Search, Settings, Plus, ChevronRight } from "lucide-react";
function workspaceSetting() {

    const { users, workspace, selectedSettingWorkSpace } = useContext(userContext)


    return (
        <>
            <div className={style.container}>
                <div className={style.sidebar}>
                    <SideBar />

                </div>
                <div className={`${style.dashboardContainer} ${users.theme == "light" ? "light" : "dark"} `}
                   >

                    <div className={`${style.dashboardHeader} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light"
                        ? "light_shadow"
                        : "dark_shadow"}`}
                    >
                        <div className={style.dashboardTitle}>
                            Settings</div>
                        <div className={style.dashboardAccountCon}>
                            <div className={`${style.dashboardSearchContainer} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>

                                <div className={`${style.dashboardSearchBox} `} >
                                    <Search size={18.5} />

                                </div>
                                <input type="text" placeholder="Search Tasks..." className={`${style.dashboardSearch} ${users.theme === "light" ? "light_card" : "dark_card"} `} />
                            </div>


                            <div className={`${style.dashboardNotificationBox} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`} >

                                <Bell size={18.5} />
                            </div>
                            <div className={`${style.dashboardAccountBox} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                                <img className={style.dashboardImg} src={users.userimageUrl} srcset="" />

                            </div>
                        </div>

                    </div>
                    <div className={`${style.dashboard} `}>
                        <div className={style.settingTitleContainer}>
                            <Settings size={35} />
                            <div className={style.settingbox}>
                                <div className={style.settingTitle}>
                                    Workspace Settings
                                </div>
                                <div className={style.settingdescription}>
                                    Manage your workspace, member, permission, and more.
                                </div>

                            </div>


                        </div>
                        <div className={style.settingPage}>
                            <div className={`${style.workspaceListContainer} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                                <div className={style.workspacelistTitleContainer}>
                                    <div className={style.workspacelistTitle}>

                                        Your Workspace
                                    </div>

                                    <div className={style.workspacelistbtn}>
                                        <Plus size={25} /> Create Workspace
                                    </div>
                                </div>
                                <div className={style.searchBox}>
                                    <div className={style.searchIcon}>
                                        <Search />

                                    </div>
                                    <input type="text" className={`${style.search} ${users.theme === "light" ? "light_card" : "dark_card"} `}
                                        placeholder="search Workspace..."
                                    />
                                </div>

                                <div className={style.workspaceListBox}>
                                    {workspace.map((item) => (
                                        <div key={item.workspace_id} className={`${style.workspaceList} ${item.sellectedSettingws == true ? style.selectedWorkspace : ""}`}
                                            onClick={() => {
                                                console.log("anurag")

                                                selectedSettingWorkSpace(item.workspace_id)
                                            }}
                                        >
                                            <div className={style.workspaceLogo}>
                                                <img src={item.imageUrl} alt="ANurag" className={style.wsImage} />
                                            </div>
                                            <div className={style.workspaceTitleParent}>
                                                <div className={style.workspaceTitle}>
                                                    {item.workspacename}

                                                </div>
                                                <div className={style.workspacememberCount}>
                                                    2 Member
                                                </div>
                                            </div>
                                            <ChevronRight className={style.openIcon} />
                                        </div>


                                    ))}
                                </div>

                            </div>
                            <div className={`${style.workspaceDetailsContainer} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                                <div className={style.DetailsTitleContainer}>
                                    <div className={style.DetailsTitleImage}>
                                        {/* <img src={}/> */}
                                    </div>

                                    <div className={style.DetailsTitleBox}>
                                        <div className={style.DetailsTitle}>

                                        </div>
                                        <div className={style.DetailsDescription}>
                                            Main workspace for all your projects and team collaboration
                                        </div>

                                    </div>
                                    {/* <div className={style.DetailsTitleBox}>
                                        <div className={style.DetailsTitle}>

                                        </div>
                                        <div className={style.DetailsDescription}>
                                            Main workspace for all your projects and team collaboration
                                        </div>

                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )



}

export default workspaceSetting;