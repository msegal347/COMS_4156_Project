import { allocateResources, Source, Sink, Match } from '../../src/algorithms/resourceAllocation';

describe('Resource Allocation', () => {
  it('should correctly allocate resources', () => {
    const sources: Source[] = [
      { id: '1', resourceType: 'Food', quantity: 100 },
      { id: '2', resourceType: 'Water', quantity: 200 },
    ];

    const sinks: Sink[] = [
      { id: '3', resourceType: 'Food', requiredQuantity: 50 },
      { id: '4', resourceType: 'Water', requiredQuantity: 100 },
    ];

    const expectedMatches: Match[] = [
      { sourceId: '1', sinkId: '3', allocatedQuantity: 50 },
      { sourceId: '2', sinkId: '4', allocatedQuantity: 100 },
    ];

    const matches = allocateResources(sources, sinks);
    expect(matches).toEqual(expectedMatches);
  });

  it('should return an empty array if sources are empty', () => {
    const sources: Source[] = [];
    const sinks: Sink[] = [{ id: '1', resourceType: 'Food', requiredQuantity: 50 }];
    const matches = allocateResources(sources, sinks);
    expect(matches).toEqual([]);
  });

  it('should return an empty array if sinks are empty', () => {
    const sources: Source[] = [{ id: '1', resourceType: 'Food', quantity: 100 }];
    const sinks: Sink[] = [];
    const matches = allocateResources(sources, sinks);
    expect(matches).toEqual([]);
  });

  it('should not allocate resources of different types', () => {
    const sources: Source[] = [{ id: '1', resourceType: 'Food', quantity: 100 }];
    const sinks: Sink[] = [{ id: '1', resourceType: 'Water', requiredQuantity: 50 }];
    const matches = allocateResources(sources, sinks);
    expect(matches).toEqual([]);
  });

  it('should not allocate if source quantity is insufficient', () => {
    const sources: Source[] = [{ id: '1', resourceType: 'Food', quantity: 20 }];
    const sinks: Sink[] = [{ id: '1', resourceType: 'Food', requiredQuantity: 50 }];
    const matches = allocateResources(sources, sinks);
    expect(matches).toEqual([]);
  });
});
