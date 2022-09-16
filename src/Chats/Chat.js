import React, { useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useEffect } from 'react';
import db from '../firebase';
import Message from './Messages/Message';
import ChatInput from './ChatInput/ChatInput';

function Chat() {
	const { roomID } = useParams();
	const [roomDetails, setRoomDetails] = useState(null);
	const [roomMessages, setRoomMessages] = useState([]);

	useEffect(() => {
		if (roomID) {
			db.collection('rooms')
				.doc(roomID)
				.onSnapshot((snapshot) => setRoomDetails(snapshot.data()));

			db.collection('rooms')
				.doc(roomID)
				.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map((doc) => doc.data())));
		}
	}, [roomID]);

	return (
		<div className="chat">
			<div className="chat__header">
				<div className="chat__headerLeft">
					<h4 className="chat__channelName">
						<strong># {roomDetails?.name}</strong>
						<StarBorderIcon />
					</h4>
				</div>
				<div className="chat__headerRight">
					<p>
						<InfoOutlinedIcon /> Details
					</p>
				</div>
			</div>

			<div className="chat__message">
				{roomMessages.map(({ message, timestamp, user, userImage }) => (
					<Message message={message} timestamp={timestamp} user={user} userImage={userImage} />
				))}
			</div>

			<ChatInput channelName={roomDetails?.name} channelID={roomID} />
		</div>
	);
}

export default Chat;
