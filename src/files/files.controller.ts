import { Controller, Get, Post, Body, Patch, Param, Delete, ParseFilePipe, MaxFileSizeValidator, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { fileStorage } from './storage';
import { Query, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash'
}

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: fileStorage
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  create(@UploadedFile(
    new ParseFilePipe({
      validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})]
    })
  ) file: Express.Multer.File, @UserId() userId: number) {
    return this.filesService.create(file, userId)
  }

  @Get()
  findAll(@UserId() userId: number, @Query('type') filetype: FileType) {
    return this.filesService.findAll(userId, filetype)
  }
}
