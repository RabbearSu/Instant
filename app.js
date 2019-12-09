(function (angular) {
  var app = angular.module('myApp', [
    'ngRoute',
    'moviecat.movie_list',
    'moviecat.movie_detail'
  ])

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/in_theaters/1'
    })
  }])

  //聚焦功能
  app.controller('myController', [
    '$scope',
    '$location',
    function ($scope, $location) {
      //因为$watch只能监听$scope中的变量，所以要挂载
      $scope.$location = $location

      $scope.$watch('$location.path()', function (now, old) {
        $scope.category = now.replace(/\/(.+?)\/\d+/, '$1')
        // console.log($scope.category)
      })
    }])
})(angular)