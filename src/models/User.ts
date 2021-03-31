import { uuid } from 'uuidv4';
import Car from './Car';

class User {
  id: string;

  userName: string;

  password: string;

  cars: Car[];

  constructor({ userName, password, cars }: Omit<User, 'id'>) {
    this.id = uuid();
    this.userName = userName;
    this.password = password;
    this.cars = cars;
  }
}

export default User;
