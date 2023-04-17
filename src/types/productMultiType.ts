import { IProduct } from "src/modules/products/interfaces/IProduct";
import { EntranceDoorEntity } from "src/modules/products/entrance-door/entrance-door.entity";
import { FurnitureEntity } from "src/modules/products/furniture/furniture.entity";
import { InteriorDoorEntity } from "src/modules/products/interior-door/interior-door.entity";
import { WindowEntity } from "src/modules/products/window/window.entity";

export type productMultiType = 
EntranceDoorEntity |
InteriorDoorEntity |
WindowEntity |
FurnitureEntity| 
IProduct;