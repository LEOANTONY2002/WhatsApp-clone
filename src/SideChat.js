import './SideChat.css';
import React, { useState,useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import faker from 'faker';
import db from './firebase';
import{ Link } from 'react-router-dom'

function SideChat({ id, name, newChat }) {
    const [mes, setMes] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('time','desc').onSnapshot(snap => {
                setMes(snap.docs.map(doc => doc.data()));
            });
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Enter name for chat");
        if (roomName) {
            db.collection('rooms').add({
                name : roomName
            })
        }
    }
    return !newChat ? (
      <Link  to={`/rooms/${id}`} >
        <div className="sideChat">
            <Avatar src={faker.image.abstract()}/>
            <div className="info">
                <h2>{name}</h2>
                <p>{mes[0]?.message}</p>
            </div>
        </div>
      </Link>
    ) : (
        <div className="sideChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SideChat
