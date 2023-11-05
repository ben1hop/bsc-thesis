import { RequestHandler } from 'express';
import pool from '../connection';
import { baseTables } from '../main';
import { loadTotalThroughYear, loadTotalUsageByYear, realMonths } from '../dataparser';
import { ChartData } from '../types/types';

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

analyticsApi.set('totalUsageThroughYearPerTool', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageThroughYearPerTool;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(
          rows.map((value) => ({
            tool: value[fields[0].name],
            year: value[fields[1].name],
            month: value[fields[2].name],
            total: value[fields[3].name],
          }))
        );
      }
    }
  );
});

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

analyticsApi.set('totalUsageByCountries', async (req, res) => {
  pool.query(
    SELECT + 'TotalUsageByCountries;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      } else {
        res.send(
          rows.map((value) => ({
            country: value[fields[0].name],
            total: value[fields[1].name],
          }))
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
        res.send(
          rows.map((value) => ({
            OS: value[fields[0].name],
            total: value[fields[1].name],
          }))
        );
      }
    }
  );
});

export default analyticsApi;
