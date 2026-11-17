import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsPositive()
  userId: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  tags?: string[];

  // Task 4
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;

  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;
}
