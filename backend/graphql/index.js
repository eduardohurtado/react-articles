import express from "express";
import morgan from "morgan";
import path from "path";
import { graphqlHTTP } from "express-graphql";

//Squema
import schema from "./database/schema/schema";

//Database Conection
import "./database/database";

//Server
const app = express();

//Server Settings
app.set("port", process.env.PORT || 8080);

//Server Middlewares
app.use(morgan("dev")); //"dev" Is the bash window text format.
app.use(express.json()); //To understand Json format.

//Server API Routes
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageID: "Test.",
    },
  })
);

//Server Static Files
app.use("/", express.static(path.join(__dirname, "../../build")));

//Server Start
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${app.get("port")}`);
});
