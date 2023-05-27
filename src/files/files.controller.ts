import { Controller, Get, Post, Body, Patch, Param, Delete, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { fileStorage } from './storage';
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('files')
@ApiTags('files')
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
  ) file: Express.Multer.File) {
    return file
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }
}
