var app = angular.module('app');

app.directive('scopeTrue', function() {
  return {
    scope: true,
    template: '<pre>{{greeting}}</pre>'
  }
});