package org.proptiger.repository;

import java.util.List;

import org.proptiger.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	public List<Employee> findByNameContainingIgnoreCase(String name);
}
