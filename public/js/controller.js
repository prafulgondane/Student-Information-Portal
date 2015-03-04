function ServicesCtrl($scope, $http){

	$scope.create = function(r,n,g){

		if(angular.isDefined(r) && angular.isDefined(n) && angular.isDefined(g)){
			if(n != '' && r != '' && g != ''){

				$http.post('/insertServiceData',$scope.serviceData)
					 .success(function(response){
					 	console.log('Insertion successful.......');
					 	$scope.getAll();
					 	$scope.serviceData.rollno = '';
					 	$scope.serviceData.name = '';
					 	$scope.serviceData.grade = '';
					 });

				$scope.msg_i= '';	

			}
			else
			{
				$scope.msg_i = 'Insufficient Data';
			}
		}
		else
		{
			$scope.msg_i = 'Insufficient Data';
		}

	}

	
	$scope.remove = function(id){
		//console.log(id);
		$http.delete('/removeServiceData/' + id)
			 .success(function(response){
				$scope.getAll();
			 });
	}

	$scope.select = function(id){
		//console.log(id);
		$http.get('/selectServiceData/' + id)
			 .success(function(response){
			 	$scope.updateServiceData = response;
			 });
	}

	$scope.update = function(r, n, g){
		
		if(angular.isDefined(r) && angular.isDefined(n) && angular.isDefined(g)){
			if(n != '' && r != '' && g != ''){

				$http.put('/updateServiceData/' + $scope.updateServiceData._id, $scope.updateServiceData)
					 .success(function(response){
					 	$scope.getAll();
					 	$scope.updateServiceData = '';
					 });

				$scope.msg_u = '';

			}
			else
			{
				$scope.msg_u = 'Insufficient Data';
			}
		}
		else
		{
			$scope.msg_u = 'Insufficient Data';
		}

	}



	$scope.getAll = function(){
	    $http.get('/serviceGetData')
	    	 .success(function(response){
	    	 	$scope.serviceClients = response;
	    	 	console.log($scope.serviceClients);
	    	 });
    }

    $scope.find = function(r){
    	console.log(r);
    	$http.get('/serviceOneGetData/' + r)
    		 .success(function(response){
    		 		$scope.findClients = response;
    		 		console.log($scope.findClients);
    		 });

    }

    $scope.getAll();
}


/*
	var src1 = {
		rollno	: 101,
		name 	: "LinkedIn",
		grade	: "A"
	};

	var src2 = {
		rollno : 102,
		name : "Facebook",
		grade	: "B"
	};

	var src3 = {
		rollno : 103,
		name : "IMDB",
		grade	: "C"
	};

	var serviceClients = [src1, src2, src3];

	$scope.serviceClients = serviceClients;	
*/