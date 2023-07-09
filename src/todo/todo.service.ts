import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  async getAll(query: Query): Promise<Todo[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    const keywoard = query.keywoard
      ? {
          priority: {
            $regex: query.keywoard,
            $options: 'i',
          },
        }
      : {};

    const todos = await this.todoModel
      .find({ ...keywoard })
      .limit(resPerPage)
      .skip(skip);
    return todos;
  }
  async getMy(query: Query, user: User): Promise<Todo[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    const keywoard = query.keywoard
      ? {
          priority: {
            $regex: query.keywoard,
            $options: 'i',
          },
        }
      : {};

    const todos = await this.todoModel
      .find({ ...keywoard, userId: user._id })
      .limit(resPerPage)
      .skip(skip);
    return todos;
  }

  async getOne(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }
    const res = await this.todoModel.findById(id);
    if (!res) {
      throw new NotFoundException('Todo does not exist');
    }
    return res;
  }

  async createTodo(todo: Todo, user: User): Promise<Todo> {
    const data = Object.assign(todo, {
      userId: user._id,
    });
    const res = await this.todoModel.create(data);
    return res;
  }

  async updateOne(id: any, todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });
  }

  async deleteOne(id: any): Promise<Todo> {
    return await this.todoModel.findByIdAndDelete(id);
  }
}
