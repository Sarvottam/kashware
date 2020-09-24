const jsonpatch = require('json-patch');

const { isEmpty } = require('../utils/helper');

module.exports = {
  modifyRequest: async (req, res) => {
    const { reqObject = {}, patchObject = {} } = req.body;
    try {
      if (isEmpty(reqObject) || typeof reqObject !== 'object' || reqObject === null) {
        throw new Error('reqObject missing or invalid');
      }
      if (isEmpty(patchObject) || typeof patchObject !== 'object' || patchObject === null
      ) {
        throw new Error(' patchObject missing or invalid');
      }
      const data = jsonpatch.apply(reqObject, patchObject);
      _logger.debug('image thumbnail data ', data);
      return _handleResponse(req, res, null, { data });
    } catch (e) {
      _logger.error('Error modifying request  ', e);
      return _handleResponse(req, res, e);
    }
  },
};
