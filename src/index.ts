
import { botonPanicoReportCron, velocidadMayor120ReportCron, velocidadMayor80ReportCron, entrandoGeocercaReportCron,saliendoGeocercaReportCron } from './crons';
// import { saliendoGeocercaReportCron } from './crons';
botonPanicoReportCron.start();
velocidadMayor80ReportCron.start();
velocidadMayor120ReportCron.start();
entrandoGeocercaReportCron.start();
saliendoGeocercaReportCron.start();
// speedLockReportCron.start();