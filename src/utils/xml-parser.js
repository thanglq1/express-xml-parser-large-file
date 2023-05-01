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
  xml.collect("LegalEntity");
  // some items have multiple GiveName
  xml.collect("GivenName");
  xml.collect("ASICNumber");
  xml.collect("GST");
  xml.collect("DGR");
  xml.collect("OtherEntity");

  xml.on("endElement: ABR", function (item) {
    let result = {
      // ABR
      ABRRecordLastUpdatedDate: undefined,

      // ABN
      ABN: undefined,
      ABNStatus: undefined,
      ABNStatusFromDate: undefined,

      // EntityType
      EntityTypeInd: undefined,
      EntityTypeText: undefined,

      // MainEntity
      MainEntityNonIndividualNameType: undefined,
      MainEntityNonIndividualNameText: undefined,
      BusinessAddressState: undefined,
      BusinessAddressPostcode: undefined,

      // LegalEntity
      LegalEntityIndividualNameType: undefined,
      LegalEntityNameTitle: undefined,
      LegalEntityGivenName: undefined,
      LegalEntityFamilyName: undefined,

      // ASICNumber
      ASICNumber: undefined,

      // GST
      GSTStatus: undefined,
      GSTStatusFromDate: undefined,

      // DGR (multipe)
      DGR: undefined,

      // OtherEntity (multiple)
      OtherEntity: undefined,
    };

    const { recordLastUpdatedDate } = item.$;

    // ABR
    result = {
      ...result,
      ABRRecordLastUpdatedDate: recordLastUpdatedDate,
    };

    //   ABN node
    if (item && item.ABN) {
      try {
        item.ABN.forEach((element) => {
          if (element.$text && element.$) {
            const abn = element.$text;
            const { status, ABNStatusFromDate } = element.$;

            result = {
              ...result,
              ABNStatus: status,
              ABNStatusFromDate: ABNStatusFromDate,
              ABN: abn,
            };
          }
        });
      } catch (error) {
        console.log("ABN NODE ERROR:::", error);
      }
    }

    //   EntityType node
    if (item && item.EntityType) {
      try {
        item.EntityType.forEach((element) => {
          const { EntityTypeInd, EntityTypeText } = element;

          result = {
            ...result,
            EntityTypeInd: EntityTypeInd,
            EntityTypeText: EntityTypeText,
          };
        });
      } catch (error) {
        console.log("ENTITYTYPE NODE ERROR:::", error);
      }
    }

    //   MainEntity node
    if (item && item.MainEntity) {
      try {
        item.MainEntity.forEach((element) => {
          const { NonIndividualName, BusinessAddress } = element;
          const NonIndividualNameType = NonIndividualName.$.type;
          const NonIndividualNameText = NonIndividualName.NonIndividualNameText;
          const BusinessAddressState = BusinessAddress.AddressDetails.State;
          const BusinessAddressPostcode =
            BusinessAddress.AddressDetails.Postcode;

          result = {
            ...result,
            MainEntityNonIndividualNameType: NonIndividualNameType,
            MainEntityNonIndividualNameText: NonIndividualNameText,
            BusinessAddressState: BusinessAddressState,
            BusinessAddressPostcode: BusinessAddressPostcode,
          };
        });
      } catch (error) {
        console.log("MAINENTITY NODE ERROR:::", error);
      }
    }

    // LegalEntity node
    if (item && item.LegalEntity) {
      try {
        item.LegalEntity.forEach((element) => {
          const { IndividualName, BusinessAddress } = element;
          const LegalEntityIndividualNameType = IndividualName.$.type;
          const NameTitle = IndividualName.NameTitle;
          const FamilyName = IndividualName.FamilyName;
          let GivenName = IndividualName.GivenName;
          if (Array.isArray(GivenName)) {
            GivenName = GivenName.join("-");
          }
          const BusinessAddressState = BusinessAddress.AddressDetails.State;
          const BusinessAddressPostcode =
            BusinessAddress.AddressDetails.Postcode;

          result = {
            ...result,
            LegalEntityIndividualNameType: LegalEntityIndividualNameType,
            LegalEntityNameTitle: NameTitle,
            LegalEntityGivenName: GivenName,
            LegalEntityFamilyName: FamilyName,
            BusinessAddressState: BusinessAddressState,
            BusinessAddressPostcode: BusinessAddressPostcode,
          };
        });
      } catch (error) {
        console.log("LEGALENTITY NODE ERROR:::", error);
      }
    }

    //   ASICNumber node
    if (item && item.ASICNumber) {
      try {
        item.ASICNumber.forEach((element) => {
          if (element.$text && element.$) {
            const ASICNumberText = element.$text;

            result = {
              ...result,
              ASICNumber: ASICNumberText,
            };
          }
        });
      } catch (error) {
        console.log("ASICNUMBER NODE ERROR:::", error);
      }
    }

    //   GST node
    if (item && item.GST) {
      try {
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
      } catch (error) {
        console.log("GST NODE ERROR:::", error);
      }
    }

    // DGR node
    let allDGRItems = [];
    if (item && item.DGR) {
      try {
        item.DGR.forEach((element) => {
          const { DGRStatusFromDate } = element.$;
          if (
            element &&
            element.NonIndividualName &&
            element.NonIndividualName.$
          ) {
            const NonIndividualNameTextType = element.NonIndividualName.$.type;
            const NonIndividualNameText =
              element.NonIndividualName.NonIndividualNameText;

            allDGRItems.push({
              DGRStatusFromDate: DGRStatusFromDate,
              NonIndividualNameType: NonIndividualNameTextType,
              NonIndividualNameText: NonIndividualNameText,
            });
          }
        });
        result = {
          ...result,
          DGR: allDGRItems,
        };
      } catch (error) {
        console.log("DGR NODE ERROR:::", error);
      }
    }

    //   OtherEntity node
    let allOtherItems = [];
    if (item && item.OtherEntity) {
      try {
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
              NonIndividualNameType: NonIndividualNameTextType,
              NonIndividualNameText: NonIndividualNameText,
            });
          }
        });
        result = {
          ...result,
          OtherEntity: allOtherItems,
        };
      } catch (error) {
        console.log("OTHERENTITY NODE ERROR:::", error);
      }
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
