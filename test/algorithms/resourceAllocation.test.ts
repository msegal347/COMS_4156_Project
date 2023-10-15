import { allocateResources } from '../../src/algorithms/resourceAllocation';

describe('Resource Allocation Algorithm', () => {
  it('should correctly allocate resources from sources to sinks', () => {
    const sources = [
      { id: 's1', resourceType: 'food', quantity: 50 },
      { id: 's2', resourceType: 'water', quantity: 100 },
    ];
    const sinks = [
      { id: 'sk1', resourceType: 'food', requiredQuantity: 20 },
      { id: 'sk2', resourceType: 'water', requiredQuantity: 50 },
      { id: 'sk3', resourceType: 'food', requiredQuantity: 30 },
    ];

    const expectedMatches = [
      { sourceId: 's1', sinkId: 'sk1', allocatedQuantity: 20 },
      { sourceId: 's2', sinkId: 'sk2', allocatedQuantity: 50 },
      { sourceId: 's1', sinkId: 'sk3', allocatedQuantity: 30 },
    ];

    const result = allocateResources(sources, sinks);

    expect(result).toEqual(expectedMatches);
  });
});
