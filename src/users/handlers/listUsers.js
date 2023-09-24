const { makeUser } = require('..')
const config = require('../../../config/config')
const strings = require('../../../config/strings.config')

module.exports = function makeListUsers({ db }) {
    return async function listUsers({ query }) {

        //* query validation
        if (query.limit && query.limit > config.api.MAX_LIMIT)
            throw new Error(strings.BAD_MAX_LIMIT)

        if (query.offset == 0)
            query.offset = 1


        const filterOptions = {
            ...query,
            q: query.q ?? "",
            sortBy: query.sort ?? config.api.SORT_BY,
            sortDirection: query.sortDirection ?? config.api.SORT_DIRECTION,
            offset: query.offset ?? config.api.OFFSET,
            limit: query.limit ?? config.api.LIMIT,
            fields: config.api.ALLOWED_FIELDS,
        }

        console.log(filterOptions)

        const users = await db.getFilteredUsers(filterOptions)

        if (!users.length){
            const error = new Error(strings.NO_USER_FOUND)
            error.statusCode = 404
            throw error
        }

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
