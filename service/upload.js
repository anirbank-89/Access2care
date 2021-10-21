var fs = require("fs");

var cloudinaryConfig = require('./cloudinary');

const uploadFile = async (req, folder) => {
    let file_name = "uploads/" + folder + "/" + req.file.originalname;
    fs.writeFileSync(file_name, req.file.buffer);
    return file_name;
}

const uploadAudioFile = async (req, folder) => {
    let file_name = "uploads/" + folder + "/" + req.file.originalname;
    fs.writeFileSync(file_name, Buffer.from(new Uint8Array(req.file.buffer)));
    return file_name;
}

var uploadAudio = async (req, res, next) => {
    let audio_url = await uploadAudioFile(req, "assessment_audios");

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
            res.status(200).json({
                status: true,
                server_url: audio_url,
                cloudinary_data: audio
            });
        }
    );
}

module.exports = {
    uploadFile,
    uploadAudioFile,
    uploadAudio
};