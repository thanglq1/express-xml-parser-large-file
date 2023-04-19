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
    type: Sequelize.STRING,
    allowNull: true,
  },

  ABRReplaced: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ABNStatus: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ABNStatusFromDate: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ABNText: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  EntityTypeInd: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  EntityTypeText: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  NonIndividualNameType: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  NonIndividualNameText: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  BusinessAddressState: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  BusinessAddressPostcode: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ASICNumberType: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ASICNumberText: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  GSTStatus: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  GSTStatusFromDate: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  OtherEntity: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true,
  },
});

module.exports = Abn;
