import Bluebird from "bluebird";
import GeotabService from "./GeotabService";
import { BotonPanicoInterface } from "../interfaces/BotonPanicoInterface";
import { EstafetaInfo } from "../interfaces/EstafetaInfo";


export default class PosicionamientoService{

  constructor(
    private geotabService: GeotabService
    
    ){}
  
    async getData(): Promise<any>{
      try{ 
        const devices = await this.geotabService.getDevicesAux();
        const devicesGroupValid = devices.filter(x => x.groups.find(x => x.id === 'b2C3B'));

        const result = await Bluebird.map(
          devicesGroupValid, async device => {
            const deviceId = device.id;
            
            const placa = device.licensePlate.replace(/[-\s]/g, '');
            const numeroSerial = device.serialNumber;
            const fromDate = device.activeFrom;
            const toDate = device.activeTo;
            // const { licensePlate:placa, serialNumber:numeroSerial } = deviceArr[0];
            // const placaFormat = placa.replace(/[-\s]/g, '');

            // const fromDate = event.activeFrom;
            // const toDate = event.activeTo;
            
            const statusInfo = await this.geotabService.getDeviceStatusInfoParams(deviceId);
            const { speed:velocidad, longitude:longitud, latitude:latitud, dateTime:dateTime } = statusInfo[0];

            // const logRecordDevice = await this.geotabService.getLogRecord(fromDate, fromDate, deviceId);
            // const { speed:velocidad, longitude:longitud, latitude:latitud } = logRecordDevice[0];
            
            
            const direcciones = await this.geotabService.getAddresses(longitud,latitud);
           
            const temperatura = await this.geotabService.getStatusData(dateTime, dateTime, 'DiagnosticEngineCoolantTemperatureId', deviceId); 
            const { data:dataTemperatura } = temperatura[0];
           
            const ignicionArr = await this.geotabService.getStatusData(dateTime, dateTime, 'DiagnosticIgnitionId', deviceId);
            const { data:dataIgnicion } = ignicionArr[0];
            
            const odometroArr = await this.geotabService.getStatusData(dateTime, dateTime, 'DiagnosticOdometerId', deviceId);
            const { data:dataOdometro } = odometroArr[0];
            
            const ignicion = dataIgnicion === 1 ? true : false;

            const res: EstafetaInfo = {
              altitude: 0,
              asset: placa,
              battery: 0,
              code: '',
              course: 0,
              customerid: '',
              customername: '',
              date: dateTime,
              direction: direcciones,
              humidity: 0,
              ignition: ignicion,
              latitude: latitud,
              longitude: longitud,
              odometer: dataOdometro,
              serialNumber: numeroSerial,
              shipment: '',
              speed: velocidad,
              temperature: dataTemperatura,
              vehicleType: '',
              vehicleBrand: '',
              vehicleModel: '',            
            };


            return res;


          }, { concurrency: 20 }
        ).filter(x => typeof x !== 'undefined');

        return result;
      }
      catch(error){
        console.log(error);
      }
    }



}