const Abn = require("./model");

exports.getAll = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const abns = await Abn.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
    });
    return res.status(200).json(abns);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const abn = await Abn.findByPk(req.params.id);
    return res.status(200).json(abn);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const ABN_MODEL = {
      ABRRecordLastUpdatedDate: req.body.ABRRecordLastUpdatedDate,
      ABRReplaced: req.body.ABRReplaced,
      ABNStatus: req.body.ABNStatus,
      ABNStatusFromDate: req.body.ABNStatusFromDate,
      ABNText: req.body.ABNText,
      EntityTypeInd: req.body.EntityTypeInd,
      EntityTypeText: req.body.EntityTypeText,
      NonIndividualNameType: req.body.NonIndividualNameType,
      NonIndividualNameText: req.body.NonIndividualNameText,
      BusinessAddressState: req.body.BusinessAddressState,
      BusinessAddressPostcode: req.body.BusinessAddressPostcode,
      ASICNumberType: req.body.ASICNumberType,
      ASICNumberText: req.body.ASICNumberText,
      GSTStatus: req.body.GSTStatus,
      GSTStatusFromDate: req.body.GSTStatusFromDate,
    };

    try {
      const abn = await Abn.update(ABN_MODEL, {
        where: { id: req.params.id },
      });
      return res.status(200).json(abn);
    } catch (error) {}
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const abn = await Abn.destroy({ where: { id: req.params.id } });
    return res.status(200).json(abn);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.bulkCreate = async (models) => {
  try {
    const abn = await Abn.bulkCreate(models);
    return abn;
  } catch (error) {
    return error;
  }
};
