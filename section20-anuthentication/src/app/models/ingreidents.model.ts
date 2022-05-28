export interface IIngredient {
  name: string;
  amount: number;
}

export interface IIngredientId {
  name: string;
  amount: number;
  id: string;
}

export class Ingredient implements IIngredientId {
  constructor(public name: string, public amount: number, public id: string) {
    this.name = name;
    this.amount = amount;
    this.id = id;
  }
}
