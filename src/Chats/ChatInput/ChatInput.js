import React from 'react';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import db from '../../firebase';
import firebase from 'firebase';
import './ChatInput.css';

function ChatInput({ channelName, channelID }) {
	const [inputMessage, setInputMessage] = useState('');
	const [{ user }] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();

		if (channelID) {
			db.collection('rooms').doc(channelID).collection('messages').add({
				message: inputMessage,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user.displayName,
				userImage: user.photoURL,
			});
		}

		setInputMessage('');
	};

	return (
		<div className="chatInput">
			<form>
				<input
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					placeholder={`Message #${channelName?.toLowerCase()}`}
				/>
				<Button onClick={sendMessage} type="submit">
					SEND
				</Button>
			</form>
		</div>
	);
}

export default ChatInput;
