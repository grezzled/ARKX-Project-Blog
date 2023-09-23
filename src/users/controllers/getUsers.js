exports.makeGetUsers = ({ listUsers, responseHelper }) => {
    return async function getUsers(httpRequest) {
        try {

            const query = httpRequest.query
            const result = await listUsers({ query })
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: responseHelper.getResponse(result)
            }
        } catch (e) {
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: responseHelper.getResponse(e.message, true)
            }
        }
    }
}