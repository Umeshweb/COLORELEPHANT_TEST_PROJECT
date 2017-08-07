angular.module('todo', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				console.error("in createe");
				console.error(todoData);
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			register : function(data){
				console.error("in registere");
				console.error(data);
				return $http.post('/',data);
			},
			resend : function(data){ 
				console.error(data);
				return $http.post('/',data);
			},
			register1 : function(data){
				console.error("in registere");
				console.error(data);
				return $http.post('/register',data);
			},
			login : function(data){
				console.error("in login service function");
				console.error(data);
				return $http.post('/login',data);
			}
		}
	}]);

angular.module('star-rating',[])
