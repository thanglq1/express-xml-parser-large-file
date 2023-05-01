const fs = require("fs");
const csvWriter = require("csv-write-stream");
const writer = csvWriter({ sendHeaders: false }); //Instantiate var

exports.wirteHeaderCSV = async (csvFilename) => {
  if (!fs.existsSync(csvFilename)) {
    writer = csvWriter({ sendHeaders: false });
    writer.pipe(fs.createWriteStream(csvFilename));
    writer.write({
      header1: "ABRRecordLastUpdatedDate",
      header2: "ABRReplaced",
      header3: "ABNStatus",
      header3: "ABNStatusFromDate",
      header4: "ABNText",
      header5: "EntityTypeInd",
      header6: "EntityTypeText",
      header7: "NonIndividualNameType",
      header8: "NonIndividualNameText",
      header9: "BusinessAddressState",
      header10: "BusinessAddressPostcode",
      header11: "ASICNumberType",
      header12: "ASICNumberText",
      header13: "GSTStatus",
      header14: "GSTStatusFromDate",
      header15: "OtherEntity",
    });
    writer.end();
  }

  exports.wirteAppendCSV = async (abnObj, csvFilename) => {
    writer = csvWriter({ sendHeaders: false });
    writer.pipe(fs.createWriteStream(csvFilename, { flags: "a" }));
    const writeObject = {};
    for (let key in abnObj) {
      const value = abnObj[key];
      writeObject[key] = value;
    }
    writer.write(writeObject);
    writer.end();
  };
};
