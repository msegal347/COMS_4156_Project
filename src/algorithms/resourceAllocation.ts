export type Source = { id: string; resourceType: string; quantity: number };
export type Sink = { id: string; resourceType: string; requiredQuantity: number };
export type Match = { sourceId: string; sinkId: string; allocatedQuantity: number };


/**
 * Allocates resources from sources to sinks based on their types and quantities.
 * 
 * @param sources - Array of sources with available resources
 * @param sinks - Array of sinks requiring resources
 * 
 * @returns An array of matches detailing the allocations
 */
export const allocateResources = (sources: Source[], sinks: Sink[]): Match[] => {
  // initialize matches array
  const matches: Match[] = [];

  // Loop through sinks and sources to find matches
  for (const sink of sinks) {
    for (const source of sources) {
      // If the source and sink have the same resource type and the source has enough quantity
      //allocate the required quantity
      if (source.resourceType === sink.resourceType && source.quantity >= sink.requiredQuantity) {
        // Add the match to the matches array
        matches.push({
          sourceId: source.id,
          sinkId: sink.id,
          allocatedQuantity: sink.requiredQuantity,
        });
        // Update the source quantity
        source.quantity -= sink.requiredQuantity;
        break;
      }
    }
  }
  
  // Return the matches array
  return matches;
};
