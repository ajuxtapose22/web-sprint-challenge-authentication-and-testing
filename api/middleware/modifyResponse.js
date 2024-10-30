
function modifyResponse(req, res, next) {
   
    const originalSend = res.send
  

    res.send = function (body) {

      let responseBody


      try {
        responseBody = JSON.parse(body)
      } catch (error) {
        responseBody = body
      }

      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
  
  
      if (Array.isArray(responseBody)) {
        responseBody = {
          jokes: responseBody,
          token: token,
        }
      }
  

      return originalSend.call(this, JSON.stringify(responseBody))
    }
  
    next()
  }
  
  module.exports = modifyResponse
  