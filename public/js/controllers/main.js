angular.module('main', [])

	// inject the Todo service factory into our controller
.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
	console.error("in main controller")
	$scope.formData = {};
	$scope.loading = true;
	navigator.geolocation.getCurrentPosition(function(pos){
		  console.error(pos);
		  $scope.latitude = pos.coords.latitude;
		  $scope.longitude = pos.coords.longitude;
		  console.error($scope.latitude);
		  console.error($scope.longitude);
		  $scope.timeStamp = new Date(pos.timestamp);
		  console.error($scope.timeStamp);
		  console.error("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ $scope.latitude + "," + $scope.longitude + "&sensor=true");
		  var tt = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ $scope.latitude + "," + $scope.longitude + "&sensor=true";
		  $http.get(tt).then(function(data){
				console.error(data.data)
				console.error(data.data.results[0].formatted_address);
				$scope.location = data.data.results[0].formatted_address;
		 })
	});
	
}])

.controller('loginController', ['$scope','$http','Todos', function($scope, $http, Todos) {
	console.error("in main controller");
	$scope.tab = 0;
	$scope.loginForm = function(){
		$scope.loginFlag = false;
		console.error("after Login");
		console.log($scope.username);
		console.log($scope.password);
		
		$scope.loginObj = {
				email : $scope.username,
				pw : $scope.password,
		}
		Todos.login($scope.loginObj).then(function(data){
			console.error(" in success login");
			console.error(data);
			if(typeof data.data == 'string'){
				$scope.alertFlag = true;
				$scope.alertmessage = data.data;
			}else{
				console.error("after login")
				console.error(data.data);
				$scope.loginedUser = data.data;
				Todos.get()
				.then(function(data) {
					console.error(" all dataaaaaaaaaa");
					console.error(data);
					$scope.dataArray = data.data;
					$scope.loginFlag = true;
				});
			}
		}),function(err){
			console.error("in error login");
			console.error(err);
		}
	}
	$scope.backTologin = function(){
		console.error("dddddddddddddddddddddddddddddddddddd")
		$scope.registerFlag = false;
		$scope.loginFlag = false;
	}
	$scope.register = function(){
		console.error("in regiseter");
		$scope.registerFlag = true;
	}
	
	$scope.FinalRegister = function(){
		$scope.registerObj = {
				email : $scope.username,
				pw : $scope.password,
				fName : $scope.firstName,
				lName : $scope.lastName,
				location : $scope.location,
				timeStamp : $scope.timeStamp,
				type: 'register'
		}
		Todos.register1($scope.registerObj).then(function(data){
				console.error("registered function callback");
				console.error(data);
				if(typeof data.data == 'string'){
					$scope.alertFlag = true;
					$scope.alertmessage = data.data;
				}else{
					$scope.registerFlag = false;
					$scope.loginFlag = true;
					$scope.loginedUser = data.data;
					console.error($scope.loginedUser)
					Todos.get()
					.then(function(data) {
						console.error(" all dataaaaaaaaaa");
						console.error(data);
						$scope.dataArray = data.data;
						$scope.loading = false;
					});
				}
			}),function(data){
			console.error('Innnnnnnnnnnnnnnnnnnn error');
			console.error(data);
		}
	}
	
	$scope.resend = function(){
		Todos.resend({email : $scope.username, type : 'resend'}).then(function(data){
			console.error("resended successfully");
			console.error(data);
			}),function(data){
			console.error('Innnnnnnnnn2222222222nnnnnnnnnn error');
			console.error(data);
		}
	}
    

}])

.controller('formController', ['$scope','$http','Todos', function($scope, $http, Todos) {
	console.error("in formmmmmm controller");
	window.form = $scope;
	function GenerateCaptcha() {
		var chr1 = Math.ceil(Math.random() * 10)+ '';
		var chr2 = Math.ceil(Math.random() * 10)+ '';
		var chr3 = Math.ceil(Math.random() * 10)+ '';
		var chr4 = Math.ceil(Math.random() * 10)+ '';
		var captchaCode = chr1 + '' + chr2 + '' + chr3 + '' + chr4;
		$scope.txtCaptcha = captchaCode;
	}
	GenerateCaptcha();
	$scope.finalArray = [];
	$scope.entry = {
		name : "",
		email : '',
		webaddress : '',
		cover : '',
		attchment : '',
		workingFlag : '',
		captcha : ''
	}
	$scope.submitRecord = function(){
		console.error("in submitttttttttttttt");
		console.error("before saving");
		console.error($scope.entry);
		$scope.entry.workingFlag = $scope.entry.checkTrue ? 'Yes' : 'No';
		if($scope.entry.name != '' && $scope.entry.email != '' && $scope.entry.cover != '' && $scope.entry.webaddress != '' && $scope.entry.workingFlag != '' && ($scope.entry.captcha == $scope.txtCaptcha.replace(" ", ""))){
			Todos.create($scope.entry).then(function(data){
			console.error("data saved successfully");
			console.error(data.data);
			});
		}else{
			console.error("correct data requried");
		}
	}

	$scope.reset = function(){
		console.error("in reset");
		Todos.delete();
	}

	$scope.finalArray.push($scope.entry);
}]);
	
