import styled from 'styled-components';

// Profile Stats
export const ImageNameContainer = styled.div`
	display: flex;
	align-items: center;
  justify-content: center;
  flex-direction: column;
	width: 100%;
  padding: 5px 0 0 0;
  margin: 0 10px;
  height: 10%;
  border-bottom: 2px solid ${(props) => props.theme.secondary};
`;

export const ProfileAvatar = styled.img`
	width: 40px;
	height: 40px;
	padding: 2px;
	border-radius: 50%;
	border: 1px solid ${(props) => props.theme.primary};
	background-color: ${(props) => props.theme.secondary};
	margin: 0 0 0 6px;
	:hover {
		opacity: 0.7;
	}
	@media (min-width: 768px) {
		width: 120px;
		height: 120px;
		padding: 4px;
	}
`;

export const StatusContainer = styled.div`
	display: flex;
  justify-content: center;
  align-items: center;
	width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;

export const Username = styled.h3`
	font-size: 14px;
	font-weight: bold;
	margin: 7px 0 5px 3px;
	color: ${(props) => props.theme.textColor};
	text-transform: uppercase;
	@media (min-width: 768px) {
		font-size: 16px;
	}
`;

export const BadgesText = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
  padding: 15px 15px;
	color: ${(props) => props.theme.textColor};
  border-right: 2px solid ${(props) => props.theme.secondary};
	@media (min-width: 768px) {
		font-size: 14px;
	}
`;

export const CoinsText = styled(BadgesText)`
border-right: none;
`;

export const IconImage = styled.img`
	margin: 0 5px 5px 5px;
`;

// Profile 
export const ProfileContainer = styled.section`
	display: flex;
	flex-direction: column;
  justify-content: space-between;
  align-items: center;
	max-height: 100vh;
  padding: 10px 0;
  margin: 10px;
  max-width: 350px;
`;

// export const TopContainer = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	border-bottom: 2px solid ${(props) => props.theme.secondary};
// 	padding-bottom: 0px;
// 	width: 100%;
// 	margin: 0;
// `;

export const DaysContainer = styled(StatusContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
	margin: 10px;
  padding: 5px 0 13px 0;
	border-bottom: 2px solid ${(props) => props.theme.secondary};
`;

export const DaysText = styled(CoinsText)`
	font-weight: bold;
  word-wrap: wrap;
  margin: 0;
  padding: 5px 10px;
`;

export const BottomContainer = styled.div`
	display: flex;
  flex-direction: column;
  margin: 0 10px;
  width: 100%;
	border-bottom: 2px solid ${(props) => props.theme.secondary};
`;

export const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0 5px 6px;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.secondary};
`;

export const RightContainer = styled(LeftContainer)`
  padding: 10px 0 10px 6px;
  border-bottom: none;
`;

export const ContainerTitle = styled(Username)`
	font-size: 15px;
`;

// Buttons
export const ButtonContainer = styled.div`
	display: flex;
  flex-direction: column;
	flex-wrap: wrap;
  padding: 10px;
`;

export const ButtonSignOut = styled.button`
	margin-top: 10px;
	background-color: transparent;
	font-size: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
	color: ${props => props.theme.textColor};
	:hover {
		color: ${props => props.theme.hover};
	}
`;

// Items Profile
export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin: 0;
  width: fit-content;
`;

export const ItemsTitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textColor};
  margin: 0 0 0 3px;
  padding: 0;
`;

export const ItemsQuantity = styled(ItemsTitle)`
  margin: 0 0 0 5px;
`;