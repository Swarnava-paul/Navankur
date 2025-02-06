const NodeCache = require("node-cache");

// Create a new instance of NodeCache with a default TTL (time-to-live) of 300 seconds (5 minutes)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Function to store OTP
const storeOTP = async (email, otp, ttl = 300) => {
    cache.set(email, otp, ttl);
};

// Function to verify OTP
const verifyOTP = async(email, otp) => {
    const storedOTP = cache.get(email);
    if (storedOTP && storedOTP === otp) {
        //cache.del(email); // Remove OTP after successful verification
        return true;
    }
    return false;
};

// Function to delete OTP manually
const deleteOTP = async (email) => {
    cache.del(email);
};

// Export functions
module.exports = {
    storeOTP,
    verifyOTP,
    deleteOTP
};
