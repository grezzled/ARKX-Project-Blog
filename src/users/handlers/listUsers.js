const { makeUser } = require('..')
const config = require('../../../config/config')
const strings = require('../../../config/strings.config')

module.exports = function makeListUsers({ db }) {
    return async function listUsers({ query }) {

        const filterOptions = {
            ...query,
            q: query.q ?? "",
            sortBy: query.sort ?? config.api.SORT_BY,
            sortDirection: query.sortDirection ?? config.api.SORT_DIRECTION,
            offset: query.offset ?? config.api.OFFSET,
            limit: config.api.LIMIT,
            fields: config.api.ALLOWED_FIELDS,
        }

        console.log(filterOptions)

        const users = await db.getFilteredUsers(filterOptions)

        if (!users.length)
            return strings.NO_USER_FOUND

        const result = {
            data: users,
            metadata: {
                page: filterOptions.offset,
                per_page: filterOptions.limit,
                total_users: users.length
            }
        }

        return result
    }
}
