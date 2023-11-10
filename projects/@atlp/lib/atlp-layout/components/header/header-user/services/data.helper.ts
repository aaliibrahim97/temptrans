import {HttpHeaders} from '@angular/common/http';

export const createDescriptorHeader:(descriptor:any)=> HttpHeaders =(descriptor)=>{
  return new HttpHeaders().set('x-descriptor', JSON.stringify(
      descriptor
    ));
};
