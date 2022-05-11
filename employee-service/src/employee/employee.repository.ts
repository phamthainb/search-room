import { EntityRepository, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
