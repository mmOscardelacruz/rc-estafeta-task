import config from './config';
import GeotabService from './services/GeotabService';
import BotonPanicoReportService from './services/BotonPanicoService';
import EstafetaService from './services/EstafetaService';
import VelocidadMayor80ReportService from './services/VelocidadMayor80Service';
import VelocidadMayor120ReportService from './services/VelocidadMayor120Service';
import EntrandoGeocercaReportService from './services/EntrandoGeocercaService';
import SpeedLockReportService from './services/SpeedLockService';
import SaliendoGeocercaReportService from './services/SaliendoGeocercaService';
import { DateTime } from "luxon";
import PosicionamientoService from './services/PosicionamientoService';

const toDate = DateTime.now().toUTC().toISO();
const fromDate = DateTime.now().minus({ minutes: 5 }).toUTC().toISO();



export const botonPanicoController = async () => {
  const estafetaService = new EstafetaService();
  // await estafetaService.getToken();
  
  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const botonPanicoReportService = new BotonPanicoReportService(geotabService);
  const reportEvents = await botonPanicoReportService.getData();
  await estafetaService.sendBotonPanico(reportEvents)
};

export const velocidadMayor80Controller = async () => {
  const estafetaService = new EstafetaService();
  // await estafetaService.getToken();
  
  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const velocidadMayor80ReportService = new VelocidadMayor80ReportService(geotabService);
  const reportEvents = await velocidadMayor80ReportService.getData();
  await estafetaService.sendVelocidadMayor80(reportEvents);
};

export const velocidadMayor120Controller = async () => {
  const estafetaService = new EstafetaService();
  // await estafetaService.getToken();
  
  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const velocidadMayor120ReportService = new VelocidadMayor120ReportService(geotabService);
  const reportEvents = await velocidadMayor120ReportService.getData();
  await estafetaService.sendVelocidadMayor120(reportEvents);
};

export const entrandoGeocercaController = async () => {
  const estafetaService = new EstafetaService();

  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const entrandoGeocercaService = new EntrandoGeocercaReportService(geotabService);
  const reportEvents = await entrandoGeocercaService.getData();
  await estafetaService.sendEntrandoGeocerca(reportEvents);
};

export const saliendoGeocercaController = async () => {
  const estafetaService = new EstafetaService();

  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const saliendoGeocercaService = new SaliendoGeocercaReportService(geotabService);
  const reportEvents = await saliendoGeocercaService.getData();
  await estafetaService.sendSaliendoGeocerca(reportEvents);
};

export const speedLockController = async () => {
  const estafetaService = new EstafetaService();

  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const speedLockService = new SpeedLockReportService(geotabService);
  const reportEvents = await speedLockService.getData();
  await estafetaService.sendSpeedLock(reportEvents);
};

export const posicionamientoController = async () => {
  const estafetaService = new EstafetaService();

  const { goDatabase, goPassword, goServer, goUsername } = config.geotab;

  const geotabService = new GeotabService(goUsername, goPassword, goDatabase, goServer);

  const posicionamientoService = new PosicionamientoService(geotabService);
  const reportEvents = await posicionamientoService.getData();
  await estafetaService.sendPosicionamiento(reportEvents);
};