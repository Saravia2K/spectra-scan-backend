import { Registry, collectDefaultMetrics, Counter } from 'prom-client';
import { Histogram } from 'prom-client';

export const register = new Registry();
collectDefaultMetrics({ register });

export const userLoginsCounter = new Counter({
  name: 'user_logins_total',
  help: 'Número total de logins por rol',
  labelNames: ['role'],
});

register.registerMetric(userLoginsCounter);

export const autismTestCompletedCounter = new Counter({
  name: 'autism_test_completed_total',
  help: 'Número total de pruebas completadas por pacientes',
});

register.registerMetric(autismTestCompletedCounter);

export const autismTestResultsCounter = new Counter({
  name: 'autism_test_results_total',
  help: 'Distribución de niveles de autismo detectados',
  labelNames: ['level'],
});

register.registerMetric(autismTestResultsCounter);

export const autismTestDurationHistogram = new Histogram({
  name: 'autism_test_duration_seconds',
  help: 'Duración en segundos de las pruebas completadas',
  buckets: [10, 30, 60, 120, 180, 300, 600],
});

register.registerMetric(autismTestDurationHistogram);

export const autismTestStartedCounter = new Counter({
  name: 'autism_test_started_total',
  help: 'Total de tests asignados/iniciados a pacientes',
});
register.registerMetric(autismTestStartedCounter);
