import { ICard } from './card.model';
import { Value } from './values.model';
import { Color } from './color.model';

export interface IHand {
  cards: ICard[];

  readonly score: number;

  addCard(card: ICard): void;
  addCards(cards: ICard[]): void;
  removeCard(card: ICard): void;
  hasCard(value: Value, color?: Color): boolean;
}

export class Hand implements IHand {
  cards: ICard[];

  constructor() {
    this.cards = [];
  }

  get score() {
    return this.cards.reduce((score, card) => {
      score += card.score;

      return score;
    }, 0);
  }

  addCard(card: ICard) {
    this.cards.push(card);
  }

  addCards(cards: ICard[]) {
    this.cards.push(...cards);
  }

  removeCard(card: ICard) {
    if (!card) {
      throw new Error(`La mano del jugador no posee cartas`);
    }

    const cardIndex = this.cards.findIndex(
      (handCard) => handCard.id === card.id,
    );

    if (cardIndex === -1) {
      throw new Error(`La mano del jugador no posee la carta: ${card.id}`);
    }

    this.cards.splice(cardIndex, 1);
  }

  hasCard(value: Value, color?: Color) {
    if (!color) {
      return this.cards.some((handCard) => handCard.value === value);
    }

    return this.cards.some(
      (handCard) => handCard.value === value && handCard.color === color,
    );
  }
}
