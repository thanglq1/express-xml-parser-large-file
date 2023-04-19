const xmlParser = require("./utils/xml-parser");
const abnController = require("./features/abns/controller");

const xmlFile = `${process.cwd()}/xml/collect-preserve.xml`;
let allAbnItems = [];

xmlParser.parserXml(
  xmlFile,
  (item) => {
    console.log("item:::", item);
    allAbnItems.push(item);
  },
  (allItems) => {
    console.log("allItems:::", allItems.length);
    while (allAbnItems.length > 0) {
      const bulkInsertSize = 10000; // insert 1.000 records until allAbnItems is empty
      const bulkItemsInsert = allAbnItems.splice(0, bulkInsertSize);
      abnController.bulkCreate(bulkItemsInsert);
    }
  }
);
