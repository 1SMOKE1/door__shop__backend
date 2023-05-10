import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { DoorFrameMaterialService } from "../services/door-frame-material.service";
import { Response } from "express";
import { CreateDoorFrameMaterialDto } from "../dto/create-door-frame-material.dto";
import { UpdateDoorFrameMaterialDto } from "../dto/update-door-frame-material.dto";

@Controller("door-frame-material")
export class FrameMaterialController {
  constructor(private readonly doorFrameMaterialService: DoorFrameMaterialService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorFrameMaterialService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateDoorFrameMaterialDto, @Res() res: Response) {
    try {
      const entity = await this.doorFrameMaterialService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorFrameMaterialDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorFrameMaterialService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorFrameMaterialService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
