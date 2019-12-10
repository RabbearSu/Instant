(function (angular, NProgress) {
  //创建模块
  var app = angular.module('moviecat.movie_person', [
    'ngRoute',
    'moviecat.services.http'
  ])

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/movie/celebrity/:id', {
      templateUrl: 'movie_person/view.html',
      controller: 'PersonController'
    })
  }])

  app.controller('PersonController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    '$document',
    function ($scope, $route, $routeParams, HttpService, $document) {
      $scope.id = $routeParams.id
      $scope.content = '默认'
      $scope.loading = true

      HttpService.jsonp(`http://api.douban.com/v2/movie/celebrity/${$scope.id}`, {
        apikey: '0df993c66c0c636e29ecbb5344252a4a'
      }, function (data) {
        console.log(data)
        $scope.content = data
        $scope.loading = false
        //重新加载scope中的参数
        $scope.$apply()

        //删除script标签
        var scriptObjs = $document[0].getElementsByTagName('script')
        var lastScriptObj = scriptObjs[scriptObjs.length-1]
        $document[0].body.removeChild(lastScriptObj)
        NProgress.done()
      })
    }
  ])

})(angular, NProgress)