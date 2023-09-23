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


// TODO sort by created_at
// TODO filter by age ASC/DESC 
// TODO filter by salary ASC/DESC 
// TODO filter by activated TRUE/FALSE
// TODO filter by role USER/ADMIN
// TODO filter by inHold TRUE/FALSE
// TODO "metadata": {
//     "totalItems": 100,
//     "currentPage": 1,
//     "itemsPerPage": 10
//   },

exports.getFilteredUsers = async (filterOptions) => {

    let sortOrder = 1
    if (filterOptions.sortDirection === "ASC")
        sortOrder = 1
    if (filterOptions.sortDirection === "DESC")
        sortOrder = -1

    const query = {}

    if (filterOptions.q)
        query.$text = { $search: filterOptions.q }

    //* Sorting
    const sortOption = {};
    sortOption[filterOptions.sortBy] = filterOptions.sortDirection === "ASC" ? 1 : -1;

    //* Pagination
    const skip = (filterOptions.offset - 1) * filterOptions.limit;
    const limit = filterOptions.limit;

    //* Projection (fields)
    const projection = {};
    if (filterOptions.fields.length > 0) {
        filterOptions.fields.forEach(field => {
            projection[field] = 1;
        });
    }

    //* Search query
    const searchQueries = [
        { username: { $regex: filterOptions.q, $options: 'i' } },
        { email: { $regex: filterOptions.q, $options: 'i' } },
        { role: { $regex: filterOptions.q, $options: 'i' } },
    ];

    const users = await User
        .find({ $or: searchQueries })
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select(projection)

    return users
}