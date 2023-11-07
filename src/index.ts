
import { botonPanicoReportCron, velocidadMayor120ReportCron, velocidadMayor80ReportCron, entrandoGeocercaReportCron,saliendoGeocercaReportCron, posicionamientoReportCron,speedLockReportCron } from './crons';
// import { posicionamientoReportCron } from './crons';
botonPanicoReportCron.start();
velocidadMayor80ReportCron.start();
velocidadMayor120ReportCron.start();
entrandoGeocercaReportCron.start();
saliendoGeocercaReportCron.start();
speedLockReportCron.start();
posicionamientoReportCron.start();