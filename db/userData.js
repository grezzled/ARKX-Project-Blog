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


exports.getFilteredUsers = async (filterOptions) => {
    /**
     * Retrieves filtered user data from a MongoDB database based on the provided filter options.
     * @param {Object} filterOptions - An object containing various filter options for retrieving users.
     * @param {string} [filterOptions.q] - The search query to filter users based on username or email.
     * @param {string} filterOptions.sortBy - The field to sort the users by.
     * @param {string} filterOptions.sortDirection - The sort direction, either "ASC" for ascending or "DESC" for descending.
     * @param {number} filterOptions.offset - The offset for pagination, specifying the page number.
     * @param {number} filterOptions.limit - The maximum number of users to retrieve per page.
     * @param {string[]} [filterOptions.fields] - The fields to include in the retrieved user data.
     * @param {boolean} [filterOptions.active] - Filter users by active status.
     * @param {boolean} [filterOptions.inHold] - Filter users by in-hold status.
     * @param {string} [filterOptions.role] - Filter users by role.
     * @returns {Object[]} - An array of user objects that match the specified filter options.
     */
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
    ];

    const options = {}
    options.$or = searchQueries
    if (filterOptions.active) options.active = filterOptions.active === 'false' ? false : true;
    if (filterOptions.inHold) options.inHold = filterOptions.inHold === 'false' ? false : true;
    if (filterOptions.role) options.role = filterOptions.role === 'ADMIN' ? 'ADMIN' : 'USER';


    const users = await User
        .find(options)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select(projection)

    return users
}