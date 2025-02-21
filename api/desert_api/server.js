const { SceHttpServer } = require ('../util/SceHttpServer');

function main() {
  const API_ENDPOINTS = [
    __dirname + '/routes/Desert.js',
  ];
  const desertServer = new SceHttpServer(API_ENDPOINTS, 8084, '/desert_api/');
  desertServer.initializeEndpoints().then(() => {
    desertServer.openConnection();
  });
}

main();

