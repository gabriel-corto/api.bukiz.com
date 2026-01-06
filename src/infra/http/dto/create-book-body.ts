import { ApiProperty } from '@nestjs/swagger';
import { BookCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateBookBody {
  @ApiProperty({
    example: 'Clean Code',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Uncle Bob',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 45,
  })
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: 13750,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    enum: BookCategory,
    example: BookCategory.Finance,
  })
  @IsNotEmpty()
  @IsEnum(BookCategory)
  category: BookCategory;
}
