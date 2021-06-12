import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cart } from '../../reducers/cart';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';

export const Product = ({ product }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const addProduct = () => {
		dispatch(cart.actions.addItem(product));
		setOpen(!open);
		setTimeout(() => {
			setOpen(false);
		}, 1200);
	};

	return (
		<ProductWrapper>
			<Dialog open={open} onClose={addProduct}>
				<DialogContainer>
					<Icon>{}</Icon>
					<Text>{product.title}</Text>
					<Text>{product.price}:-</Text>
				</DialogContainer>
			</Dialog>
			<ImageWrapper>
				<ProductImage src={require(`./assets/${product.image}`)} alt={product.title} />
			</ImageWrapper>
				<TextWrapper>
						<Text>{product.title}</Text>
					<TextDescription>{product.description}</TextDescription>
					<Text>{product.price}:-</Text>
					<AddButton
						type='button'
						disabled={product.inventory === 0}
						onClick={addProduct}
					>
						Add to cart
					</AddButton>
				</TextWrapper>
		</ProductWrapper>
	);
};

const ProductImage = styled.img`
	height: 100px;
`;

const ImageWrapper = styled.div`
	margin: 0;
	padding: 5px;
	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.secondary};
`;
const DialogContainer = styled.div`
	background-color: ${(props) => props.theme.backgroundColor};
	border: 2px solid ${(props) => props.theme.primary};
	display: flex;
	flex-direction: column;
	padding: 20px;
	color: ${(props) => props.theme.textColor};
`;

const AddButton = styled.button`
	padding: 5px;
	margin-top: 10px;
	font-size: 12px;
	width: fit-content;
	text-transform: uppercase;
	font-family: 'Trispace', serif;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.textColor};
	border: 2px solid ${(props) => props.theme.secondary};
	:hover,
	:focus {
		background-color: ${(props) => props.theme.secondary};
	}
`;

const ProductWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 200px;
	margin-bottom: 10px;
	aline-items: center;
	justify-content: center;
	padding: 5px;
	margin: 10px;
	border: 2px solid ${(props) => props.theme.primary};

	@media (min-width: 768px) {
		max-width: 45%;
		padding: 5px;
	}
	@media (min-width: 1200px) {
		max-width: 25%;
	}
`;

const TextWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 7px 7px 7px 13px;
	margin: 0;
`;

// const TitleBotWrapper = styled.div`
// 	width: 100%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// `;

// const Wrapper1 = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	margin: 10px;
// `;

const Icon = styled.image``;

const Text = styled.h3`
	color: ${(props) => props.theme.textColor};
	margin: 0;
	padding: 0;
	font-size: 16px;
	text-transform: uppercase;
`;

const TextDescription = styled.p`
	color: ${(props) => props.theme.textColor};
	margin: 2px 0;
	font-size: 14px;
`;
