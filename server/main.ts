import express from 'express';
import cors from 'cors';
import analyticsApi from './endpoints/endpoints';
import axios from 'axios';

const portNumber = 9000;

const app = express();

app.use(cors());
app.options('*', cors());

for (const [key, rep] of analyticsApi) {
  app.get('/' + key, rep);
}

app.listen(portNumber, () => {
  console.log('server ready! Port: ' + portNumber);
});

async function fetch(target: string): Promise<string[]> {
  const resp = await axios.get('http://localhost:' + portNumber + '/' + target);
  return resp.data;
}

const baseTables: Map<string, string[]> = new Map();

async function fetchAndPopulateBaseTables() {
  try {
    baseTables.set('years', await fetch('getYears'));
    baseTables.set('months', [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ]);
    baseTables.set('tools', await fetch('getTools'));
    baseTables.set('actions', await fetch('getActions'));
    baseTables.set('osTypes', await fetch('getOsTypes'));
    baseTables.set('countries', await fetch('getCountries'));
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors as needed
  }
}

// Call the function to populate baseTables when the application starts
fetchAndPopulateBaseTables();

const currentYear = 2023;

export { baseTables, currentYear };
