import { HttpHeaders } from '@angular/common/http';
import { DataDescriptor } from '../models/data-descriptor.model';

export const createDescriptorHeader: (descriptor: DataDescriptor, requestOptions: any) => HttpHeaders = (descriptor) => {
  return new HttpHeaders().set('x-descriptor', JSON.stringify(
    descriptor
  ));
};


export const createChargesHeader: (descriptor: any, isGroupingRequired: any, requestOptions: any) => HttpHeaders = (descriptor, isGroupingRequired) => {
  return new HttpHeaders().set('x-AwbCharges', JSON.stringify(
    descriptor
  )).set('isGroupingRequired', `${isGroupingRequired}`);
};


export const createChargesHeaderWithSlotTime: (descriptor: any, appointDate: any, slotTime: any,
  isGroupingRequired: any, premiumSlotsCount:any, requestOptions: any)
  => HttpHeaders = (descriptor, appointDate, slotTime, isGroupingRequired, premiumSlotsCount) => {
 
    let headers = new HttpHeaders();
    headers = headers.set('x-AwbCharges', JSON.stringify(descriptor))
      .set('appointmentDate', `${appointDate}`).set('slotTime', `${slotTime}`)
      .set('isGroupingRequired', `${isGroupingRequired}`)
      .set('premiumSlotsCount', `${premiumSlotsCount}`);
 
    return headers;
  };

export const createMetaDataHeader: (descriptor: DataDescriptor, requestOptions: any) => HttpHeaders = (descriptor) => {
  return new HttpHeaders().set('metaData', JSON.stringify(
    descriptor
  ));
};

export const paymentMethodAppointment: (descriptor, refId, renominatedAgent, appointmentDateTime, slotTime, paymentType, renominateName) =>
  HttpHeaders = (descriptor, refId, renominatedAgent, appointmentDate, slotTime, paymentType, renominateName) => {
    return new HttpHeaders().set('x-awbcharges', JSON.stringify(descriptor)).set(
      'refereneceNo', `${refId}`
    ).set('renominatedAgent', `${renominatedAgent}`)
      .set('appointmentDate', `${appointmentDate}`)
      .set('slotTime', `${slotTime}`).set('paymentType', `${paymentType}`)
      .set('renominateName', `${renominateName}`);
};

export const createPaymentTermsHeader: (descriptor: DataDescriptor, requestOptions: any) => HttpHeaders = (descriptor) => {
  return new HttpHeaders().set('isRenominated', descriptor.toString());
};

