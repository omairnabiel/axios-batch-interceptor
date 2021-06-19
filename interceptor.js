

/**
 * We use a debounce technique to batch requests. Each subsequent request will
 * cancel the previous request and accumulate the params
 * Only the last request in the line will be sent with all params accumulated 
 * from prevous requests
 */
let timeout
const paramsAccumulator = new Set() // declare a Set to avoid duplicate params

function batchInterceptor(instance) {
    instance.interceptors.request.use(request => {
        return new Promise((resolve) => {
            
            request.params.ids.forEach(id => paramsAccumulator.add(id))
            clearTimeout(timeout)

            request.params = {
                ids: [...paramsAccumulator]  // convert to Set to an Array
            }
          
          timeout = setTimeout(() => {
              console.log("Request Params", request.params);
              resolve(request)
            }, 50)
        })
      }, error => Promise.reject(error));
}

export default batchInterceptor;

