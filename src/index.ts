import { server } from "./server";

server.listen(getPort(1000), () => {
  //   logger.info('Server is up on port ' + port)
  console.info(`server is up at ${getPort(1000)} `);
});

function getPort(port: number): number {
  const port1 = process.env.PORT;
  if (port1) return Number(port1);
  return port;
}
