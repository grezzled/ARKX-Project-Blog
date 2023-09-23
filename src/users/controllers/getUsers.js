exports.makeGetUsers = ({ listUsers, responseHelper }) => {
    return async function getUsers(httpRequest) {
        try {
            const users = await listUsers(httpRequest)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: responseHelper.getResponse(users)
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