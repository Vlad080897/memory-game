import React from 'react';
import { Card } from '../App';
import SingleCard from './SingleCard';

const CardGrid: React.FC<ICardGridProp> = ({
  finish,
  currentResult,
  cardArray,
  secondAttemp,
  handleFlip,
}) => {
  if (finish) {
    return (
      <div className="finish_block">
        {currentResult}
      </div>
    );
  }

  return (
    <div className="card-grid">
      {
        cardArray.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleFlip={handleFlip}
            secondAttemp={secondAttemp}
          />
        ))
      }
    </div>
  );
};

export default CardGrid;

interface ICardGridProp {
  finish: boolean,
  currentResult: string,
  cardArray: Card[],
  handleFlip: (id: number) => void,
  secondAttemp: Card | null
}
