

export const updateImage = (obj: any, file: Express.Multer.File[] | undefined, fieldname: string) => {

  if(file === undefined){
    return obj[fieldname];
  }

  if(obj[file[0].fieldname] === null && file !== undefined){
    return file[0].path;
  } 
  if(obj[file[0].fieldname] !== null && file !== undefined){
    return file[0].path;
  } 

  return obj[file[0].fieldname];
    
}