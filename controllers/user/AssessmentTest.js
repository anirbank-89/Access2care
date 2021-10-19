var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');

require('dotenv').config();

var cloudinaryConfig = require('../../service/cloudinary');
var Upload = require('../../service/upload');

var uploadAudio = async (req, res) => {
    // Get the file name and extension with multer
    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            const fileExt = file.originalname.split(".").pop();
            const filename = `${new Date().getTime()}.${fileExt}`;
            cb(null, filename);
        },
    });

    // Filter the file to validate if it meets the required audio extension
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
            cb(null, true);
        } else {
            cb(
                {
                    message: "Unsupported File Format",
                },
                false
            );
        }
    };

    // Set the storage, file filter and file size with multer
    const upload = multer({
        storage,
        limits: {
            fieldNameSize: 200,
            fileSize: 10 * 1024 * 1024,
        },
        fileFilter,
    }).single("audio");

    // upload to cloudinary
    upload(req, res, (err) => {
        if (err) {
            return res.send(err);
        }

        // SEND FILE TO CLOUDINARY
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const { path } = req.file; // file becomes available in req at this point

        const fName = req.file.originalname.split(".")[0];
        cloudinary.v2.uploader.upload(
            path,
            {
                resource_type: "raw",
                public_id: `assessment_audios/${fName}`,
            },

            // Send cloudinary response or catch error
            (err, audio) => {
                if (err) return res.status(500).json({ status: false, error: err });

                fs.unlinkSync(path);
                res.status(200).json({ status: true, data: audio });
            }
        );
    });
}

var uploadAudio2 = async (req, res, next) => {
    let audio_url = await Upload.uploadAudioFile(req, "assessment_audios");

    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinaryConfig.v2.uploader.upload(
        path,
        {
            resource_type: "raw",
            public_id: `assessment_audios/${fName}`,
        },

        // Send cloudinary response or catch error
        (err, audio) => {
            if (err) return res.status(500).json({ status: false, error: err });

            fs.unlinkSync(path);
            res.status(200).json({ status: true, server_url: audio_url, cloudinary_data: audio });
        }
    );
}

module.exports = {
    uploadAudio,
    uploadAudio2
}