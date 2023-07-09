import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Priority } from '../schemas/todo.schema';
import { User } from 'src/auth/schemas/user.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly task: string;

  @IsNotEmpty()
  @IsEnum(Priority, { message: 'use correct enums' })
  readonly priority: Priority;

  @IsNotEmpty()
  @IsBoolean()
  readonly done: boolean;

  @IsEmpty({ message: 'Cant put userId' })
  readonly userId: User;
}
