exports.makePostUser = ({ addUser, responseHelper }) => {
    return async function postUser(httpRequest) {
        try {
            const { source = {}, ...userInfo } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const posted = await addUser({
                ...userInfo,
                source
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toString()
                },
                statusCode: 201,
                body: responseHelper.postResponse(posted)
            }
        } catch (e) {
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: responseHelper.postResponse(e.message, true)
            }
        }
    }
}