(function(angular, NProgress) {
  //创建模块
  var app = angular.module('moviecat.movie_list',
    ['ngRoute', 'moviecat.services.http'])

  //路由
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page', {
      templateUrl: 'movie_list/view.html',
      controller: 'MovieListController'
    }).when('/:id', {
      templateUrl: 'movie_list/detail.html',
      controller: 'DetailController'
    })
  }])

  //控制器
  app.controller('MovieListController', [
    '$scope',
    '$rootScope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $rootScope, $route, $routeParams, HttpService) {
      //控制器分为两步
      //1. 设计暴露的数据
      //2. 设计暴露的行为
      var count = 10 //每一页的条数
      $scope.currentPage = parseInt($routeParams.page) //路由解析到的第几页
      var start = ($scope.currentPage - 1) * count //开始的位置

      //当前电影的id
      $scope.id = $routeParams.id

      //初始配置
      $scope.message = ''
      $scope.totalCount = 0
      $scope.totalPages = 0
      $rootScope.subjects = []
      $scope.loading = true
      $scope.title = ''
      //当前分类
      $scope.category = $routeParams.category

      HttpService.jsonp(`http://api.douban.com/v2/movie/${$routeParams.category}`, {
        apikey: '0df993c66c0c636e29ecbb5344252a4a',
        start: start,
        count: count
      }, function(data) {
        $scope.totalCount = data.total
        $scope.totalPages = Math.ceil($scope.totalCount / count)
        $rootScope.subjects = data.subjects
        $scope.loading = false
        $scope.title = data.title
        //使用$apply重新加载
        $scope.$apply()

        NProgress.done()
      })

      //暴露一个翻页的行为
      $scope.go = function(page) {
        if (page >= 1 && page <= $scope.totalPages) {
          $route.updateParams({ page: page })
        }
      }
    }
  ])

  app.controller('DetailController', [
    '$scope',
    '$rootScope',
    '$route',
    '$routeParams',
    function($scope, $rootScope, $route, $routeParams) {
      $scope.id = $routeParams.id
      $scope.content = '默认'

      //遍历列表，搜索匹配的电影条目
      for (var i = 0; i < $rootScope.subjects.length; i++) {
        if ($rootScope.subjects[i].id === $scope.id) {
          $scope.content = $rootScope.subjects[i]
        }
      }
    }
  ])
})(angular, NProgress)