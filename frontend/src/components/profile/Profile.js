import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';


import { profile } from '../../reducers/profile';
import { ItemsProfile } from './ItemsProfile';
import { ProfileStats } from './ProfileStats';
import { Buttons } from './Buttons';
import { 
	ProfileContainer, 
	DaysContainer, 
	DaysText, 
	BottomContainer, 
	RightContainer,
	ContainerTitle } from './Styling';

export const Profile = () => {
	const username = useSelector((store) => store.profile.username);
	const avatar = useSelector((store) => store.profile.avatar);
	const created = useSelector((store) => store.profile.created);
	const badges = useSelector((store) => store.profile.badges);
	const ranking = useSelector((store) => store.profile.ranking);
	const coins = useSelector((store) => store.profile.coins);
	const items = useSelector((store) => store.profile.items);
	const myItems = Object.keys(items);

	const dispatch = useDispatch();
	const history = useHistory();

	const onLogout = () => {
		dispatch(profile.actions.setLogOut())
		history.push('/');
	};

	return (
		<ProfileContainer>
				<ProfileStats 
				avatar={require(`../../assets/${avatar}.png`)}
				username={username} 
				badges={badges} 
				ranking={ranking} 
				coins={coins} />
				<DaysContainer>
					<DaysText>Days on ship: {moment(created).toNow(true)}</DaysText>
					<DaysText>
						Days to destination: 
					</DaysText>
				</DaysContainer>
			<BottomContainer>
				{/* <LeftContainer>
					<ContainerTitle>Tasks for today</ContainerTitle>
				</LeftContainer> */}
				<RightContainer>
					<ContainerTitle>My items</ContainerTitle>
					{myItems.map((key) => <ItemsProfile item={items[key]} />)}
				</RightContainer>
			</BottomContainer>
				<Buttons onClick={onLogout} />
		</ProfileContainer>
	);
};

