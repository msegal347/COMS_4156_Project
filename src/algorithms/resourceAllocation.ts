export type Source = { id: string; resourceType: string; quantity: number };
export type Sink = { id: string; resourceType: string; requiredQuantity: number };
export type Match = { sourceId: string; sinkId: string; allocatedQuantity: number };

export const allocateResources = (sources: Source[], sinks: Sink[]): Match[] => {
  const matches: Match[] = [];

  // Loop through each sink
  for (const sink of sinks) {
    let remainingRequirement = sink.requiredQuantity;

    // Loop through each source until the sink's requirement is met or sources are exhausted
    for (const source of sources) {
      if (source.resourceType === sink.resourceType && source.quantity > 0 && remainingRequirement > 0) {
        const allocation = Math.min(source.quantity, remainingRequirement);
        matches.push({ sourceId: source.id, sinkId: sink.id, allocatedQuantity: allocation });

        // Update the remaining requirement and the source's available quantity
        remainingRequirement -= allocation;
        source.quantity -= allocation;

        // If the sink's requirement is fully met, break from the inner loop
        if (remainingRequirement === 0) break;
      }
    }
  }

  return matches;
};
