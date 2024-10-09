
import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id: Uuid;
  name: string;
  price: number;
}

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity() {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it('should insert entity', async () => {
    const entity = new StubEntity({ entity_id: new Uuid(), name: 'test', price: 100 });
    await repo.insert(entity);

    const entities = await repo.findAll();
    expect(entities.length).toBe(1);
    expect(entities[0]).toEqual(entity);
  })

  it('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({ entity_id: new Uuid(), name: 'test1', price: 100 }),
      new StubEntity({ entity_id: new Uuid(), name: 'test2', price: 200 }),
    ];
    await repo.bulkInsert(entities);

    const allEntities = await repo.findAll();
    expect(allEntities.length).toBe(2);
    expect(allEntities).toEqual(entities);
  })

  it('should update entity', async () => {
    const entity = new StubEntity({ entity_id: new Uuid(), name: 'test', price: 100 });
    await repo.insert(entity);

    const updatedEntity = new StubEntity({ entity_id: entity.entity_id, name: 'updated', price: 200 });
    await repo.update(updatedEntity);

    const entities = await repo.findAll();
    expect(entities.length).toBe(1);
    expect(entities[0]).toEqual(updatedEntity);
  })

  it('should delete entity', async () => {
    const entity = new StubEntity({ entity_id: new Uuid(), name: 'test', price: 100 });
    await repo.insert(entity);

    await repo.delete(entity.entity_id);

    const entities = await repo.findAll();
    expect(entities.length).toBe(0);
  })

  it('should throws error on delete when entity not found', async () => {
    const uuid = new Uuid();
    expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid.id, StubEntity)
    )
  });

  it('should find entity by id', async () => {
    const entity = new StubEntity({ entity_id: new Uuid(), name: 'test', price: 100 });
    await repo.insert(entity);

    const foundEntity = await repo.findById(entity.entity_id);
    expect(foundEntity).toEqual(entity);
  })

  it('should return null when entity not found by id', async () => {
    const entity = new StubEntity({ entity_id: new Uuid(), name: 'test', price: 100 });
    await repo.insert(entity);

    const foundEntity = await repo.findById(new Uuid());
    expect(foundEntity).toBeNull();
  })

  it('should find all entities', async () => {
    const entities = [
      new StubEntity({ entity_id: new Uuid(), name: 'test1', price: 100 }),
      new StubEntity({ entity_id: new Uuid(), name: 'test2', price: 200 }),
    ];
    await repo.bulkInsert(entities);

    const allEntities = await repo.findAll();
    expect(allEntities.length).toBe(2);
    expect(allEntities).toEqual(entities);
  })
})