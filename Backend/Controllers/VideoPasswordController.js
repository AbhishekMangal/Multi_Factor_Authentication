
const bcrypt = require('bcrypt');
const VideoPassword = require('../model/videoPasswordModel');
const crypto = require('crypto');

function preHash(password) {
    return crypto
      .createHash('sha256')
      .update(password, 'utf8')
      .digest('hex');       // 64 hex chars, 32 bytes
  }
const videoPasswordController = {
    // Create new video password
    createVideoPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const userId = req.user.id;
            const existingPassword = await VideoPassword.findOne({ userId });
            if (existingPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Video password already exists for this user"
                });
            }
            const sha256Digest = preHash(password);
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(sha256Digest, salt);

        
            const newVideoPassword = new VideoPassword({
                password: hashedPassword,
                userId
            });

            // Save to database
            await newVideoPassword.save();

            res.status(201).json({
                success: true,
                message: "Video password created successfully"
            });

        } catch (error) {
            console.error('Error in createVideoPassword:', error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Verify video password
    verifyVideoPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const userId = req.user.id;

            // Find the video password for the user
            const videoPassword = await VideoPassword.findOne({ userId });
            if (!videoPassword) {
                return res.status(404).json({
                    success: false,
                    message: "Video password not found"
                });
            }

            const candidateDigest = preHash(password);
        
            const isMatch = await bcrypt.compare(candidateDigest, videoPassword.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid password"
                });
            }

            res.status(200).json({
                success: true,
                message: "Password verified successfully"
            });

        } catch (error) {
            console.error('Error in verifyVideoPassword:', error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Update video password
    updateVideoPassword: async (req, res) => {
        try {
        
            const { newPassword } = req.body;
            const userId = req.user.id;
            const videoPassword = await VideoPassword.findOne({ userId });
            if (!videoPassword) {
                return res.status(404).json({
                    success: false,
                    message: "Video password not found"
                });
            }
            const sha256Digest = preHash(newPassword);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(sha256Digest, salt);
            videoPassword.password = hashedPassword;
            
            await videoPassword.save();;

            res.json({
                success: true,
                message: "Video password updated successfully"
            });

        } catch (error) {
            console.error('Error in updateVideoPassword:', error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

};

module.exports = videoPasswordController;