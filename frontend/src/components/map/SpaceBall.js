import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

import {
	RoomSpace,
	Icons,
	DialogContainer,
	InfoTitle,
	InfoText,
	StartGameButton,
	CirclePoint,
	Orange,
	Blue,
	Purple,
	Pink,
	Green,
	CloseIcon } from './Styling';

export const SpaceBall = () => {
	const [openGame, setOpenGame] = useState(false);

	const onToggleGameDialog = () => {
		setOpenGame(!openGame);
	};

	return (
		<>
			<RoomSpace 
				tabIndex='0' 
				aria-label='Spaceball' 
				onClick={onToggleGameDialog}>
				<Icons>
					<BubbleChartIcon fontSize='large' />
				</Icons>
			</RoomSpace>
			<Dialog open={openGame} onClose={onToggleGameDialog}>
				<DialogContainer>
					<InfoTitle>
						Space Ball
						<CloseIcon tabIndex='0' onClick={onToggleGameDialog} />
					</InfoTitle>
					<InfoText>
						This game is to train your reflexes and see how fast you are, also an
						important part of being a citizen! You have 30 seconds to collect as many
						points as possible. 3 points equals 1 badge.
					</InfoText>
					<CirclePoint>
						<Purple></Purple> - 1 point
					</CirclePoint>
					<CirclePoint>
						<Green></Green> - 1 point
					</CirclePoint>
					<CirclePoint>
						<Pink></Pink> - 2 points
					</CirclePoint>
					<CirclePoint>
						<Blue></Blue> - 3 points
					</CirclePoint>
					<CirclePoint>
						<Orange></Orange> - 4 points
					</CirclePoint>
					<StartGameButton to='/spaceball'>Lets start</StartGameButton>
				</DialogContainer>
			</Dialog>
		</>
	);
};
