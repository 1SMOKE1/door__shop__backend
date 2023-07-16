/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { TypeOfProductEnum } from 'src/enums/type-of-product.enum';
import { IExcelProduct } from '../interfaces/excel-product.interface';
import { InteriorDoorService } from 'src/modules/products/interior-door/services/interior-door.service';
import { CreateInteriorDoorDto } from 'src/modules/products/interior-door/dto/create-interior-door.dto';
import reader from 'node-xlsx';
import { parse } from 'csv-string';
import { CreateEntranceDoorDto } from 'src/modules/products/entrance-door/dto/create-entrance-door.dto';
import { EntranceDoorService } from 'src/modules/products/entrance-door/services/entrance-door.service';
import { CreateWindowDto } from 'src/modules/products/window/dto/create-window.dto';
import { WindowService } from 'src/modules/products/window/services/window.service';
import { FurnitureService } from 'src/modules/products/furniture/services/furniture.service';
import { CreateFurnitureDto } from 'src/modules/products/furniture/dto/create-furniture.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager";

@Injectable()
export class ExcelAndPhotosService {

  imagesPathesUpload: string[] = [];
  imagesFilesUpload: Array<Express.Multer.File> = [];
  rowCounter: number = 1;

  constructor(
    @Inject(InteriorDoorService) private readonly interiorDoorService: InteriorDoorService,
    @Inject(EntranceDoorService) private readonly entranceDoorService: EntranceDoorService,
    @Inject(WindowService) private readonly windowService: WindowService,
    @Inject(FurnitureService) private readonly furnitureService: FurnitureService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ){}

  async readExcelAndPhotos(excel: Express.Multer.File, images: Array<Express.Multer.File>){
    
        const workbook = reader.parse(fs.readFileSync(`${excel.path}`))

        // interior_door
  
        if(!workbook.find(({name}) => name === 'interior_door'))
          throw new HttpException('This excel file not consist, the list called interior_door', HttpStatus.CONFLICT);
        
        const interiorDoorWorkSheet = workbook.find((sheet) => sheet.name === 'interior_door');
        const interiorDoorCsvData = interiorDoorWorkSheet.data.map((row) => row.join(';')).join('\n');
  
        const interiorDoorData = parse(interiorDoorCsvData, {output: 'objects', comma: ';'}) as unknown as IExcelProduct[];

        // console.log(interiorDoorData)

        const interiorDoorData$: Promise<IExcelProduct>[] = interiorDoorData.map((row) => new Promise(async (res, rej) => {
          try{
            this.rowCounter += 1;
            this.checkRowHeaders(row, TypeOfProductEnum.interiorDoor);
            await this.addRowToDb(row, TypeOfProductEnum.interiorDoor, images)
            res(row)
          } catch (err) {
            const changedErr = {
              ...err, message: `${err.message}, in row: ${this.rowCounter}, list interior_door`
            }
            if(images !== undefined)
            images.forEach((el) => this.deleteFile(el));
            rej(changedErr)
          }
        }))

        await Promise.all(interiorDoorData$);
        this.resetRowCounter();


  
        // entrance_door
  
        if(!workbook.find(({name}) => name === 'entrance_door'))
          throw new HttpException('This excel file not consist, the list called entrance_door', HttpStatus.CONFLICT);
  
        const entranceDoorWorkSheet = workbook.find((sheet) => sheet.name === 'entrance_door');
        const entranceDoorCsvData = entranceDoorWorkSheet.data.map((row) => row.join(';')).join('\n');
  
        const entranceDoorData = parse(entranceDoorCsvData, {output: 'objects', comma: ';'}) as unknown as IExcelProduct[];
  
        const entranceDoorData$: Promise<IExcelProduct>[] = entranceDoorData.map((row) => new Promise(async (res, rej) => {
          try{
            this.rowCounter += 1;
            this.checkRowHeaders(row, TypeOfProductEnum.entranceDoor);
            await this.addRowToDb(row, TypeOfProductEnum.entranceDoor, images)
            res(row)
          } catch (err) {
            const changedErr = {
              ...err, message: `${err.message}, in row: ${this.rowCounter}, list entrance_door`
            }
            if(images !== undefined)
            images.forEach((el) => this.deleteFile(el));
            rej(changedErr)
          }
        }))
        
        await Promise.all(entranceDoorData$);
        this.resetRowCounter();
  
        // windows
  
        if(!workbook.find(({name}) => name === 'windows'))
          throw new HttpException('This excel file not consist, the list called windows', HttpStatus.CONFLICT);
  
        const windowsWorkSheet = workbook.find((sheet) => sheet.name === 'windows');
        const windowsCsvData = windowsWorkSheet.data.map((row) => row.join(';')).join('\n');
  
        const windowsDoorData = parse(windowsCsvData, {output: 'objects', comma: ';'}) as unknown as IExcelProduct[];
  
        const windowsDoorData$: Promise<IExcelProduct>[] = windowsDoorData.map((row) => new Promise(async (res, rej) => {
          try{
            this.rowCounter += 1;
            this.checkRowHeaders(row, TypeOfProductEnum.windows);
            await this.addRowToDb(row, TypeOfProductEnum.windows, images)
            res(row)
          } catch (err) {
            const changedErr = {
              ...err, message: `${err.message}, in row: ${this.rowCounter}, list windows`
            }
            if(images !== undefined)
            images.forEach((el) => this.deleteFile(el));
            rej(changedErr)
          }
        }))
        
        await Promise.all(windowsDoorData$);
        this.resetRowCounter();
  
        // furniture
  
        if(!workbook.find(({name}) => name === 'furniture'))
        throw new HttpException('This excel file not consist, the list called furniture', HttpStatus.CONFLICT);
  
        const furnitureWorkSheet = workbook.find((sheet) => sheet.name === 'furniture');
        const furnitureCsvData = furnitureWorkSheet.data.map((row) => row.join(';')).join('\n');
  
        const furnitureDoorData = parse(furnitureCsvData, {output: 'objects', comma: ';'}) as unknown as IExcelProduct[];

        const furnitureDoorData$: Promise<IExcelProduct>[] = furnitureDoorData.map((row) => new Promise(async (res, rej) => {
          try{
            this.rowCounter += 1;
            this.checkRowHeaders(row, TypeOfProductEnum.furniture);
            await this.addRowToDb(row, TypeOfProductEnum.furniture, images)
            res(row)
          } catch (err) {
            const changedErr = {
              ...err, message: `${err.message}, in row: ${this.rowCounter}, list furniture`
            }
            if(images !== undefined)
            images.forEach((el) => this.deleteFile(el));
            rej(changedErr)
          }
        }))
        await Promise.all(furnitureDoorData$);
        this.resetRowCounter();

        await this.cache.reset();
  
        this.deleteFile(excel);
  



        
      
    

  
        return 'ok'
  }
  

  private deleteFile(file: Express.Multer.File){
    return fs.unlink(`./uploads/images/${file.filename}`, (err) => {
      if(err)
       throw new HttpException('File not deleted', HttpStatus.BAD_REQUEST)
    })
  }

  private checkRowHeaders(row: IExcelProduct, typeOfProduct: TypeOfProductEnum){
    
      const rowKeys = Object.keys(row).map((key) => key.trim());

      // common headers

      switch(true){
        case !rowKeys.includes('name'):
          throw new HttpException('no name header', HttpStatus.CONFLICT);
        case !rowKeys.includes('country'):
          throw new HttpException('no country header', HttpStatus.CONFLICT);
        case !rowKeys.includes('productProducerName'):
          throw new HttpException('no productProducerName header', HttpStatus.CONFLICT);
        case !rowKeys.includes('guarantee'):
          throw new HttpException('no guarantee header', HttpStatus.CONFLICT);
        case !rowKeys.includes('price'):
          throw new HttpException('no price header', HttpStatus.CONFLICT);
        case !rowKeys.includes('inStock'):
          throw new HttpException('no inStock header', HttpStatus.CONFLICT);
        case !rowKeys.includes('homePage'):
          throw new HttpException('no homePage header', HttpStatus.CONFLICT);
        case !rowKeys.includes('images'):
          throw new HttpException('no images header', HttpStatus.CONFLICT);
        case !rowKeys.includes('description'):
          throw new HttpException('no description header', HttpStatus.CONFLICT);
        case row.name === '' || row.name === undefined: 
          throw new HttpException('name is required', HttpStatus.CONFLICT);
        case row.productProducerName === '' || row.productProducerName === undefined:
          throw new HttpException('productProducerName is required', HttpStatus.CONFLICT);
        case row.country as string === '' || row.country === undefined:
          throw new HttpException('country is required', HttpStatus.CONFLICT);
        case row.guarantee as string === '' || row.guarantee === undefined:
          throw new HttpException('guarantee is required', HttpStatus.CONFLICT);
        case row.inStock as string === '' || row.inStock === undefined:
          throw new HttpException('inStock is required', HttpStatus.CONFLICT);
        case row.price as unknown as string === '' || row.price === undefined:
          throw new HttpException('price is required', HttpStatus.CONFLICT);
      }
      // interior_door Headers, HttpStatus.CONFLICT
      if(typeOfProduct === TypeOfProductEnum.interiorDoor)
        switch(true){
          case !rowKeys.includes('fabricMaterialThickness'):
            throw new HttpException('no fabricMaterialThickness header', HttpStatus.CONFLICT);
          case !rowKeys.includes('fabricMaterialHeight'):
            throw new HttpException('no fabricMaterialHeight header', HttpStatus.CONFLICT);
          case !rowKeys.includes('fabricMaterialWidth'):
            throw new HttpException('no fabricMaterialWidth header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorIsolation'):
            throw new HttpException('no doorIsolation header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorFrameMaterial'):
            throw new HttpException('no doorFrameMaterial header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorSelectionBoard'):
            throw new HttpException('no doorSelectionBoard header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorWelt'):
            throw new HttpException('no doorWelt header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorHand'):
            throw new HttpException('no doorHand header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorMechanism'):
            throw new HttpException('no doorMechanism header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorLoops'):
            throw new HttpException('no doorLoops header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorStopper'):
            throw new HttpException('no doorStopper header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorSlidingSystem'):
            throw new HttpException('no doorSlidingSystem header', HttpStatus.CONFLICT);
        }
      // entrance_door Headers, HttpStatus.CONFLICT
      if(typeOfProduct === TypeOfProductEnum.entranceDoor)
        switch(true){
          case !rowKeys.includes('fabricMaterialThickness'):
            throw new HttpException('no fabricMaterialThickness header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorInsulation'):
            throw new HttpException('no doorInsulation header', HttpStatus.CONFLICT);
          case !rowKeys.includes('covering'):
            throw new HttpException('no covering header', HttpStatus.CONFLICT);
          case !rowKeys.includes('doorPeephole'):
            throw new HttpException('no doorPeephole header', HttpStatus.CONFLICT);
          case !rowKeys.includes('openingType'):
            throw new HttpException('no openingType header', HttpStatus.CONFLICT);
          case !rowKeys.includes('size'):
            throw new HttpException('no size header', HttpStatus.CONFLICT);
          case !rowKeys.includes('lowerLock'):
            throw new  HttpException('no lowerLock header', HttpStatus.CONFLICT);
          case !rowKeys.includes('upperLock'):
            throw new HttpException('no upperLock header', HttpStatus.CONFLICT);
          case !rowKeys.includes('weight'):
            throw new HttpException('no weight header', HttpStatus.CONFLICT);
          case !rowKeys.includes('metalThickness'):
            throw new HttpException('no metalThickness header', HttpStatus.CONFLICT);
          case !rowKeys.includes('frameMaterialConstruction'):
            throw new HttpException('no frameMaterialConstruction header', HttpStatus.CONFLICT);
          case !rowKeys.includes('sealerCircuit'):
            throw new HttpException('no sealerCircuit header', HttpStatus.CONFLICT);
        }
      // windows Header
      if(typeOfProduct === TypeOfProductEnum.windows)
        switch(true){
          case !rowKeys.includes('mosquitoNet'):
          throw new HttpException('no mosquitoNet header', HttpStatus.CONFLICT);
        case !rowKeys.includes('windowSill'):
          throw new HttpException('no windowSill header', HttpStatus.CONFLICT);
        case !rowKeys.includes('windowEbb'):
          throw new HttpException('no windowEbb header', HttpStatus.CONFLICT);
        case !rowKeys.includes('windowHand'):
          throw new HttpException('no windowHand header', HttpStatus.CONFLICT);
        case !rowKeys.includes('childLock'):
          throw new HttpException('no childLock header', HttpStatus.CONFLICT);
        case !rowKeys.includes('housewifeStub'):
          throw new HttpException('no housewifeStub header', HttpStatus.CONFLICT);
        case !rowKeys.includes('glassPocketAdd'):
          throw new HttpException('no glassPocketAdd header', HttpStatus.CONFLICT);
        case !rowKeys.includes('lamination'):
          throw new HttpException('no lamination header', HttpStatus.CONFLICT);
        case !rowKeys.includes('profile'):
          throw new HttpException('no profile header', HttpStatus.CONFLICT);
        case !rowKeys.includes('windowHeight'):
          throw new HttpException('no windowHeight header', HttpStatus.CONFLICT);
        case !rowKeys.includes('windowWidth'):
          throw new HttpException('no windowWidth header', HttpStatus.CONFLICT);
        case !rowKeys.includes('camerasCount'):
          throw new HttpException('no camerasCount header', HttpStatus.CONFLICT);
        case !rowKeys.includes('features'):
          throw new HttpException('no features header', HttpStatus.CONFLICT);
        case !rowKeys.includes('sectionCount'):
          throw new HttpException('no sectionCount header', HttpStatus.CONFLICT);
        }
      
       


    return row;
  }
  
  private async addRowToDb(row: IExcelProduct, typeOfProduct: TypeOfProductEnum, images: Array<Express.Multer.File> | undefined){
    const {
      name, country, productProducerName, guarantee,
      price, inStock, fabricMaterialThickness, fabricMaterialHeight,
      fabricMaterialWidth, doorIsolation, doorFrameMaterial, 
      doorSelectionBoard, doorWelt,
      doorHand, doorMechanism, doorLoops, doorStopper,
      doorSlidingSystem, frameMaterialThickness, doorInsulation,
      covering, doorPeephole, openingType, size, 
      lowerLock, upperLock, weight, metalThickness,
      frameMaterialConstruction, sealerCircuit, mosquitoNet,
      windowSill, windowEbb, windowHand, childLock,
      housewifeStub, glassPocketAdd, lamination, profile,
      windowHeight, windowWidth, camerasCount, features,
      sectionCount, homePage, description
    } = row
    this.resetImagesArrs();
    const imageNames = row.images === undefined || row.images as string === '' ? [] : (row.images as string).split(', ') ;
    const [convertedImageNames, convertedImageFiles] =  this.getImagesForCurentRow(images, imageNames);

    console.log('here')
    switch(true){
      case typeOfProduct === TypeOfProductEnum.interiorDoor:
        const newInteriorDoor: CreateInteriorDoorDto = {
          name,
          productProducerName: productProducerName === undefined || productProducerName === 'null' ? null : productProducerName,
          typeOfProductName: typeOfProduct,
          country,
          guarantee,
          price,
          inStock,
          fabricMaterialThickness: ((fabricMaterialThickness as unknown as string) === '' || fabricMaterialThickness === undefined) ? 0 : fabricMaterialThickness,
          fabricMaterialHeight: ((fabricMaterialHeight as unknown as string) === '' || fabricMaterialHeight === undefined) ? 0 : fabricMaterialHeight,
          fabricMaterialWidth: (fabricMaterialWidth === undefined || fabricMaterialWidth === '') ? [] : (fabricMaterialWidth as string).split(', '),
          doorIsolation: (doorIsolation === undefined || doorIsolation === '') ? [] : (doorIsolation as string).split(', '),
          doorFrameMaterial: (doorFrameMaterial === undefined || doorFrameMaterial === '') ? [] : (doorFrameMaterial as string).split(', '),
          doorSelectionBoard: (doorSelectionBoard === undefined || doorSelectionBoard === '') ? [] : (doorSelectionBoard as string).split(', '),
          doorWelt: (doorWelt === undefined || doorWelt === '') ? [] : (doorWelt as string).split(', '),
          doorHand: (doorHand === undefined || doorHand === '') ? [] : (doorHand as string).split(', '),
          doorLoops: (doorLoops === undefined || doorLoops === '') ? [] : (doorLoops as string).split(', '),
          doorMechanism: (doorMechanism === undefined || doorMechanism === '') ? [] : (doorMechanism as string).split(', '),
          doorStopper: (doorStopper === undefined || doorStopper === '')? [] : (doorStopper as string).split(', '),
          doorSlidingSystem: (doorSlidingSystem === undefined || doorSlidingSystem === '')? [] : (doorSlidingSystem as string).split(', '),
          images: (images === undefined || images as unknown as string === '') ? [] : convertedImageNames,
          description: description === undefined ? '' : description,
          homePage: homePage === undefined || homePage === 'no' ? false : true,
          choosenImage: 0
        }

        await this.interiorDoorService.createOne(newInteriorDoor, {images: convertedImageFiles});
        break;
      case typeOfProduct === TypeOfProductEnum.entranceDoor:
        const newEntranceDoor: CreateEntranceDoorDto = {
          name,
          productProducerName: productProducerName === undefined || productProducerName === 'null' ? null : productProducerName,
          typeOfProductName: typeOfProduct,
          country,
          guarantee,
          price,
          inStock,
          fabricMaterialThickness,
          frameMaterialThickness,
          doorInsulation: doorInsulation === undefined ? [] : (doorInsulation as string).split(', '),
          covering: covering === undefined ? [] : (covering as string).split(', '),
          doorPeephole: doorPeephole === undefined || homePage === 'no' ? false : true,
          openingType: openingType === undefined ? [] : (openingType as string).split(', '),
          size: size === undefined ? [] : (size as string).split(', '),
          lowerLock: lowerLock === undefined ? [] : (lowerLock as string).split(', '),
          upperLock: upperLock === undefined ? [] : (upperLock as string).split(', '),
          weight: weight === undefined ? [] : (weight as string).split(', '),
          metalThickness,
          frameMaterialConstruction: frameMaterialConstruction === undefined ? [] : (frameMaterialConstruction as string).split(', '),
          sealerCircuit: sealerCircuit === undefined ? [] : (sealerCircuit as string).split(', '),
          doorHand: doorHand === undefined ? [] : (doorHand as string).split(', '),
          images: images === undefined ? [] : convertedImageNames,
          description: description === undefined ? '' : description,
          homePage: homePage === undefined || homePage === 'no' ? false : true,
          choosenImage: 0
        }
        await this.entranceDoorService.createOne(newEntranceDoor, {images: convertedImageFiles});
        break;
      case typeOfProduct === TypeOfProductEnum.windows:
        const newWindow: CreateWindowDto = {
          name,
          productProducerName: productProducerName === undefined || productProducerName === 'null' ? null : productProducerName,
          typeOfProductName: typeOfProduct,
          country,
          guarantee,
          price,
          inStock,
          mosquitoNet: mosquitoNet === undefined ? [] : (mosquitoNet as string).split(', '),
          windowSill: windowSill === undefined ? [] : (windowSill as string).split(', '),
          windowEbb: windowEbb === undefined ? [] : (windowEbb as string).split(', '),
          windowHand: windowHand === undefined ? [] : (windowHand as string).split(', '),
          childLock: childLock === undefined ? [] : (childLock as string).split(', '),
          housewifeStub: housewifeStub === undefined ? [] : (housewifeStub as string).split(', '),
          glassPocketAdd: glassPocketAdd === undefined ? [] : (glassPocketAdd as string).split(', '),
          lamination: lamination === undefined ? [] : (lamination as string).split(', '),
          profile: profile === undefined ? [] : (profile as string).split(', '),
          windowWidth,
          windowHeight,
          camerasCount: camerasCount === undefined ? [] : (camerasCount as string).split(', '),
          features: features === undefined ? [] : (features as string).split(', '),
          sectionCount: sectionCount === undefined ? [] : (sectionCount as string).split(', '),
          images: images === undefined ? [] : convertedImageNames,
          description: description === undefined ? '' : description,
          homePage: homePage === undefined || homePage === 'no' ? false : true,
          choosenImage: 0
        }
        await this.windowService.createOne(newWindow, {images: convertedImageFiles});
        break;
      case typeOfProduct === TypeOfProductEnum.furniture:
        const newFurniture: CreateFurnitureDto = {
          name, 
          country,
          productProducerName,
          typeOfProductName: typeOfProduct,
          price,
          guarantee,
          inStock,
          images: images === undefined ? [] : convertedImageNames,
          description: description === undefined ? '' : description,
          homePage: homePage === undefined || homePage === 'no' ? false : true,
          choosenImage: 0
        }
       await this.furnitureService.createOne(newFurniture, {images: convertedImageFiles})
       break;
    }
    
  }

  private getImagesForCurentRow(images: Array<Express.Multer.File>, imageNames: string[]): [imageNames: string[], images: Array<Express.Multer.File>]{
    if((imageNames !== undefined || imageNames.length !== 0) && images !== undefined){
      
      this.imagesPathesUpload = images
      .filter(file => imageNames.includes(file.filename.split('-')[2]))
      .map(file => file.path);

      this.imagesFilesUpload = images.filter((file) => imageNames.includes(file.filename.split('-')[2]));

    }
  
    return [this.imagesPathesUpload, this.imagesFilesUpload]
  }



  public resetRowCounter(): void{
    this.rowCounter = 1;
  }

  private resetImagesArrs(): void{
    this.imagesFilesUpload = [];
    this.imagesPathesUpload = [];
  }
}
