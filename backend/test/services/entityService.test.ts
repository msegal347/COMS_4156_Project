import EntityService from '../../src/services/entityService';
import { Entity } from '../../src/models/entityModel';

// Mock the Entity model
jest.mock('../../src/models/entityModel');

describe('EntityService', () => {
  
  // Test: createEntity()
  it('should call EntityService.createEntity and return the result', async () => {
    const mockData = { name: 'testEntity', attribute: 'attribute', type: 'type', isActive: true };
    const mockEntityInstance = { ...mockData, save: jest.fn() };
    const mockResult = mockEntityInstance;

    // Mock the save method to resolve with mockResult
    mockEntityInstance.save.mockResolvedValueOnce(mockResult);

    // Mock the Entity constructor to return an instance with a mock save method
    (Entity as jest.MockedClass<typeof Entity>).mockImplementation(() => {
      return mockEntityInstance as any;
    });

    const result = await EntityService.createEntity(mockData as any);

    expect(result).toEqual(mockResult);
  });

  // Test: getAllEntities()
  it('should call EntityService.getAllEntities and return an array of entities', async () => {
    const mockResult = [{ name: 'entity1' }, { name: 'entity2' }];
    
    Entity.find = jest.fn().mockResolvedValue(mockResult);

    const result = await EntityService.getAllEntities();

    expect(result).toEqual(mockResult);
  });

  // Test: getEntityById()
  it('should call EntityService.getEntityById and return an entity', async () => {
    const mockResult = { name: 'entity1', id: 'someId' };
    
    Entity.findById = jest.fn().mockResolvedValue(mockResult);

    const result = await EntityService.getEntityById('someId');

    expect(result).toEqual(mockResult);
  });

  // Test: updateEntityById()
  it('should call EntityService.updateEntityById and return updated entity', async () => {
    const mockData = { name: 'updatedEntity' };
    const mockResult = { ...mockData };
    
    Entity.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResult);

    const result = await EntityService.updateEntityById('someId', mockData as any);

    expect(result).toEqual(mockResult);
  });

  // Test: deleteEntityById()
  it('should call EntityService.deleteEntityById and return true', async () => {
    Entity.findByIdAndDelete = jest.fn().mockResolvedValue(true);

    const result = await EntityService.deleteEntityById('someId');

    expect(result).toBe(true);
  });
});
