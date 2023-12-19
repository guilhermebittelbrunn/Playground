import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './user.model';
import { CreateUser } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { LoginUser } from './dto/login-user.dto';
import { ILoginData } from './login.model';

const SECRET = 'dasuidsadg718daiusdhasuida3d3d3d3d3d3d';

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  findAll(): IUser[] {
    return this.users;
  }

  create(createUser: CreateUser) {
    const { name, age, password } = createUser;
    const cryptedPassword = bcrypt.hashSync(password, 10);
    const user: IUser = {
      id: randomUUID(),
      password: cryptedPassword,
      name,
      age,
    };

    return `${user.name} created with success`;
  }

  login(loginUser: LoginUser) {
    const { name, password } = loginUser;
    try {
      const findUser = this.users.find((user) => user.name === name);
      if (findUser === undefined) throw 'User not found';

      if (bcrypt.compareSync(password, findUser.password)) {
        const { age } = findUser;
        const token = '13y7t81';
        return { userData: { name, age }, token };
      }
    } catch (error: any) {
      return { error, code: HttpStatus.FORBIDDEN };
    }
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id === id);
  }
}
