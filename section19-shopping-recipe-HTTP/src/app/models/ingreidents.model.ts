export interface IIngredient {
  name: string;
  amount: number;
}

export interface IIngredientId {
  name: string;
  amount: number;
  id?: string;
}

export class Ingredient implements IIngredient {
  constructor(public name: string, public amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
