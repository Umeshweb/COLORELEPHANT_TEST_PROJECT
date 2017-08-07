angular.module('app', ['main', 'todo','ui.router','star-rating'])
	.config(function($stateProvider) {
		$stateProvider.state({
		    name: 'main',
		    url: '/welcome',
		    templateUrl: 'form.html'
		  });
		$stateProvider.state({
		    name: 'login',
		    url: '/adminLogin',
		    templateUrl: 'login.html'
		  });
	  
	}).run(function(){
		console.error(" in runnnnnnnnnn");
	});
