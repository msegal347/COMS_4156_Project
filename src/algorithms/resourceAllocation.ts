type Source = { id: string; resourceType: string; quantity: number };
type Sink = { id: string; resourceType: string; requiredQuantity: number };
type Match = { sourceId: string; sinkId: string; allocatedQuantity: number };

export const allocateResources = (sources: Source[], sinks: Sink[]): Match[] => {
  const matches: Match[] = [];

  for (const sink of sinks) {
    for (const source of sources) {
      if (source.resourceType === sink.resourceType && source.quantity >= sink.requiredQuantity) {
        matches.push({
          sourceId: source.id,
          sinkId: sink.id,
          allocatedQuantity: sink.requiredQuantity,
        });

        source.quantity -= sink.requiredQuantity;
        break;
      }
    }
  }

  return matches;
};
