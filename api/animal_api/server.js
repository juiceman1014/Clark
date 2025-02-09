const { SceHTTPServer } = require ('../util/SceHttpServer');

function main() {
  const API_ENDPOINTS = [
    __dirname + '/routers/Animal.js',
  ];
  const animalServer = new SceHttpServer(API_ENDPOINTS, 8084, '/animal_api/');
  animalServer.initializeEndpoints().then(() => {
    animalServer.openConnection();
  });
}

main();

