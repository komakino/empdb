<!doctype html>
<html ng-app="empdb">
    <head>
        <title>EmpDB</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/vendor.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body ng-controller="MainController">
      <header class="container-fluid row">
        <div class="col-md-6">
          <span id="logo"><span class="glyphicon glyphicon-user"></span> Emp<span id="logo-accent">DB</span></span>
        </div>
      </header>
      <div class="container-fluid">
        <div id="table-control" class="row">
          <div class="col-md-6">
            <form name="searchForm" ng-submit="search()">
              <div class="input-group">
                <input type="text" class="form-control input-lg" ng-model="query.search" placeholder="Sök">
                <span class="input-group-btn">
                  <button class="btn btn-lg btn-danger" type="button" ng-class="{'hide':!query.search}" ng-click="search(true)">
                    <span class="glyphicon glyphicon-remove"></span>
                  </button>
                  <button class="btn btn-lg btn-default" type="submit" ng-class="{'disabled':!query.search}">
                    <span class="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
           </form>
          </div>
          <div class="col-md-4">
            <span id="table-results">Listar {{query.count}} <small ng-if="query.total > query.count">(av {{query.total}})</small> poster.</span>
          </div>
          <div class="col-md-2 text-right">
            <button class="btn btn-lg btn-success" type="button" ng-click="editEmployee()">
              <span class="glyphicon glyphicon-plus"></span> Ny post
            </button>
          </div>
        </div>
        <table id="main-table" class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th class="col-md-8">
                <a ng-click="setOrder('lastname')" ng-class="{'dotted': query.orderBy == 'lastname'}">Efternamn</a>, 
                <a ng-click="setOrder('firstname')" ng-class="{'dotted': query.orderBy == 'firstname'}">Förnamn</a></th>
              <th class="col-md-2"><a ng-click="setOrder('pin')" ng-class="{'dotted': query.orderBy == 'pin'}">Personnummer</a></th>
              <th class="col-md-2 text-right"><a ng-click="setOrder('date_of_employment')" ng-class="{'dotted': query.orderBy == 'date_of_employment'}">Anställningsdatum</a></th>
            </tr>
          </thead>
          <tbody lazy-load="loadMoreRecords()">
            <tr ng-repeat="employee in employees" ng-click="editEmployee(employee.id)">
              <td>
                <strong>{{employee.lastname}}</strong>, {{employee.firstname}}
              </td>
              <td>{{employee.pin}}</td>
              <td class=" text-right">{{employee.date_of_employment | date}}</td>
            </tr>
          </tbody>
        </table>

      </div>

      <script src="/js/vendor.js"></script>
      <script src="/js/app.js"></script>
      <script src="/js/templates.js"></script>
    </body>
</html>
