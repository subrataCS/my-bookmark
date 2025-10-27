// controllers/userData.js
export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default getUserProfile;