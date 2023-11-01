export interface GetAddressInterface{
  city: string;
  country:string;
  formattedAddress: string;
  otherCity: string;
  postalCode: string;
  region: string;
  street:string;
  streetNumber:string;
  zones: zoneTypes[];
}

export interface zoneTypes{
  id:string;
}