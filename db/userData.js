const User = require('./mongoDB/schemas/userSchema')
exports.insert = async (userInfo) => {
    console.log("DB:", userInfo)
    const user = new User(userInfo)
    await user.save()
    return userInfo
}

exports.findById = async (userId) => {
    const existedUser = User.findOne({ userId })
    return existedUser
}

exports.update = async (userId, updatedData) => {
    const updatedUser = await User.findOneAndUpdate(
        { userId },
        updatedData,
        { new: true }
    );
    return updatedUser
}

exports.getAll = async () => {
    const users = await User.find({})
    return users
}