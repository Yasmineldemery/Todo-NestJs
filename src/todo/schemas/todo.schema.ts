import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop()
  task: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  done: boolean;

  @Prop()
  priority: Priority;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
