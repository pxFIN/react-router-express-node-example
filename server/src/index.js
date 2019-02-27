import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import proxy from "http-proxy-middleware";

import models, { sequelize } from "./models";
import routes from "./routes";

// proxy middleware options
var options = {
  target:
    "https://www.oulunliikenne.fi/public_traffic_api/parking/parking_details.php?parkingid=2", // target host
  changeOrigin: true,
  ws: true,
  secure: false,
  logLevel: "debug",
  pathRewrite: {
    "/api": ""
  }
};

// create the proxy (without context)
const exampleProxy = proxy(options);

const app = express();

// Application-Level Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("test")
  };
  next();
});

// Routes
app.use("/api", exampleProxy);
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// Start
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "test",
      messages: [
        {
          text: "Push to PostgreSQL as text"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "test2",
      messages: [
        {
          text: "Testing #2"
        },
        {
          text: "Testing #3"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
