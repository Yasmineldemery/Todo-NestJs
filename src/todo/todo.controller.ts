import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('/all')
  @UseGuards(AuthGuard())
  async getAllTodos(@Query() query: ExpressQuery): Promise<Todo[]> {
    return this.todoService.getAll(query);
  }
  @Get()
  @UseGuards(AuthGuard())
  async getMy(@Query() query: ExpressQuery, @Req() req): Promise<Todo[]> {
    return this.todoService.getMy(query, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getOne(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createTodo(@Body() todo: CreateTodoDto, @Req() req): Promise<Todo> {
    return this.todoService.createTodo(todo, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateOne(id, todo);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteOne(id);
  }
}
