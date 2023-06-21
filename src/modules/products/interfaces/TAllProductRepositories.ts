import { EntranceDoorEntity } from "../entrance-door/entrance-door.entity";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { InteriorDoorEntity } from "../interior-door/interior-door.entity";
import { WindowEntity } from "../window/window.entity";
import { IProduct } from "./IProduct";

export type TAllProductRepositories = (EntranceDoorEntity | FurnitureEntity | InteriorDoorEntity | WindowEntity | IProduct)[]