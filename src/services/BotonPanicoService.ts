
import Bluebird from "bluebird";
import GeotabService from "./GeotabService";
import { createAddress } from "./CreateAddressService";
import { GetAddressInterface } from "../interfaces/Geotab/GetAddressInterface";
import { EstafetaInfo } from "../interfaces/EstafetaInfo";
import { DateTime } from "luxon";
import { BotonPanicoInterface } from "../interfaces/BotonPanicoInterface";

  const toDate = DateTime.now().toUTC().toISO();
  const fromDate = DateTime.now().minus({ minutes: 5 }).toUTC().toISO();

export default class BotonPanicoReportService{

  constructor(
    private geotabService: GeotabService,
    // private createAddressFn: typeof createAddress
    ){}
  
    


  async getData(): Promise<any[]>{
    try{

      const devices = await this.geotabService.getDevicesAux();
      const devicesGroupValid = devices.filter(x => x.groups.find(x => x.id === 'b2C3B'));

      //toDate fecha actual y fromDate fecha actual menos 5 minutos?
      // const events = await this.geotabService.getExceptions("2023-01-24T12:16:44.063Z", "2023-10-24T15:16:44.063Z", "aGr6idtjrlkWWb6UrqPocQg");
      // const events = await this.geotabService.getExceptions("2023-09-21T22:13:20.063Z", "2023-09-21T22:13:20.063Z", "aGr6idtjrlkWWb6UrqPocQg");
      //prueba con libreria luxon
      const events = await this.geotabService.getExceptions(`${fromDate}`, `${toDate}`, "aGr6idtjrlkWWb6UrqPocQg");

      

      const result = await Bluebird.map(
        events, async event => {
          const matching = devicesGroupValid.find(x => x.id === event.device.id);
          if (!matching) {
            return;
          }
          const deviceId = event.device.id;
          
          const deviceArr = await this.geotabService.getDevices(deviceId);
          
          
          const { licensePlate:placa, serialNumber:numeroSerial } = deviceArr[0];
          const placaFormat = placa.replace(/[-\s]/g, '');
          const fromDate = event.activeFrom;
          const toDate = event.activeTo;
          // console.log(fromDate,toDate);
          const logRecordDevice = await this.geotabService.getLogRecord(fromDate, fromDate, deviceId);
          const { speed:velocidad, longitude:longitud, latitude:latitud } = logRecordDevice[0];
          
          
          const direcciones = await this.geotabService.getAddresses(longitud,latitud);
         
          const temperatura = await this.geotabService.getStatusData(fromDate, fromDate, 'DiagnosticEngineCoolantTemperatureId', deviceId); 
          const { data:dataTemperatura } = temperatura[0];
         
          const ignicionArr = await this.geotabService.getStatusData(fromDate, fromDate, 'DiagnosticIgnitionId', deviceId);
          const { data:dataIgnicion } = ignicionArr[0];
          
          const odometroArr = await this.geotabService.getStatusData(fromDate, fromDate, 'DiagnosticOdometerId', deviceId);
          const { data:dataOdometro } = odometroArr[0];
          
          const ignicion = dataIgnicion === 1 ? true : false;

          const res: BotonPanicoInterface = {
            altitude: 0,
            asset: placaFormat,
            battery: 0,
            code: 'aGr6idtjrlkWWb6UrqPocQg',
            course: 0,
            customerid: '',
            customername: '',
            date: fromDate,
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
          // console.log(res);
          return res;
          
          
          
        },
        { concurrency: 20 }
      ).filter(x => typeof x !== 'undefined');

      return result;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }


}