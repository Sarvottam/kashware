const {isEmpty} = require("../utils/helper")
const jsonpatch = require("json-patch")
module.exports = {
  modifyRequest: async (req, res) => {
    let { reqObject={},patchObject = {} } = req.body;
    try {
      if (isEmpty(reqObject) || typeof reqObject !== 'object' || reqObject === null) {
        throw "reqObject missing or invalid";
      }
      if (isEmpty(patchObject) || typeof patchObject !== 'object' || patchObject === null)  {
        throw "patchObject missing or invalid";
      }
      let data = jsonpatch.apply(reqObject,patchObject);
      logger.debug("image thumbnail data ",data)
      return _handleResponse(req, res, null, { data});
    } catch (e) {
      _logger.error("Error modifying request  ",e)
      return _handleResponse(req, res, e);
    }
  }
}
