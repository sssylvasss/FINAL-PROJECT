import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog } from '@material-ui/core';

import { updateBadges } from '../../reducers/profile';
import { Header } from '../../components/Header';
import { Camera } from '../../components/Camera';
import { 
  MainContainer, 
  GameTitle, 
  ScoreText, 
  CounterText, 
  ButtonOne, 
  ButtonTwo, 
  ButtonThree, 
  ButtonFour,
  ButtonFive,
  DialogContainer, 
  DialogText, 
  StartButton } from './Styling';

export const GameBall = () => {
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(30);
  const [openFinishedDialog, setOpenFinishedDialog] = useState(false);
  const numOfBadges = Math.round(score / 2);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const timer =
    counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const onCollectBadges = () => {
    dispatch(updateBadges(numOfBadges));
    setTimeout(() => {
      history.push('/')
    }, 1000)
  };

  useEffect(() => {
    if (counter === 0) {
      setOpenFinishedDialog(true);
    }
  }, [counter])
  
  const onClickEasy = () => {
    setScore(score +1);
  };

  const onClickHard = () => {
    setScore(score + 3);
  };


  return (
    <>
    <Header />
    <Camera />
    <MainContainer>
      <GameTitle>Space Ball</GameTitle>
      <ScoreText>Score: {score}</ScoreText>
      <CounterText>00:{counter.toString().padStart(2, '0')}</CounterText>
      <ButtonOne onClick={onClickHard}></ButtonOne>
      <ButtonTwo onClick={onClickEasy}></ButtonTwo>
      <ButtonThree onClick={onClickEasy}></ButtonThree>
      <ButtonFour onClick={onClickEasy}></ButtonFour>
      <ButtonFive onClick={onClickHard}></ButtonFive>
      <Dialog open={openFinishedDialog}>
        <DialogContainer>
          <DialogText>You managed to get {score} points which is {numOfBadges} badges!</DialogText>
          <StartButton onClick={onCollectBadges}>{score > 0 ? 'Collect badges' : 'Sorry, no badges this time'}</StartButton>
        </DialogContainer>
      </Dialog>
    </MainContainer>
    </>
  )
};