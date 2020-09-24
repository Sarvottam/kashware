const imageThumbnail = require('image-thumbnail');
const isImageURL = require('image-url-validator');
const { THUMBNAIL } = require('../config/constant');

module.exports = {
  getThumbnail: async (req, res) => {
    const { imageURL = '' } = req.body;
    try {
      const isValidImageURl = await isImageURL(imageURL);
      _logger.info('valid Image URL ', isValidImageURl);
      if (!isValidImageURl) {
        throw new Error('not a valid Image URl');
      }
      // eslint-disable-next-line max-len
      const thumbnail = await imageThumbnail({ uri: imageURL }, { width: THUMBNAIL.WIDTH, height: THUMBNAIL.HEIGHT });
      return res.send(thumbnail);
    } catch (e) {
      _logger.error('error getting thumbnail ', e);
      return _handleResponse(req, res, e);
    }
  },
};
