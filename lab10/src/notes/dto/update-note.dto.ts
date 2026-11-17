import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

// title, content, tags, categoryId, isPinned are all optional here
export class UpdateNoteDto extends PartialType(OmitType(CreateNoteDto, ['userId'] as const)) {}
