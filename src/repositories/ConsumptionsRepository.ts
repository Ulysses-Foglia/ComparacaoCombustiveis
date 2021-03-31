import Consumption from '../models/Consumption';

interface CreateConsumptionDTO {
  idCar: string;
  fuel: string;
  value: number;
  price: number;
}

export default class ConsumptionRepository {
  private consumptions: Consumption[];

  constructor() {
    this.consumptions = [];
  }

  public All(): Consumption[] {
    return this.consumptions;
  }

  public Create({
    idCar,
    fuel,
    value,
    price,
  }: CreateConsumptionDTO): Consumption {
    const newConsumption = new Consumption({ idCar, fuel, value, price });

    this.consumptions.push(newConsumption);

    return newConsumption;
  }

  public FindById(id: string): Consumption | undefined {
    return this.consumptions.find(x => x.fuel === id);
  }

  public FindByFuel(fuel: string): Consumption[] | undefined {
    return this.consumptions.filter(x => x.fuel === fuel);
  }

  public Delete(id: string): string {
    const deletedConsumptionFuel = this.consumptions.find(x => x.id === id)
      ?.fuel;

    this.consumptions = this.consumptions.filter(x => x.id !== id);

    return `Consumption of ${deletedConsumptionFuel} succesfully deleted!`;
  }
}
