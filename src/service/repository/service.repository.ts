import { EntityRepository, Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {}
