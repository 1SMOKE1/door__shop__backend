import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateDoorCoveringDto } from "../dto/create-door-covering.dto";
import { UpdateDoorCoveringDto } from "../dto/update-door-covering.dto";
import { DoorCoveringService } from "../services/door-covering.service";


@Controller("covering")
export class DoorCoveringController {
  constructor(private readonly doorCoveringService: DoorCoveringService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorCoveringService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateDoorCoveringDto, @Res() res: Response) {
    try {
      const entity = await this.doorCoveringService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorCoveringDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorCoveringService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorCoveringService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
