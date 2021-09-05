const express = require("express");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Fingerprint = require("express-fingerprint");
const path = require("path");

const app = express();

// dùng để phân biệt mac,windown,hay ubuntu, và đang dùng trình duyệt(Chorme,CocCoc) gì
app.use(Fingerprint());

app.use(express.json());

const port = process.env.PORT || 7000;

//route
app.use("/api/", rootRouter);

//setup static file(lưu file,image,...)
const publicPathDirectory = path.join(__dirname, "./public");
// dùng /public để khi trả ra link hình có thêm/public
app.use("/public", express.static(publicPathDirectory));

//-------viết docs swagger--------
const options = {
  definition: {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Ve Xe Re", // short title.
      description: "Description Ve Xe Re", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "HoangQuyen", // your name
        email: "hoangquyen@gmail.com", // your email
        url: "web.com", // your website
      },
    },
    servers: [
      {
        url:
          port !== 7000
            ? `https://q-vexere.herokuapp.com`
            : `http://localhost:7000`,
      },
    ],
  },
  apis: ["./routers/*.js"],
};
const openapiSpecification = swaggerJsDoc(options);
app.use("/api", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

//-------------------------

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  //test connect
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
