package org.proptiger.controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.proptiger.model.Employee;
import org.proptiger.repository.EmployeeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class Controller {

	@Autowired
	private EmployeeDao service;
	
	@RequestMapping(value="/test")
	public String test(){
		return "Success";
	}
	
	@RequestMapping(value="/employee",method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@RequestBody Employee e){
		System.out.println(e.getId());
		if(service.insert(e))
			return new ResponseEntity<Void>(HttpStatus.OK);
		return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
	}
	
	@RequestMapping(value="/employee",method=RequestMethod.GET)
	public ResponseEntity<List<Employee>> getAll(){
		List<Employee> list=service.getAll();
		if(list.isEmpty())
			return new ResponseEntity<List<Employee>>(HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Employee>>(list,HttpStatus.OK);
	}

	@RequestMapping(value="/employee/name/{name}",method=RequestMethod.GET)
	public ResponseEntity<List<Employee>> getByName(@PathVariable String name){
		List<Employee> list=service.getByName(name);
		if(list.isEmpty())
			return new ResponseEntity<List<Employee>>(HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Employee>>(list,HttpStatus.OK);
	}
	
	@RequestMapping(value="/employee/{id}",method=RequestMethod.GET)
	public ResponseEntity<Employee> getById(@PathVariable Integer id){
		Employee e=service.getById(Long.valueOf(id));
		if(e==null)
			return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
		return new ResponseEntity<Employee>(e,HttpStatus.OK);
	}
	
	@RequestMapping(value="/employee/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody Employee e,@PathVariable Long id){
		try{
		service.update(id,e);
		return new ResponseEntity<Void>(HttpStatus.OK);
		}catch (Exception exception) {
			// TODO: handle exception
			return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
		}
	}
	
	@RequestMapping(value="/employee/{id}",method=RequestMethod.DELETE)
	public void delete(@PathVariable Long id){
		service.delete(id);
	}
	
}
