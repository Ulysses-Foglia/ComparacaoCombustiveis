import { uuid } from 'uuidv4';
import Consumption from './Consumption';

class Car {
  id: string;

  idUser: string;

  name: string;

  plate: string;

  tankCapacity: number;

  consumptions: Consumption[];

  constructor({
    idUser,
    name,
    plate,
    tankCapacity,
    consumptions,
  }: Omit<Car, 'id'>) {
    this.id = uuid();
    this.idUser = idUser;
    this.name = name;
    this.plate = plate;
    this.tankCapacity = tankCapacity;
    this.consumptions = consumptions;
  }
}

export default Car;
