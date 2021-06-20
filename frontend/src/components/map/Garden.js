import React from 'react';
import { Tooltip } from '@material-ui/core';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

import { RoomGarden, Icons } from './Styling';

export const Garden = () => {
	return (
		<Tooltip title='GARDEN! grow flowers and earn points!'>
			<RoomGarden to='/Garden'>
				<Icons>
					<LocalFloristIcon fontSize='large' />
				</Icons>
			</RoomGarden>
		</Tooltip>
	);
};
