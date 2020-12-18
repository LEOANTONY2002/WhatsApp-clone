import './SideBar.css';
import SideChat from './SideChat';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useState, useEffect } from 'react';
import db from './firebase';
import {useStateValue} from './StateProvider';

function SideBar() {
  const [rooms, setRooms] = useState([]);
  const[{ user },dispatch] = useStateValue();

  useEffect(() => {
    const unSub = db.collection("rooms").onSnapshot(snap => (
      setRooms(snap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ));
    return () => {
      unSub();
    }
  }, []);

    return (
        <div className="sideBar">
            <div className="header">
              <Avatar src={user?.photoURL}/>
              <div className="header-right">
              <IconButton>
                  <DonutLargeIcon style={{color : "#767D81"}}/>
              </IconButton>
                <IconButton>
                    <ChatIcon style={{color : "#767D81"}}/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon style={{color : "#767D81"}}/>
                </IconButton>
              </div>
            </div>
            <div className="search">
              <div className="searchCon">
                  <SearchOutlinedIcon />
                  <input style={{background : "transparent"}} placeholder="Search or start new chat" type="text"/>
              </div>
            </div>
            <div className="chats">
              <SideChat newChat/>
              {
                rooms.map(room => (
                  <SideChat key={room.id} id={room.id} name={room.data.name} />
                ))
              }
              
            </div>
        </div>
    )
}

export default SideBar
