// import { HttpException } from "@nestjs/common";
// import { Request } from "express";
// import fs from 'fs';

// export const saveImages = (req: Request) => {
//   if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT') {
//     // Check if the request is a POST request

//     const imageData = []; // Array to store image data



//     req.on('files', (chunk) => {
//       // Accumulate image data
//       console.log(chunk);
//       imageData.push(chunk);
//     });

//     req.on('end', () => {
//       // Save each image data to a file
//       imageData.forEach((chunk, index) => {
//         fs.writeFile(`image_${index}.jpg`, chunk, (err) => {
//           if (err) {
//             console.error(`Error saving image_${index}.jpg:`, err);
//             throw new HttpException(`Error saving image_${index}.jpg`, 500)
//           }

//           console.log(`image_${index}.jpg saved successfully`);
//         });
//       });
//     });
//   } else {
//     return req.res.status(400).json('bad request');
//   }
// }