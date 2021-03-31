import Car from '../models/Car';
import Consumption from '../models/Consumption';

interface CreateCarDTO {
  idUser: string;
  name: string;
  plate: string;
  tankCapacity: number;
  consumptions: Consumption[];
}

export default class CarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  public Create({
    idUser,
    name,
    plate,
    tankCapacity,
    consumptions,
  }: CreateCarDTO): Car {
    const newCar = new Car({ idUser, name, plate, tankCapacity, consumptions });

    this.cars.push(newCar);

    return newCar;
  }

  public All(): Car[] {
    return this.cars;
  }

  public FindById(id: string): Car | undefined {
    return this.cars.find(x => x.id === id);
  }

  public FindByPlate(plate: string): Car[] | undefined {
    return this.cars.filter(x => x.plate === plate);
  }

  public Delete(id: string): string {
    const deletedCarName = this.FindById(id)?.name;

    this.cars = this.cars.filter(x => x.id !== id);

    return `${deletedCarName} was succesfully deleted!`;
  }
}
