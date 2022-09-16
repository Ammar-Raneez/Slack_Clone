import React from 'react';
import './SideBarOption.css';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';

function SideBarOption({ Icon, title, addChannelOption, id }) {
	const history = useHistory();

	const selectChannel = () => {
		if (id) {
			history.push(`/room/${id}`);
		} else {
			history.push(title);
		}
	};

	const addChannel = () => {
		const channelName = prompt('Please enter the name of the channel');
		if (channelName) {
			db.collection('rooms').add({
				name: channelName,
			});
		}
	};

	return (
		<div className="sideBarOption" onClick={addChannelOption ? addChannel : selectChannel}>
			{Icon && <Icon className="sideBarOption__icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className="sideBarOption__channel">
					<span className="sideBarOption__hash"> # </span> {title}
				</h3>
			)}
		</div>
	);
}

export default SideBarOption;
