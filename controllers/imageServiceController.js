const { THUMBNAIL } = require("../config/constant");
const imageThumbnail = require('image-thumbnail');
const isImageURL = require('image-url-validator');

module.exports = {
    getThumbnail: async (req, res) => {
        let { imageURL = "" } = req.body;
        try {
            let isValidImageURl = await isImageURL(imageURL)
            console.log("data ///////  ",isValidImageURl)
            if(!isValidImageURl){
                throw("not a valid Image URl")
            }
            const thumbnail = await imageThumbnail({ uri: imageURL }, { width: THUMBNAIL.WIDTH, height: THUMBNAIL.HEIGHT });
            res.send(thumbnail);
        } catch (e) {
            console.log("Errror  ",e)
            return _handleResponse(req, res, e);
        }
    }
}
