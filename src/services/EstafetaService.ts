
import config from "../config";
import { parseStringPromise } from "xml2js";

import HttpAdapter from "../utils/helpers/HttpAdapter";
import { EstafetaInfo } from "../interfaces/EstafetaInfo";
import NodeCache from "node-cache";
import { BotonPanicoInterface } from "../interfaces/BotonPanicoInterface";
import { VelocidaMayor80Interface } from "../interfaces/VelocidadMayor80Interface";
import { SpeedLockInterface } from "../interfaces/SpeedLockInterface";
import { EntrandoGeocercasInterface } from "../interfaces/EntrandoGeocercaInterface";
import { SaliendoGeocercaInterface } from "../interfaces/SaliendoGeocercaInterface";
const tokenCache = new NodeCache({ stdTTL: 86400 }); //Cache for 24 hours

const { estafetaUrl, estafetaUser, estafetaPassword } = config.sendingData;


export default class EstafetaService {
  private httpAdapter = new HttpAdapter();
  constructor() {
    this.httpAdapter = new HttpAdapter();
  }


  //Funcion para obtener el token de estafeta
  async getToken() {
    try{
    const cachedToken = tokenCache.get('token');
    if (cachedToken) {
      console.log('Cached token');
      return cachedToken;
    }

    const urlEstafeta = `${estafetaUrl}`;
    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IRCService/GetUserToken'
    }
    
    

    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GetUserToken>\n<tem:userId>user_avl_TTestafeta</tem:userId>\n<tem:password>SYmn*812cPIL_2</tem:password>\n</tem:GetUserToken>\n</soapenv:Body>\n</soapenv:Envelope>';
    const response = await this.httpAdapter.request({
      method: 'POST',
      url: urlEstafeta,
      headers,
      data: body
    })
    const xmlResponse = response.data;
    const parsedResponse = await parseStringPromise(xmlResponse);
    const token = parsedResponse['s:Envelope']['s:Body'][0]['GetUserTokenResponse'][0]['GetUserTokenResult'][0]['a:token'][0];
    tokenCache.set('token', token);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


  async sendEstafetaReport(data: EstafetaInfo[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      console.log(response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }


  //Funcion para enviar los datos de boton de panico
  async sendBotonPanico(data: BotonPanicoInterface[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      if(response.status === 200){
        console.log('Se envio correctamente el boton de panico');
      }
      // console.log('Boton Panico',response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }


  //Funcion para enviar los datos de velocidad mayor a 80
  async sendVelocidadMayor80(data: VelocidaMayor80Interface[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      if(response.status === 200){
        console.log('Se envio correctamente la velocidad mayor a 80');
      }
      // console.log('Valocidad Mayor 80',response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Funcion para enviar los datos de velocidad mayor a 120
  async sendVelocidadMayor120(data: EstafetaInfo[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      if(response.status === 200){
        console.log('Se envio correctamente la velocidad mayor a 120');
      }
      // console.log('Valocidad Mayor120',response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }


  //Funcion para enviar los datos de SpeedLock
  async sendSpeedLock(data: SpeedLockInterface[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      if(response.status === 200){
        console.log('Se envio correctamente el speed lock');
      }
      // console.log('SpeedLock',response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Funcion para enviar los datos de EntrandoGeocerca
  async sendEntrandoGeocerca(data: EntrandoGeocercasInterface[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      // console.log(response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }


  //Funcion para enviar los datos de SaliendoGeocerca
  async sendSaliendoGeocerca(data: SaliendoGeocercaInterface[]) {
    try{
      const urlEstafeta = `${estafetaUrl}`;
      const headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IRCService/GPSAssetTracking'
      }
      const token = await this.getToken();
      for (const res of data) {
      const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\nxmlns:tem="http://tempuri.org/"\nxmlns:iron="http://schemas.datacontract.org/2004/07/IronTracking">\n<soapenv:Header/>\n<soapenv:Body>\n<tem:GPSAssetTracking>\n<tem:token>${token}</tem:token>\n<tem:events>\n<iron:Event>\n<iron:altitude>${res.altitude}</iron:altitude>\n<iron:asset>${res.asset}</iron:asset>\n<iron:battery>${res.battery}</iron:battery>\n<iron:code>${res.code}</iron:code>\n<iron:course>${res.course}</iron:course>\n<iron:customer>\n<iron:id>${res.customerid}</iron:id>\n<iron:name>${res.customername}</iron:name>\n</iron:customer>\n<iron:date>${res.date}</iron:date>\n<iron:direction>${res.direction}</iron:direction>\n<iron:humidity>${res.humidity}</iron:humidity>\n<iron:ignition>${res.ignition}</iron:ignition>\n<iron:latitude>${res.latitude}</iron:latitude>\n<iron:longitude>${res.longitude}</iron:longitude>\n<iron:odometer>${res.odometer}</iron:odometer>\n<iron:serialNumber>${res.serialNumber}</iron:serialNumber>\n<iron:shipment>${res.shipment}</iron:shipment>\n<iron:speed>${res.speed}</iron:speed>\n<iron:temperature>${res.temperature}</iron:temperature>\n</iron:Event>\n</tem:events>\n</tem:GPSAssetTracking>\n</soapenv:Body>\n</soapenv:Envelope>`;
      const response = await this.httpAdapter.request({
        method: 'POST',
        url: urlEstafeta,
        headers,
        data: body
      })
      // console.log(response.data);
    }
    }catch (error) {
      console.error(error);
      throw error;
    }
  }



}