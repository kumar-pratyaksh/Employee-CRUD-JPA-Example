package org.proptiger.repository;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.proptiger.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Transactional
@Service
public class EmployeeDao {

	@Autowired
	private EmployeeRepository repository;
	
	public boolean insert(Employee e){
		Employee e1=repository.save(e);
		if(e1==null)
			return false;
		return true;
	}
	
	public List<Employee> getAll(){
		return repository.findAll();
	}
	
	public List<Employee> getByName(String name){
		 //System.out.println(repository.findByNameContainingIgnoreCase(name));
		return repository.findByNameContainingIgnoreCase(name);
	}
	
	public Employee getById(Long id){
		return repository.findOne(id);
	}
	
	public Employee update(Long id,Employee e) throws SQLIntegrityConstraintViolationException{
		Employee existing=repository.findOne(id);
		if(existing==null)
			return null;
		existing.setName(e.getName());
		existing.setEmail(e.getEmail());
		existing.setDepartmentId(e.getDepartmentId());
		return existing;
	}
	
	public void delete(Long id){
		repository.delete(id);
	}

}
