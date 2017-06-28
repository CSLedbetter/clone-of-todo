(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController)

    TodoController.$inject = ['$http'];

    function TodoController($http) {
        var vm = this;

        vm.newTodo = {};
        vm.todos = [];
        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;
        activate();

        //////////

        function activate() {
            $http
                .get('http://localhost:3000/todos')
                .then(res => {
                    vm.todos = res.data;
                });

        }

        function addTodo() {
            const newTodo = {
                todos: vm.newTodo
            };
            $http
                .post('http://localhost:3000/todos', newTodo)
                .then(res => {
                    alert('You added some stuff');
                    vm.todos.push(newTodo);
                });
                
        }

        function removeTodo(todo) {
            var index = vm.todos.indexOf(todo);
            vm.todos.splice(index, 1);
        }
    }
})();