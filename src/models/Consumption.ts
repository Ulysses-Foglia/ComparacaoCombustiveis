import { uuid } from 'uuidv4';

class Consumption {
  id: string;

  idCar: string;

  fuel: string;

  value: number;

  price: number;

  costBenefitRatio: number;

  constructor({
    idCar,
    fuel,
    value,
    price,
  }: Omit<Consumption, 'id' | 'costBenefitRatio'>) {
    this.id = uuid();
    this.idCar = idCar;
    this.fuel = fuel;
    this.value = value;
    this.price = price;
    this.costBenefitRatio = price / value;
  }
}

export default Consumption;
