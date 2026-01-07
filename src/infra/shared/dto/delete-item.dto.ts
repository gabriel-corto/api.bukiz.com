import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
