import "reflect-metadata";

import { Server } from "mioc-express";
import { Container } from "mioc-core";

import { HelloController } from "./hello.controller";
import { User, QHome, QAddress, Address, Home } from "./users";

const container = new Container();
container.register({ target: Home, implementation: QHome });
container.register({ target: Address, implementation: QAddress });
container.register(User);
const server = new Server(container);

// register list of controller
server.register([
  HelloController
]);

const app = server.build();

const port = +(process.env.PORT || 9999);
app.listen(port, () => {
  console.log(`Server listening ${port}`);
});