import React, { useEffect, useState } from 'react';
import './App.css';
import CardGrid from './components/CardGrid';
import Record from './components/Record';
import Title from './components/Title';
import { cardImages } from './data/data';

const App = () => {
  const [currentResult, setCurrentResult] = useState<string>('');
  const [cardArray, setCardArray] = useState<Card[]>([]);
  const [firstAttemp, setFirstAttemp] = useState<Card | null>(null);
  const [secondAttemp, setSecondAttemp] = useState<Card | null>(null);
  const [finish, setFinish] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const flipBack = (newArray: Card[]) => {
    const timeoutId = setTimeout(() => {
      setCardArray(newArray);
      setSecondAttemp(null);
      clearTimeout(timeoutId);
    }, 700);
  };

  const flipCheck = (id: number) => {
    const flippedCard = cardArray.find((card) => card.id === id);
    if (!firstAttemp) {
      return setFirstAttemp(flippedCard);
    }
    setSecondAttemp(flippedCard);
    if (firstAttemp.src !== flippedCard.src) {
      const newArray = cardArray.map((card) => {
        if (card.id === firstAttemp.id || card.id === id) {
          const newCard = { ...card, isFliped: false };
          return newCard;
        }
        return card;
      });
      setFirstAttemp(null);
      setTotal((prev) => prev + 1);
      return flipBack(newArray);
    }
    setTotal((prev) => prev + 1);
    setFirstAttemp(null);
    return setSecondAttemp(null);
  };

  const handleFlip = (id: number) => {
    const newArray = cardArray.map((card) => {
      if (card.id === id) {
        const newCard = { ...card, isFliped: true };
        return newCard;
      }
      return card;
    });
    setCardArray(newArray);
    flipCheck(id);
  };

  const getCards = () => {
    const baseCardsArray = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => (
        {
          ...card,
          id: index,
          isFliped: false,
        }
      ));
    setTotal(0);
    setFinish(false);
    setFirstAttemp(null);
    setSecondAttemp(null);
    setCardArray(baseCardsArray);
  };

  useEffect(() => {
    const isContinue = cardArray.filter((card) => card.isFliped === false);
    if (!isContinue.length && total > 0) {
      if (!sessionStorage.length) {
        sessionStorage.setItem('Record', total.toString());
      }
      if (Number(sessionStorage.getItem('Record')) > total) {
        sessionStorage.setItem('Record', total.toString());
        setCurrentResult(`You have beaten your record. New Record is ${total}`);
        setFinish(true);
        return;
      }
      setCurrentResult(`Game finished.Total: ${total}.Record: ${sessionStorage.getItem('Record')}`);
      setFinish(true);
    }
  }, [total]);

  return (
    <div className="App">
      <Title getCards={getCards} />
      <CardGrid
        finish={finish}
        currentResult={currentResult}
        cardArray={cardArray}
        secondAttemp={secondAttemp}
        handleFlip={handleFlip}
      />
      <Record total={total} />
    </div>
  );
};

export default App;

export interface Card {
  id: number,
  src: string,
  isFliped: boolean
}
