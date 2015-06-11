angular.module('empdb', ['ui.bootstrap','ngResource','ngSanitize'])

.factory("Employees", function($resource) {
  return $resource('/employee/:id', {id:'@id'},{
    'query':  {method:'GET', isArray:false},
    'save': {method:'POST', transformResponse: function(data){
      data = angular.fromJson(data); 
      data.date_of_employment = new Date(data.date_of_employment); 
      return data;
    }}
  });
})

.controller('MainController', function($scope,$modal,Employees) {

  $scope.employees = [];

  $scope.query = {
    count: 0,
    total: 0,
    start: 0,
    limit: 100,
    orderBy: 'date_of_employment',
    order: 'asc',
    search: null
  }

  function query(lazyload){
    if(!lazyload){
      $scope.query.start = 0;
      $scope.employees = [];
    }

    Employees.query($scope.query,function(response){
      $scope.query.count = response.count;
      if(!$scope.query.search) $scope.query.total = response.count;
      $scope.employees = $scope.employees.concat(response.items);
    });
  }

  $scope.editEmployee = function(id){
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'modals/employee-form.html',
      controller: 'EditEmployeeController',
      resolve: {
        item: function($q, $injector) {
          var deferred = $q.defer();

          if(id){
            Employees.get({id: id}, function(item) {
              return deferred.resolve(item);
            });
            return deferred.promise;
          } else {
            return new Employees();
          }
        }
      }
    });

    modalInstance.result.then(function (result) {
      if(id){
        $scope.employees.map(function(o,i,a){
          if(o.id === id){
            switch(result.action){
              case 'deleted':
                a.splice(i,1);
                break;
              case 'saved':
                a[i] = result.item;
                break;
            }
          }
        });
      } else {
        query();
      }
    });
  }

  $scope.search = function(clear){
    if(clear) $scope.query.search = null;
    query();
  }

  $scope.setOrder = function(orderBy){
    if($scope.query.orderBy == orderBy){
      $scope.query.order = $scope.query.order == 'desc' ? 'asc' : 'desc';
    } else {
      $scope.query.order = 'asc';
    }

    $scope.query.orderBy = orderBy;

    query();
  }

  $scope.loadMoreRecords = function(){
    $scope.query.start += $scope.query.limit;
    query(true)
  }

  query();

})

.controller('EditEmployeeController', function ($scope, $modalInstance, Employees, item) {
  item.date_of_employment = new Date(item.date_of_employment);
  $scope.item = new Employees(item);

  $scope.title = item.id ? item.firstname + ' ' + item.lastname : '<span class="glyphicon glyphicon-plus"></span> Ny post';
  $scope.confirmDelete = false;

  $scope.save = function () {
    $scope.item.$save(function(item){
      $modalInstance.close({action:'saved', item: item});
    });
  };

  $scope.delete = function(){
    $scope.item.$delete(function(){
      $modalInstance.close({action:'deleted'});
    });
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.showconfirm = function(show){
    $scope.confirmDelete = show;
  }
})

.directive('lazyLoad', function($window) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      var trigger, windowHeight,
          threshold = 100;
          realWindow = angular.element($window)[0];

      scope.$watch( function() {
          scope.__height = element[0].scrollHeight;
      });

      scope.$watch( '__height', function( newHeight, oldHeight ) {
        trigger = newHeight - threshold;
      });

      angular.element($window).bind('scroll', function() {
        windowHeight = realWindow.innerHeight || realWindow.clientHeight
        if(trigger && realWindow.scrollY+windowHeight+threshold > trigger){
          scope.$apply(attr.lazyLoad);
          trigger = false;
        }

      });
    }
  }
})
;
