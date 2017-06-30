(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController)

    TodoController.$inject = ['TodoFactory'];

    function TodoController(TodoFactory) {
        var vm = this;

        vm.newTodo = {};
        vm.todos = [];
        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;
        activate();

        //////////

        function activate() {
            TodoFactory
                .getTodo()
                .then(function (data) {
                    vm.todos = data;
                });
        }

        function addTodo() {
            TodoFactory
                .postTodo(vm.newTodo)
                .then(() => {
                        vm.todos.push(vm.newTodo);
                        vm.newTodo = {};
                });
        }

        function removeTodo(todo) {
            TodoFactory
                .deleteTodo(todo._id)
                .then(() => {
                    var index = vm.todos.indexOf(todo);
                    vm.todos.splice(index, 1);
                });
        }
    }
})();