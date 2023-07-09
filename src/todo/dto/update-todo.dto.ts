import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../schemas/todo.schema';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly task: string;
  @IsOptional()
  @IsEnum(Priority, { message: 'use correct enums' })
  readonly priority: Priority;

  @IsOptional()
  @IsBoolean()
  readonly done: boolean;

  @IsEmpty({ message: 'Cant put userId' })
  readonly userId: User;
}
