(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoFactory', TodoFactory)

    TodoFactory.$inject = ['$http'];

    function TodoFactory($http) {
        var service = {
            getTodo: getTodo,
            postTodo: postTodo,
            deleteTodo: deleteTodo
        };

        return service;

        function getTodo() {
            return $http
                .get('/todos')
                .then(function (res) {
                    return res.data;
                });

        };

        function postTodo(todo) {
            return $http
                .post('/todos', todo)
                .then(res => res.data);
        };

        function deleteTodo(id) {
            return $http
                .delete('/todos/' + id)
                .then(res => res.data)
        };
    }
})();