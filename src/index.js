const express = require("express");

const sequelize = require("./utils/db");
const AbnModel = require("./features/abns/model");
const AbnRoute = require("./features/abns/route");

const parser = require("./utils/xml-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

app.use("/abns", AbnRoute);

(async () => {
  try {
    await sequelize.sync({ force: true });

    app.listen(process.env.EXTERNAL_PORT || 3001);

    console.log("server running...");
    const abnController = require("./features/abns/controller");

    let allAbnItems = [];

    parser.parserXml(
      `${process.cwd()}/xml/20230412_Public01.xml`,
      (itemParsered) => {
        allAbnItems.push(itemParsered);
      },
      (allItemsParsered) => {
        while (allAbnItems.length > 0) {
          const bulkInsertSize = 5000; // insert 5.000 records until allAbnItems is empty
          const bulkItemsInsert = allAbnItems.splice(0, bulkInsertSize);
          abnController.bulkCreate(bulkItemsInsert);
        }
        console.log("DONE:::", allItemsParsered.length);
      }
    );
  } catch (error) {
    console.error(error);
  }
})();
