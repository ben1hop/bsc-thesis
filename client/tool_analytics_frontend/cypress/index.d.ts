/// <reference types="cypress" />

// import {
//   CloudFormationClientService,
//   IotWirelessClientService,
//   MQTTClientService,
// } from 'src/services/types';

declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
  }
  interface ApplicationWindow {}
}
