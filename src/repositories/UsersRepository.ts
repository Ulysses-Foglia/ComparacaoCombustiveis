import Car from '../models/Car';
import User from '../models/User';

interface CreateUserDTO {
  userName: string;
  password: string;
  cars: Car[];
}

export default class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  // CRUD = Create / Read / Update / Delete
  public Create({ userName, password, cars }: CreateUserDTO): User {
    const newUser = new User({ userName, password, cars });

    this.users.push(newUser);

    return newUser;
  }

  public All(): User[] {
    return this.users;
  }

  public FindById(id: string | undefined): User | undefined {
    return this.users.find(x => x.id === id);
  }

  public FindByUserName(userName: string): User[] | undefined {
    return this.users.filter(x => x.userName === userName);
  }

  public Delete(id: string | undefined): string {
    const deletedUserName = this.FindById(id)?.userName;

    this.users = this.users.filter(x => x.id !== id);

    return `User ${deletedUserName} succesfully deleted!`;
  }
}
