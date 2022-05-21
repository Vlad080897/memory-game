/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { Card } from '../App';
import cover from '../img/cover.png';
import './SingleCard.css';

const SingleCard: React.FC<SingleCardType> = ({
  card,
  handleFlip,
  secondAttemp,
}) => {
  const flipCard = () => {
    handleFlip(card.id);
  };

  if (card.isFliped) {
    return (
      <div className={card.isFliped ? 'card flipped' : 'card unflipped'}>
        <img
          src={require(`../img/${card.src}.png`)}
          alt="front"
        />
      </div>
    );
  }

  return (
    <div className={card.isFliped ? 'card flipped' : 'card unflipped'}>
      <img
        src={cover}
        onClick={secondAttemp ? null : flipCard}
        onKeyUp={null}
        alt="back"
      />
    </div>
  );
};

export default SingleCard;

interface SingleCardType {
  card: Card,
  secondAttemp: Card | null
  handleFlip: (id: number) => void
}
