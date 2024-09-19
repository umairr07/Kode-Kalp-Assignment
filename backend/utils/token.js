export const generateToken = (user, message, res) => {
    try {
        const token = user.generateJsonWebToken();

        // Set the cookie and send the response
        res.cookie("token", token, {
            // httpOnly:true,
            expires: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
            sameSite: "none",
        })
            .json({
                success: true,
                message,
                user,
                token
            })
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({
            success: false,
            message: "Error generating token",
            error: error.message,
        });
    }
}