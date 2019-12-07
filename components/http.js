(function(angular, NProgress) {
  //创建模块
  var http = angular.module('moviecat.services.http', [])

  http.service('HttpService', ['$document', '$window', function($document, $window) {
    this.jsonp = function(url, data, callback) {

      NProgress.start()
      
      var funcName = 'jsonp_' + Math.random().toString().replace('.', '')

      $window[funcName] = callback

      var query = '?'
      for (var key in data) {
        query += key + '=' + data[key] + '&'
      }

      var scriptElement = $document[0].createElement('script')
      scriptElement.src = url + query + 'callback=' + funcName

      $document[0].body.appendChild(scriptElement)
    }
    
  }])

})(angular, NProgress)