import React from 'react';

const Title: React.FC<ITitleProps> = ({ getCards }) => (
  <>
    <h1>Magic Match</h1>
    <button type="button" onClick={getCards}>New Game</button>
  </>
);

export default Title;

interface ITitleProps {
  getCards: () => void
}
