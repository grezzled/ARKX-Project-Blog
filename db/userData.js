const User = require('./mongoDB/schemas/userSchema')
exports.insert = async (userInfo) => {
    console.log("DB:", userInfo)
    const user = new User(userInfo)
    await user.save()
    return userInfo
}
