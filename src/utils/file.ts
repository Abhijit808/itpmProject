export const  listAllFilesAndDirs:any=async(dirHandle:any)=> {
  const files:any = [];
//   for await (const [key, value] of dirHandle.entries()) {
  
//     if(value.kind === 'directory'){
//       files.push({value:value.kind,name:value.name})
//       await listAllFilesAndDirs(value);
//     }else{
//       // console.log(await value.getFile());
//       files.push({name:value.name,kind:value.kind})
//       // console.log();
      
//     }
    
//   }
for (const i of dirHandle) {
    console.log(dirHandle[i]);
    
}
//   // for await (let [name,handle] of dirHandle) {
//   //     const {kind} = handle;
//   //     let Name:string =""
//   //     if (handle.kind === 'directory') {
//   //         Name+=await name
//   //         files.push({ name,handle, kind});
//   //         files.push(await listAllFilesAndDirs(handle));
//   //     } else {
//   //       files.push({Name:Name, files:await handle.getFile(), kind});
//   //       Name="";
//   //     }
//   // }
  return files;
}