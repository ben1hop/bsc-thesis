import { RequestHandler } from 'express';
import pool from './connection';

export const analyticsApi: Map<string, RequestHandler> = new Map();

const SELECT = 'SELECT * FROM analytics_dev';

analyticsApi.set('getYears', async (req, res) => {
  pool.query(
    SELECT + '.Years;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) {
        throw err;
      }
      res.send(rows.map((value) => value[fields[0].name]));
    }
  );
});

analyticsApi.set('getTools', async (req, res) => {
  pool.query(
    SELECT + '.Tools;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(rows.map((value) => value[fields[0].name]));
    }
  );
});

analyticsApi.set('getOsTypes', async (req, res) => {
  pool.query(
    SELECT + '.OSTypes;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(rows.map((value) => value[fields[0].name]));
    }
  );
});

analyticsApi.set('getCountries', async (req, res) => {
  pool.query(
    SELECT + '.Countries;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(rows.map((value) => value[fields[0].name]));
    }
  );
});

analyticsApi.set('totalUsageByYear', async (req, res) => {
  pool.query(
    SELECT + '.TotalUsageByYear;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          tool: value[fields[0].name],
          year: value[fields[1].name],
          total: value[fields[2].name],
        }))
      );
    }
  );
});

analyticsApi.set('totalUsageThroughYear', async (req, res) => {
  pool.query(
    SELECT + '.TotalUsageThroughYear;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          year: value[fields[0].name],
          month: value[fields[1].name],
          total: value[fields[2].name],
        }))
      );
    }
  );
});

analyticsApi.set('totalUsageThroughYearPerTool', async (req, res) => {
  pool.query(
    SELECT + '.TotalUsageThroughYearPerTool;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          tool: value[fields[0].name],
          year: value[fields[1].name],
          month: value[fields[2].name],
          total: value[fields[3].name],
        }))
      );
    }
  );
});

analyticsApi.set('uniqueUsers', async (req, res) => {
  pool.query(
    SELECT + '.UniqueUsers;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          tool: value[fields[0].name],
          year: value[fields[1].name],
          month: value[fields[2].name],
          user: value[fields[3].name],
        }))
      );
    }
  );
});

analyticsApi.set('totalUsageByCountries', async (req, res) => {
  pool.query(
    SELECT + '.TotalUsageByCountries;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          country: value[fields[0].name],
          total: value[fields[1].name],
        }))
      );
    }
  );
});

analyticsApi.set('totalUsageByOS', async (req, res) => {
  pool.query(
    SELECT + '.TotalUsageByOS;',
    (err: any, rows: any[], fields: { name: string | number }[]) => {
      if (err) throw err;
      res.send(
        rows.map((value) => ({
          OS: value[fields[0].name],
          total: value[fields[1].name],
        }))
      );
    }
  );
});

export default analyticsApi;