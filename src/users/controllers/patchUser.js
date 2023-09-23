exports.makePatchUser = ({ editUser, responseHelper }) => {
    return async function patchUser(httpRequest) {
        try {
            console.log("HTTP userID:", httpRequest.params.userId)
            const { source = {}, ...userInfo } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const patched = await editUser({
                ...userInfo,
                source,
                userId: httpRequest.params.userId,
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toString()
                },
                statusCode: 201,
                body: responseHelper.patchResponse(patched)
            }
        } catch (e) {
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: responseHelper.patchResponse(e.message, true)
            }
        }
    }
}