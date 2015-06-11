angular.module('empdb').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modals/employee-form.html',
    "<form name=\"modalForm\" class=\"form-horizontal\" ng-submit=\"save()\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "    <h3 class=\"modal-title\" ng-bind-html=\"title\"></h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"firstname\" class=\"col-sm-4 control-label\">F&ouml;rnamn</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"firstname\" ng-model=\"item.firstname\" placeholder=\"F&ouml;rnamn\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"lastname\" class=\"col-sm-4 control-label\">Efternamn</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"lastname\" ng-model=\"item.lastname\" placeholder=\"Efternamn\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "       <div class=\"form-group\">\n" +
    "        <label for=\"pin\" class=\"col-sm-4 control-label\">Personnummer</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"pin\" ng-model=\"item.pin\" placeholder=\"yymmdd-xxxx\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "       <div class=\"form-group\">\n" +
    "        <label for=\"date_of_employment\" class=\"col-sm-4 control-label\">Anst&auml;llningsdatum</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <input type=\"date\" class=\"form-control\" id=\"date_of_employment\" ng-model=\"item.date_of_employment\" placeholder=\"YYYY-MM-DD\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <div ng-if=\"!confirmDelete\">\n" +
    "      <button class=\"btn btn-success\" type=\"submit\" ng-class=\"{'disabled':modalForm.$pristine || modalForm.$invalid}\">Spara</button>\n" +
    "      <button class=\"btn btn-danger pull-left\" type=\"button\" ng-click=\"showconfirm(true)\">Radera</button>\n" +
    "      <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\">Avbryt</button>\n" +
    "    </div>\n" +
    "    <div ng-if=\"confirmDelete\">\n" +
    "      <p class=\"pull-left\"><strong>&Auml;r du s&auml;ker p&aring; att du vill radera posten?</strong></p>\n" +
    "      <button class=\"btn btn-default\" type=\"button\" ng-click=\"showconfirm(false)\">Nej</button>\n" +
    "      <button class=\"btn btn-danger\" type=\"button\" ng-click=\"delete()\">Ja</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n"
  );

}]);
