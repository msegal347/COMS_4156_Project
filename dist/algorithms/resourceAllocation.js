"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocateResources = void 0;
/**
 * Allocates resources from sources to sinks based on their types and quantities.
 *
 * @param sources - Array of sources with available resources
 * @param sinks - Array of sinks requiring resources
 *
 * @returns An array of matches detailing the allocations
 */
const allocateResources = (sources, sinks) => {
    // initialize matches array
    const matches = [];
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
exports.allocateResources = allocateResources;
//# sourceMappingURL=resourceAllocation.js.map