(function(){
    'use strict';

    angular
        .module('app')
        .factory('TodoFactory', TodoFactory)

    TodoFactory.$inject = ['$http'];

    function TodoFactory($http) {
        var service = {
            getTodo: getTodo,
            postTodo: postTodo
        };

        return service;

        function getTodo() { 
            return $http
                .get('/todo')
                .then((res) => res.data);

        };
        
        function postTodo() { 

        };
    }
})();