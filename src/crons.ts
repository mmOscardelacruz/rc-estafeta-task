import { CronJob } from 'cron';

import { botonPanicoController,
         entrandoGeocercaController,
         saliendoGeocercaController, 
         speedLockController, 
         velocidadMayor120Controller, 
         velocidadMayor80Controller 
        } from './app'
import config from './config';

const { cronExpression } = config.cron;
const { timeZone } = config;

export const botonPanicoReportCron = new CronJob(
  cronExpression,
  async () => {
    try {
      console.log('Running Boton Panico Cron');
      await botonPanicoController();
    } catch (error) {
      console.log(error);
      botonPanicoReportCron.stop();
    }
  },
  () => console.log('Boton Panico Cron Stopped'),
  true,
  timeZone,
);

export const velocidadMayor80ReportCron = new CronJob(
  cronExpression,
  async () => {
    try {
      console.log('Running Velocidad Mayor 80 Cron');
      await velocidadMayor80Controller();
    } catch (error) {
      console.log(error);
      velocidadMayor80ReportCron.stop();
    }
  }
);

export const velocidadMayor120ReportCron = new CronJob(
  cronExpression,
  async () => {
    try {
      console.log('Running Velocidad Mayor 120 Cron');
      await velocidadMayor120Controller();
    } catch (error) {
      console.log(error);
      velocidadMayor120ReportCron.stop();
    }
  }
);

// export const entrandoGeocercaReportCron = new CronJob(
//   cronExpression,
//   async () => {
//     try {
//       console.log('Running Entrando Geocerca Cron');
//       await entrandoGeocercaController();
//     } catch (error) {
//       console.log(error);
//       entrandoGeocercaReportCron.stop();
//     }
//   }
// );

// export const saliendoGeocercaReportCron = new CronJob(
//   cronExpression,
//   async () => {
//     try {
//       console.log('Running Saliendo Geocerca Cron');
//       await saliendoGeocercaController();
//     } catch (error) {
//       console.log(error);
//       saliendoGeocercaReportCron.stop();
//     }
//   }
// );

export const speedLockReportCron = new CronJob(
  cronExpression,
  async () => {
    try {
      console.log('Running Speed Lock Cron');
      await speedLockController();
    } catch (error) {
      console.log(error);
      speedLockReportCron.stop();
    }
  }
);