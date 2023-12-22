import { RequestHandler } from 'express';
import pool from '../connection';
import { baseTables, currentYear } from '../main';
import {
  loadCompareTableData,
  loadPerToolAction,
  loadPerToolTimeSpan,
  loadPerToolYearlyByQuarter,
  loadTotalThroughYear,
  loadTotalThroughYearPerTool,
  loadTotalUsageByAction,
  loadTotalUsageByCountries,
  loadTotalUsageByOs,
  loadTotalUsageByYear,
  loadTotalUsageTimeSpan,
  loadWeightedTotalUsageByOs,
  realMonths,
} from '../dataparser';
import { ChartData, MapData } from '../types/types';

export const analyticsApi: Map<string, RequestHandler> = new Map();

const SELECT = 'SELECT * FROM ';

analyticsApi.set('/', async (req, res) => {
  res.send('Server is up and running.');
});

analyticsApi.set('getUtilsInfo', async (req, res) => {
  pool.query(
    'SELECT count(*), min(actionTime) FROM `bsc-dev-db`.EventLog;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(
          rows.map((value) => ({
            totalEvents: value[fields[0].name],
            firstEvent: value[fields[1].name],
          }))
        );
      }
    }
  );
});

analyticsApi.set('getYears', async (req, res) => {
  pool.query(
    SELECT + 'Years;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(rows.map((value) => value[fields[0].name]));
      }
    }
  );
});

analyticsApi.set('getTools', async (req, res) => {
  pool.query(
    SELECT + 'Tools;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(rows.map((value) => value[fields[0].name]));
      }
    }
  );
});

analyticsApi.set('getOsTypes', async (req, res) => {
  pool.query(
    SELECT + 'OSTypes;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(rows.map((value) => value[fields[0].name]));
      }
    }
  );
});

analyticsApi.set('getCountries', async (req, res) => {
  pool.query(
    SELECT + 'Countries;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(rows.map((value) => value[fields[0].name]));
      }
    }
  );
});

analyticsApi.set('getActions', async (req, res) => {
  pool.query(
    SELECT + 'Actions;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(rows.map((value) => value[fields[0].name]));
      }
    }
  );
});

// ---------------------- end of base tables ----------------------------------

analyticsApi.set('totalUsageByYear', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByYear;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalUsageByYear(
          rows.map((value) => ({
            tool: value[fields[0].name],
            year: value[fields[1].name],
            total: value[fields[2].name],
          })),
          baseTables.get('years').map((x: string) => Number(x))
        );
        res.send(new ChartData(baseTables.get('tools'), datasets));
      }
    }
  );
});

analyticsApi.set('totalUsageThroughYear', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageThroughYear;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalThroughYear(
          rows.map((value) => ({
            year: value[fields[0].name],
            month: value[fields[1].name],
            total: value[fields[2].name],
          })),
          baseTables.get('years').map((x: string) => Number(x))
        );
        res.send(new ChartData(realMonths(), datasets));
      }
    }
  );
});

analyticsApi.set('totalUsageByAction', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByAction;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalUsageByAction(
          rows.map((value) => ({
            action: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(new ChartData(baseTables.get('actions'), datasets));
      }
    }
  );
});

analyticsApi.set('totalUsageTimeSpan', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageTimeSpan',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalUsageTimeSpan(
          rows.map((value) => ({
            hour: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(
          new ChartData(
            [
              '0:00',
              '1:00',
              '2:00',
              '3:00',
              '4:00',
              '5:00',
              '6:00',
              '7:00',
              '8:00',
              '9:00',
              '10:00',
              '11:00',
              '12:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
              '18:00',
              '19:00',
              '20:00',
              '21:00',
              '22:00',
              '23:00',
            ],
            datasets
          )
        );
      }
    }
  );
});

analyticsApi.set('totalUsageByOS', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByOS;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalUsageByOs(
          rows.map((value) => ({
            OS: value[fields[0].name],
            total: value[fields[1].name],
          })),
          baseTables.get('osTypes')
        );
        res.send(new ChartData(baseTables.get('osTypes'), datasets));
      }
    }
  );
});

analyticsApi.set('weightedUsageByOS', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByOS;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadWeightedTotalUsageByOs(
          rows.map((value) => ({
            OS: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(new ChartData(['Windows', 'Mac', 'Linux'], datasets));
      }
    }
  );
});

analyticsApi.set('totalUsageByRegion', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByRegion;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const datasets = loadTotalUsageByCountries(
          rows.map((value) => ({
            country: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(new MapData(datasets));
      }
    }
  );
});

// analyticsApi.set('totalUsageQuarterly', async (req, res) => {
//   pool.query(
//     SELECT + 'TotalUsageThroughYear',
//     (err: any, rows: any[], fields: { name: string | number }[]) => {
//       if (err) {
//         throw err;
//       } else {
//         const datasets = loadTotalThroughYear(
//           rows.map((value) => ({
//             year: value[fields[0].name],
//             month: value[fields[1].name],
//             total: value[fields[2].name],
//           })),
//           baseTables.get('years').map((x: string) => Number(x))
//         );
//         res.send(new ChartData(realMonths(), datasets));
//       }
//     }
//   );
// });

// analyticsApi.set('totalUsageThroughYearPerTool', async (req, res) => {
//   pool.query(
//     SELECT + 'TotalUsageThroughYearPerTool;',
//     (err: any, rows: any[], fields: { name: string | number }[]) => {
//       if (err) {
//         throw err;
//       } else {
//         const datasets = loadTotalThroughYearPerTool(
//           rows.map((value) => ({
//             tool: value[fields[0].name],
//             year: value[fields[1].name],
//             month: value[fields[2].name],
//             total: value[fields[3].name],
//           }),
//           baseTables.get()
//         )
//         res.send(

//         );
//       }
//     }
//   );
// });

analyticsApi.set('uniqueUsers', async (req, res) => {
  pool.query(
    SELECT + 'UniqueUsers;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(
          rows.map((value) => ({
            tool: value[fields[0].name],
            year: value[fields[1].name],
            month: value[fields[2].name],
            user: value[fields[3].name],
          }))
        );
      }
    }
  );
});

// -------------------------- total charts

analyticsApi.set('currentTool', async (req, res) => {
  pool.query(
    'SELECT * FROM `bsc-dev-db`.TotalUsageByYear where year = ' +
      currentYear +
      ' or year = ' +
      (currentYear - 1) +
      ';',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send();
      }
    }
  );
});

// ----- info apis
analyticsApi.set('currentTool', async (req, res) => {
  pool.query(
    'SELECT * FROM `bsc-dev-db`.TotalUsageByYear where year = ' +
      currentYear +
      ' or year = ' +
      (currentYear - 1) +
      ';',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const response = rows.map((value) => ({
          tool: value[fields[0].name],
          year: value[fields[1].name],
          total: value[fields[2].name],
        }));

        const value = response.reduce(
          (max, current) =>
            current.total > max.total && current.year === currentYear
              ? current
              : max,
          response[0]
        );

        const trend =
          response.find(
            (x: { tool: any; year: any; total: any }) =>
              x.tool === value.tool && x.year === currentYear - 1
          ).total < value.total
            ? 1
            : -1;

        res.send({ name: value.tool, value: value.total, trend: trend });
      }
    }
  );
});

analyticsApi.set('currentTraffic', async (req, res) => {
  const currentYear =
    baseTables.get('years')[baseTables.get('years').length - 1];
  pool.query(
    'SELECT year, SUM(total) as total FROM `bsc-dev-db`.TotalUsageThroughYear \
    where year = ' +
      Number(currentYear) +
      ' or year = ' +
      (Number(currentYear) - 1) +
      ' group by year order by year;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const response = rows.map((value) => ({
          year: value[fields[0].name],
          total: value[fields[1].name],
        }));
        res.send({
          name: response[1].year,
          value: response[1].total,
          trend: response[1].total > response[0].total ? 1 : -1,
        });
      }
    }
  );
});

analyticsApi.set('currentOs', async (req, res) => {
  pool.query(
    'SELECT * from TotalUsageByOS_Year where year = ' +
      currentYear +
      ' order by total desc;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const response = rows.map((value) => ({
          computerOS: value[fields[0].name],
          year: value[fields[1].name],
          total: value[fields[2].name],
        }));
        const mostOS = response[0];
        pool.query(
          'SELECT * from TotalUsageByOS_Year where year = ' +
            currentYear +
            ' and computerOS = "' +
            mostOS.computerOS +
            '" order by total desc;',
          (err: any, rows: any[], fields: { name: string | number }[]) => {
            if (err) {
              throw err;
            } else {
              const next_response = rows.map((value) => ({
                country: value[fields[0].name],
                total: value[fields[1].name],
              }));
              res.send({
                name: mostOS.computerOS,
                value: mostOS.total,
                trend: mostOS.total > next_response[0].total ? 1 : -1,
              });
            }
          }
        );
      }
    }
  );
});

analyticsApi.set('currentLocation', async (req, res) => {
  pool.query(
    'SELECT country , sum(total) as total FROM `bsc-dev-db`.TotalUsageByCountries where year = ' +
      currentYear +
      ' group by country order by total desc;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const response = rows.map((value) => ({
          country: value[fields[0].name],
          total: value[fields[1].name],
        }));
        const mostCountry = response[0];
        pool.query(
          'SELECT country , sum(total) as total FROM `bsc-dev-db`.TotalUsageByCountries where year = ' +
            (currentYear - 1) +
            " and country = '" +
            mostCountry.country +
            "' group by country order by total desc;",
          (err: any, rows: any[], fields: { name: string | number }[]) => {
            if (err) {
              throw err;
            } else {
              const next_response = rows.map((value) => ({
                country: value[fields[0].name],
                total: value[fields[1].name],
              }));
              res.send({
                name: mostCountry.country,
                value: mostCountry.total,
                trend: mostCountry.total > next_response[0].total ? 1 : -1,
              });
            }
          }
        );
      }
    }
  );
});

// -------------------------- per tool  charts
analyticsApi.set('perToolYearly', async (req, res) => {
  pool.query(
    ((SELECT +
      'PerToolYearlyWithQuarter where tool = "' +
      req.query.tool) as string) + '";',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        // Params are under req.query not req.params!!
        const datasets = loadPerToolYearlyByQuarter(
          rows.map((value) => ({
            tool: value[fields[0].name],
            year: value[fields[1].name],
            quarter: value[fields[2].name],
            total: value[fields[3].name],
          })),
          baseTables.get('years').map((x: string) => Number(x))
        );
        res.send(new ChartData(baseTables.get('years'), datasets));
      }
    }
  );
});

analyticsApi.set('perToolActions', async (req, res) => {
  pool.query(
    (('SELECT action, count(id) as total FROM `bsc-dev-db`.EventLog where result = "' +
      req.query.tool) as string) + '" group by action;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        // Params are under req.query not req.params!!
        const datasets = loadPerToolAction(
          rows.map((value) => ({
            action: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(new ChartData(baseTables.get('actions'), datasets));
      }
    }
  );
});

analyticsApi.set('perToolTimeSpan', async (req, res) => {
  pool.query(
    (('SELECT hour(actionTime) as hour, count(id) as total FROM `bsc-dev-db`.EventLog where result = "' +
      req.query.tool) as string) + '" group by hour(actionTime) order by hour',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        // Params are under req.query not req.params!!
        const datasets = loadPerToolTimeSpan(
          rows.map((value) => ({
            hour: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
        res.send(
          new ChartData(
            [
              '0:00',
              '1:00',
              '2:00',
              '3:00',
              '4:00',
              '5:00',
              '6:00',
              '7:00',
              '8:00',
              '9:00',
              '10:00',
              '11:00',
            ],
            datasets
          )
        );
      }
    }
  );
});

analyticsApi.set('perToolCountries', async (req, res) => {
  pool.query(
    ((SELECT + 'PerToolRegion where tool = "' + req.query.tool) as string) +
      '";',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        // Params are under req.query not req.params!!
        const datasets = loadTotalUsageByCountries(
          rows.map((value) => ({
            tool: value[fields[0].name],
            country: value[fields[1].name],
            total: value[fields[2].name],
          }))
        );
        res.send(new MapData(datasets));
      }
    }
  );
});

analyticsApi.set('getCompareTables', async (req, res) => {
  pool.query(
    SELECT + 'CompareTables',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        // Params are under req.query not req.params!!
        const datasets = loadCompareTableData(
          rows.map((value) => ({
            tool: value[fields[0].name],
            year: value[fields[1].name],
            total: value[fields[2].name],
            first: value[fields[3].name],
          })),
          baseTables.get('tools')
        );
        res.send(new MapData(datasets));
      }
    }
  );
});

export default analyticsApi;
