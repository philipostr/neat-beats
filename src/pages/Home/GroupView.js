import './GroupView/GroupView.css'

import { useContext, useState, useEffect } from "react";
import GroupSelect from './GroupView/GroupSelect';
import Search from '../../components/Search';
import { UserContext, GroupContext, users, groups, songs } from '../../sharedData';

const GroupView = () => {
    const [user, setUser] = useContext(UserContext);
    const [group, setGroup] = useState(users[user]["groups"][0]);
    var allSongs = groups[group]["songs"];
    const [groupSongs, setGroupSongs] = useState(allSongs);

    const handleSearch = (search) => {
            if (search === "") {
                setGroupSongs(allSongs);
            } else {
                setGroupSongs(allSongs.filter((s) => songs[s].name.substring(0, search.length).toLowerCase() === search.toLowerCase()));
            }
    }

    useEffect(() => {
        handleSearch("");
        allSongs = groups[group]["songs"];
        setGroupSongs(allSongs);
    }, [group]);

    return (
        <div className="groupview">
            <GroupContext.Provider value={[group, setGroup]}>
                <GroupSelect />
                <hr />
                <Search placeholder="Group Song Search..." activeChange={handleSearch} style={{
                    width: "calc(100% - 19px)",
                    height: "30px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    fontSize: "20px",
                }} />
                <ul>
                    {groupSongs.map((s) => <li><p>{songs[s]["name"]}</p></li>)}
                </ul>
            </GroupContext.Provider>
        </div>
    );
}

export default GroupView;