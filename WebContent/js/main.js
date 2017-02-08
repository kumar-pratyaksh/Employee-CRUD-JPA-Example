	var update_emp;
	var delete_id;
var showList=function(){
		//alert("Button clicked");
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee'
			//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			//data: {param1: 'value1'},
		})
		.done(function(data) {
			if(data==null)
				return;
			$("#employee_table, .clickable").empty();
			$("#employee_table, .clickable").html("<thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Department</th></tr></thead><tbody>");
			$("#employee_table, .clickable").show();
			for(i=0;i<data.length;i++){
				if(data[i].department===null)
					name="Undefined";
				else
					name=data[i].department.name;
				$("#employee_table, .clickable").append("<tr>"+
					"<td>"+data[i].id+"</td>"+
					"<td>"+data[i].name+"</td>"+
					"<td>"+data[i].email+"</td>"+
					"<td>"+name+"</td>"+
					"<td style='display:none'>"+data[i].department.id+"</td>");
			}
			$("#employee_table, .clickable").append("</tbody>");
			// bindUpdateTableEvents();
			$('#update_table tr').on("click",function(event) {
				/* Act on the event */
				var rowData=$(this).children("td");
				//console.log(rowData);
				$("#message_update").html("");
				$("#update_id").val(rowData[0].textContent);
				$("#update_name").val(rowData[1].textContent);
				$("#update_email").val(rowData[2].textContent);
				$("#update_department").val(rowData[4].textContent);
				$("#update_form").show();
			});
			$('#delete_table tr').click(function(event) {
				/* Act on the event */
				var rowData=$(this).children("td");
				$("#message_delete").html("");
				 	$("#delete_employee_info").html('<div class="panel panel-success">'+
						'<div class="panel-heading">Employee Info.</div>'+
						'<div class="panel-body">'+
						'<b>Id:</b>'+rowData[0].textContent+'<br/>'+
						'<b>Name:</b>'+rowData[1].textContent+'<br/>'+
						'<b>Email:</b>'+rowData[2].textContent+'<br/>'+
						'<b>Department:</b>'+rowData[3].textContent+'<br/>'+
						'</div></div>');
				 	console.log()
				 	delete_id=rowData[0].textContent;
				 	$("#button_delete").show();
			});
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

$(document).ready(function(){

	showList();
	//udlist();
	//$("#employee_table").hide();
	
	$("#update_form").hide();
	$("#button_delete").hide();
	$("#search_by_id").click(function() {
		if(!$("#employee_id").val()){
			$("#employee_info").html('<div class="alert alert-warning">Empty employee id field.</div>');
			return;
		}

		id=$("#employee_id").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			if(data==null)
				$("#employee_info").html('<div class="alert alert-warning">No employee found with given id</div>');
			else{
				if(data.department==null)
					department="Undefined";
				else
					department=data.department.name;
				$("#employee_info").html('<div class="panel panel-success">'+
					'<div class="panel-heading">Employee Info.</div>'+
					'<div class="panel-body">'+
					'<b>Id:</b>'+data.id+'<br/>'+
					'<b>Name:</b>'+data.name+'<br/>'+
					'<b>Email:</b>'+data.email+'<br/>'+
					'<b>Department:</b>'+department+'<br/>'+
					'</div></div>');
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
	$("#search_by_name").click(function() {
		if(!$("#employee_name").val()){
			$("#employee_info").html('<div class="alert alert-warning">Empty employee name field.</div>');
			return;
		}

		id=$("#employee_name").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/name/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			console.log(data);
			$('#employee_info').html('');
			if(data==null)
				$("#employee_info").html('<div class="alert alert-warning">No employee found with given name</div>');
			else{
				for(i=0;i<data.length;i++){
					$("#employee_info").append('<div class="panel panel-success">'+
					'<div class="panel-heading">Employee Info.</div>'+
					'<div class="panel-body">'+
					'<b>Id:</b>'+data[i].id+'<br/>'+
					'<b>Name:</b>'+data[i].name+'<br/>'+
					'<b>Email:</b>'+data[i].email+'<br/>'+
					'<b>Department:</b>'+data[i].department.name+'<br/>'+
					'</div></div>');
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
	$("#insert_form").submit(function(event) {
		name=$("#name").val();
		email=$("#email").val();
		department=$("#department").val();
		//alert(department);
		var data = {"name":name,"email":email,"departmentId":department};
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee',
			type: 'POST',
			contentType: "application/json",
			data: JSON.stringify(data)
		})
		.done(function() {
			$("#message_insert").html('<div class="alert alert-success">Insertion successful</div>');
			showList();
		})
		.fail(function() {
			$('#message_insert').html('<div class="alert alert-warning">Email already exists</div>');
		})
		.always(function() {
			console.log("complete");
		});
		
		return false;
	});
	$("#update_by_id").click(function(event) {
		$("#message_update").html("");
		id=$("#employee_update_id").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			 if(data==null)
			 	$("#message_update").html('<div class="alert alert-warning">No employee found with given id</div>');
			 else{
			 	$("#update_form").show();
				update_emp=data;
				$("#update_id").val(data.id);
				$("#update_name").val(data.name);
				$("#update_email").val(data.email);
				$("#update_department").val(data.department.id);
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	$('#update_by_name').click(function(event) {
		$('#message_update').html("");
		if(!$("#employee_update_name").val()){
			$("#message_update").html('<div class="alert alert-warning">Empty employee name field.</div>');
			return;
		}

		id=$("#employee_update_name").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/name/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			console.log(data);
			$('#message_update').html('');
			if(data==null)
				$("#message_update").html('<div class="alert alert-warning">No employee found with given name</div>');
			else{
				for(i=0;i<data.length;i++){
					$("#update_by_name_table").empty();
					$("#update_by_name_table").html("<thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Department</th></tr></thead><tbody>");
					//$("#employee_table, .clickable").show();
					for(i=0;i<data.length;i++){
						if(data[i].department===null)
							name="Undefined";
						else
							name=data[i].department.name;
						$("#update_by_name_table").append("<tr>"+
							"<td>"+data[i].id+"</td>"+
							"<td>"+data[i].name+"</td>"+
							"<td>"+data[i].email+"</td>"+
							"<td>"+name+"</td>"+
							"<td style='display:none'>"+data[i].department.id+"</td>");
					}
					$("#update_by_name_table").append("</tbody>");
				}
				$('#update_by_name_table tr').on("click",function(event) {
				/* Act on the event */
				var rowData=$(this).children("td");
				//console.log(rowData);
				$("#message_update").html("");
				$("#update_id").val(rowData[0].textContent);
				$("#update_name").val(rowData[1].textContent);
				$("#update_email").val(rowData[2].textContent);
				$("#update_department").val(rowData[4].textContent);
				$("#update_form").show();
			});
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});	
	});
	$("#update").submit(function(event) {
		var update_data={"name":$("#update_name").val(),"email":$("#update_email").val(),"departmentId":$("#update_department").val()};
		update_data=JSON.stringify(update_data);
		//console.log(update_data);
		id=$("#update_id").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/'+id,
			type: 'PUT',
			contentType: 'application/json',
			data: update_data
		})
		.done(function(data, status) {
			
			//console.log(status);
			if(status==="notmodified"){
				$("#message_update").html('<div class="alert alert-warning">Email address already present.</div>');
				return;
			}
			showList();
			//console.log(this.getResponseHeader());
			$("#message_update").html('<div class="alert alert-success">Employee updated</div>');
			$("#update_by_name_table").empty();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		return false;
	});
	$("#delete_by_id").click(function(event) {
		$("#message_delete").html("");
		id=$("#employee_delete_id").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			 if(data==null)
			 	$("#message_delete").html('<div class="alert alert-warning">No employee found with given id</div>');
			 else{
			 	$("#delete_employee_info").html('<div class="panel panel-success">'+
					'<div class="panel-heading">Employee Info.</div>'+
					'<div class="panel-body">'+
					'<b>Id:</b>'+data.id+'<br/>'+
					'<b>Name:</b>'+data.name+'<br/>'+
					'<b>Email:</b>'+data.email+'<br/>'+
					'<b>Department:</b>'+data.department.name+'<br/>'+
					'</div></div>');
			 	delete_id=data.id;
			 	$("#button_delete").show();
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	$('#delete_by_name').click(function(event) {
		$('#message_delete').html("");
		if(!$("#employee_delete_name").val()){
			$("#message_delete").html('<div class="alert alert-warning">Empty employee name field.</div>');
			return;
		}

		id=$("#employee_delete_name").val();
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/name/'+id,
			type: 'GET'
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(data) {
			//console.log(data);
			$('#message_delete').html('');
			if(data==null)
				$("#message_delete").html('<div class="alert alert-warning">No employee found with given name</div>');
			else{
				for(i=0;i<data.length;i++){
					$("#delete_by_name_table").empty();
					$("#delete_by_name_table").html("<thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Department</th></tr></thead><tbody>");
					//$("#employee_table, .clickable").show();
					for(i=0;i<data.length;i++){
						if(data[i].department===null)
							name="Undefined";
						else
							name=data[i].department.name;
						$("#delete_by_name_table").append("<tr>"+
							"<td>"+data[i].id+"</td>"+
							"<td>"+data[i].name+"</td>"+
							"<td>"+data[i].email+"</td>"+
							"<td>"+name+"</td>"+
							"<td style='display:none'>"+data[i].department.id+"</td>");
					}
					$("#delete_by_name_table").append("</tbody>");
				}
				$('#delete_by_name_table tr').on("click",function(event) {
				/* Act on the event */
				var rowData=$(this).children("td");
				$("#message_delete").html("");
				 	$("#delete_employee_info").html('<div class="panel panel-success">'+
						'<div class="panel-heading">Employee Info.</div>'+
						'<div class="panel-body">'+
						'<b>Id:</b>'+rowData[0].textContent+'<br/>'+
						'<b>Name:</b>'+rowData[1].textContent+'<br/>'+
						'<b>Email:</b>'+rowData[2].textContent+'<br/>'+
						'<b>Department:</b>'+rowData[3].textContent+'<br/>'+
						'</div></div>');
				 	console.log()
				 	delete_id=rowData[0].textContent;
				 	$("#button_delete").show();
			});
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});	
	});
	$("#button_delete").click(function(event) {
		$.ajax({
			url: 'http://localhost:8080/MultipleEntities/employee/'+delete_id,
			type: 'DELETE',
		})
		.done(function() {
			// console.log("success");
			$("#message_delete").html("<div class='alert alert-success'>Employee deleted</div>");
			$('#delete_employee_info').html('');
			$('#button_delete').hide();
			$('#delete_by_name_table').empty();
			showList();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	// var bindUpdateTableEvents = function(){
	// 	console.log(' in bindUpdateTableEvents');
	// 	$('#update_table tr').on("click",function(event) {
	// 		/* Act on the event */
	// 		var rowData=$(this).children("td");
	// 		console.log(rowData);
	// 		alert(rowData);
	// 	});
	// }
	//console.log('lajslkdfjsldf', $('#update_table tr'));
	

});	
	// $('a[href="#list"]').on('shown.bs.tab', function(event) {
	// 	//alert("working");
	// 	showList();
	// });

