import './GroupSelect.css'

import { useRef, useEffect, useState, useContext } from "react";
import { UserContext, GroupContext, users, groups } from "../../../sharedData";

import NewCreation from '../../../components/NewCreation'

const GroupSelect = () => {
    const [user, setUser] = useContext(UserContext);
    const [group, setGroup] = useContext(GroupContext);
    const [open, setOpen] = useState(false);

    const selector = useRef();
    const prompt = useRef();

    useEffect(() => {
        setOpen(false);
    }, [group]);

    useEffect(() => {
        if (open) {
            selector.current.style.display = "block";
        } else {
            selector.current.style.display = "none";
        }
    }, [open]);

    const handleCreation = (name, isPrivate) => {
        for (const g of users[user]["groups"]) {
            if (name === groups[g]["name"]) {
                return false;
            }
        }

        const newGroupID = Date.now();
        groups[newGroupID] = {name: name, members: [user], songs: [], isPrivate: isPrivate};
        users[user]["groups"].push(newGroupID);
        return true;
    }

    const openPrompt = () => {
        setOpen(false);
        prompt.current.style.display = "flex";
    }

    var groupKey = 0;
    return (
        <div className="groupselect">
            <NewCreation type="Group" onCreation={handleCreation} displayRef={prompt} />
            <a id="opener" onClick={() => setOpen(!open)} >{groups[group]["name"]} ▼</a>
            <div id="selector" ref={selector}>
                <p>Groups</p>
                <button onClick={openPrompt}>+</button>
                <hr />
                <ul>
                    {users[user]["groups"].map((g) => <li key={++groupKey} onClick={() => setGroup(g)}>{(g === group) ? <b>{groups[g]["name"]}</b> : groups[g]["name"]}</li>)}
                </ul>
            </div>
            <NewCreation />
        </div>
    );
}

export default GroupSelect;