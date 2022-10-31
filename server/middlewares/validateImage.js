const multer = require("multer");
const path = require("path");
const {uid} = require('uid/secure')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uid(16)+path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);

    }
};

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

module.exports = upload;