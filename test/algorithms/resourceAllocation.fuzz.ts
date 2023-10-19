import { allocateResources, Source, Sink, Match } from '../../src/algorithms/resourceAllocation';
import "@jazzer.js/jest-runner/jest-extension";

describe('Resource Allocation', () => {
  it.fuzz('should correctly allocate resources', () => {
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
});
