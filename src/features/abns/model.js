const Sequelize = require("sequelize");
const db = require("../../utils/db");

const Abn = db.define("abns", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  ABRRecordLastUpdatedDate: {
    type: Sequelize.STRING(8),
    allowNull: true,
  },

  ABN: {
    type: Sequelize.STRING(11),
    allowNull: true,
  },

  ABNStatus: {
    type: Sequelize.STRING(3),
    allowNull: true,
  },

  ABNStatusFromDate: {
    type: Sequelize.STRING(8),
    allowNull: true,
  },

  EntityTypeInd: {
    type: Sequelize.STRING(4),
    allowNull: true,
  },

  EntityTypeText: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },

  MainEntityNonIndividualNameType: {
    type: Sequelize.STRING(3),
    allowNull: true,
  },

  MainEntityNonIndividualNameText: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },

  LegalEntityIndividualNameType: {
    type: Sequelize.STRING(3),
    allowNull: true,
  },

  LegalEntityNameTitle: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },

  LegalEntityGivenName: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },

  LegalEntityFamilyName: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },

  ASICNumber: {
    type: Sequelize.STRING(9),
    allowNull: true,
  },

  GSTStatus: {
    type: Sequelize.STRING(3),
    allowNull: true,
  },

  GSTStatusFromDate: {
    type: Sequelize.STRING(8),
    allowNull: true,
  },

  DGR: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true,
  },

  OtherEntity: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true,
  },

  BusinessAddressState: {
    type: Sequelize.STRING(3),
    allowNull: true,
  },

  BusinessAddressPostcode: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
});

module.exports = Abn;
