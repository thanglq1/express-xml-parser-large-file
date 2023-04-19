const fs = require("fs");
const XmlStream = require("xml-stream");

exports.parserXml = async (xmlFile, onItemParser, onDone) => {
  console.log("xmlFile:::", xmlFile);

  let allItemsParser = [];

  var stream = fs.createReadStream(xmlFile);
  var xml = new XmlStream(stream);

  xml.collect("ABN");
  xml.collect("EntityType");
  xml.collect("MainEntity");
  xml.collect("ASICNumber");
  xml.collect("GST");
  xml.collect("OtherEntity");

  xml.on("endElement: ABR", function (item) {
    let result = {
      // ABR
      ABRRecordLastUpdatedDate: undefined,
      ABRReplaced: undefined,

      //   ABN
      ABNStatus: undefined,
      ABNStatusFromDate: undefined,
      ABNText: undefined,

      //   EntityType
      EntityTypeInd: undefined,
      EntityTypeText: undefined,

      //   MainEntity
      NonIndividualNameType: undefined,
      NonIndividualNameText: undefined,
      BusinessAddressState: undefined,
      BusinessAddressPostcode: undefined,

      //   ASICNumber
      ASICNumberType: undefined,
      ASICNumberText: undefined,

      //   GST
      GSTStatus: undefined,
      GSTStatusFromDate: undefined,

      // OtherEntity
      OtherEntity: undefined,
    };

    const { recordLastUpdatedDate, replaced } = item.$;

    result = {
      ...result,
      ABRRecordLastUpdatedDate: recordLastUpdatedDate,
      ABRReplaced: replaced,
    };

    //   ABN node
    if (item && item.ABN) {
      item.ABN.forEach((element) => {
        if (element.$text && element.$) {
          const abn = element.$text;
          const { status, ABNStatusFromDate } = element.$;

          result = {
            ...result,
            ABNStatus: status,
            ABNStatusFromDate: ABNStatusFromDate,
            ABNText: abn,
          };
        }
      });
    }

    //   EntityType node
    if (item && item.EntityType) {
      item.EntityType.forEach((element) => {
        const { EntityTypeInd, EntityTypeText } = element;

        result = {
          ...result,
          EntityTypeInd: EntityTypeInd,
          EntityTypeText: EntityTypeText,
        };
      });
    }

    //   MainEntity node
    if (item && item.MainEntity) {
      item.MainEntity.forEach((element) => {
        const { NonIndividualName, BusinessAddress } = element;
        const NonIndividualNameType = NonIndividualName.$.type;
        const NonIndividualNameText = NonIndividualName.NonIndividualNameText;
        const BusinessAddressState = BusinessAddress.AddressDetails.State;
        const BusinessAddressPostcode = BusinessAddress.AddressDetails.Postcode;

        result = {
          ...result,
          NonIndividualNameType: NonIndividualNameType,
          NonIndividualNameText: NonIndividualNameText,
          BusinessAddressState: BusinessAddressState,
          BusinessAddressPostcode: BusinessAddressPostcode,
        };
      });
    }

    //   ASICNumber node
    if (item && item.ASICNumber) {
      item.ASICNumber.forEach((element) => {
        if (element.$text && element.$) {
          const ASICNumberType = element.$.ASICNumberType;
          const ASICNumberText = element.$text;

          result = {
            ...result,
            ASICNumberType: ASICNumberType,
            ASICNumberText: ASICNumberText,
          };
        }
      });
    }

    //   GST node
    if (item && item.GST) {
      item.GST.forEach((element) => {
        if (element.$) {
          const { status, GSTStatusFromDate } = element.$;

          result = {
            ...result,
            GSTStatus: status,
            GSTStatusFromDate: GSTStatusFromDate,
          };
        }
      });
    }

    //   OtherEntity node
    let allOtherItems = [];
    if (item && item.OtherEntity) {
      item.OtherEntity.forEach((element) => {
        if (
          element &&
          element.NonIndividualName &&
          element.NonIndividualName.$
        ) {
          const NonIndividualNameTextType = element.NonIndividualName.$.type;
          const NonIndividualNameText =
            element.NonIndividualName.NonIndividualNameText;

          allOtherItems.push({
            NonIndividualName: NonIndividualNameTextType,
            NonIndividualNameText: NonIndividualNameText,
          });
        }
      });
      result = {
        ...result,
        OtherEntity: allOtherItems,
      };
    }

    onItemParser(result);
    allItemsParser.push(result);
  });

  xml.on("end", function () {
    console.log("=====DONE=====");
    onDone(allItemsParser);
  });

  xml.on("error", function (message) {
    console.log("=====PARSER ERROR=====: " + message);
  });
};
