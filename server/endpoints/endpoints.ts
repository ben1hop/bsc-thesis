import { RequestHandler } from 'express';
import pool from '../connection';
import { baseTables, currentYear } from '../main';
import {
  loadTotalThroughYear,
  loadTotalThroughYearPerTool,
  loadTotalUsageByAction,
  loadTotalUsageByCountries,
  loadTotalUsageByOs,
  loadTotalUsageByYear,
  loadWeightedTotalUsageByOs,
  realMonths,
} from '../dataparser';
import { ChartData, MapData } from '../types/types';

export const analyticsApi: Map<string, RequestHandler> = new Map();

const SELECT = 'SELECT * FROM ';

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
  pool.query(
    'SELECT year, SUM(total) as total FROM `bsc-dev-db`.TotalUsageThroughYear group by year;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        const response = rows.map((value) => ({
          year: value[fields[0].name],
          total: value[fields[1].name],
        }));
        const currYearData = response.find((x) => x.year === currentYear);
        const lastYearData = response.find((x) => x.year === currentYear - 1);
        res.send({
          name: currYearData.year,
          value: currYearData.total,
          trend: currYearData.total > lastYearData.total ? 1 : -1,
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

export default analyticsApi;
