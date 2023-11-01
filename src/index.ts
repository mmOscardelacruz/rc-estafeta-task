
import { botonPanicoReportCron, speedLockReportCron, velocidadMayor120ReportCron, velocidadMayor80ReportCron,  } from './crons';
// import { botonPanicoReportCron } from './crons';
botonPanicoReportCron.start();
velocidadMayor80ReportCron.start();
velocidadMayor120ReportCron.start();
// entrandoGeocercaReportCron.start();
// saliendoGeocercaReportCron.start();
speedLockReportCron.start();