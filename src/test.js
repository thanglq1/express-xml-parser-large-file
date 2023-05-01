const xmlParser = require("./utils/xml-parser");
const abnController = require("./features/abns/controller");

// const csvFilename = `${process.cwd()}/csv/20230412_Public01.csv`;
// const csvWriter = require("./utils/csv-writer");
// csvWriter.wirteHeaderCSV(csvFilename);

const xmlFile = `${process.cwd()}/xml/collect-preserve.xml`;
let allAbnItems = [];

xmlParser.parserXml(
  xmlFile,
  (item) => {
    console.log("item:::", item);
    allAbnItems.push(item);
    // csvWriter.wirteAppendCSV(itemParsered, csvFilename);
  },
  (allItems) => {
    // while (allAbnItems.length > 0) {
    //   const bulkInsertSize = 1000; // insert 1.000 records until allAbnItems is empty
    //   const bulkItemsInsert = allAbnItems.splice(0, bulkInsertSize);
    //   abnController.bulkCreate(bulkItemsInsert);
    // }
  }
);
