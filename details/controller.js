// (function(angular) {
// 	//创建详情页模块
// 	var app = angular.module('moviecat.detail', 
// 		['ngRoute'])

// 	app.config(['$routeProvider', function($routeProvider) {
// 		$routeProvider.when('/:id', {
// 			templateUrl: 'details/view.html',
// 			controller: 'DetailController'
// 		})
// 	}])

// 	app.controller('DetailController', [
// 		'$scope',
// 		'$route',
// 		'$routeParams',
// 		function ($scope, $route, $routeParams) {
// 			console.log($scope.subjects)
// 		}
// 		])
// })(angular)
