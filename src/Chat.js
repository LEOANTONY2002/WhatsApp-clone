import './Chat.css';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from './firebase';
import faker from 'faker';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/SendRounded';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user },dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snap => {
                setRoomName(snap.data().name);
            });

            db.collection('rooms').doc(roomId).collection('messages').orderBy('time','asc').onSnapshot(snap => {
                setMessages(snap.docs.map(doc => doc.data()));
            });
        };
    }, [roomId]);
    
    const sendMes = e => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name : user.displayName,
            message : input,
            time : firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    return (
        <div className="Chat">
            <div className="head">
                <Avatar src={faker.image.avatar()}/>
                <div className="head_info">
                    <h3>{roomName}</h3>
                    
                </div>
                <div className="head_right">
                    <IconButton>
                        <SearchOutlined style={{color : "white"}}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile style={{color : "white"}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color : "white"}}/>
                    </IconButton>
                </div>
            </div>
            <div className="body">
              {messages.map(mes => (
                <p className={`msg ${mes.name === user.displayName && 'rec'}`}>
                  <span className="name">{mes.name}</span>
                  {mes.message}
                  <span className="time">{new Date(mes.time?.toDate()).toUTCString()}</span>
                </p>
              ))}

            </div>
            <form className="foot">
                <div className="inp">
                    <InsertEmoticonIcon style={{padding : "5px",width : "30px",height : "30px",color : "#A3A7A9",background : "transparent"}} />
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} className="input" placeholder="Type a message"/>
                </div>
                <div className="send">
                    <MicIcon onClick={sendMes} type="submit" style={{marginLeft : "5px", marginTop : "5px", color : "white"}} />
                </div>
            </form>
        </div>
    )
}

export default Chat
