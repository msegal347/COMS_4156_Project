import EntityService from '../../src/services/entityService';
import { resourceService } from '../../src/services/resourceService';
import { transactionService } from '../../src/services/transactionService';
import { getRouteById } from '../../src/services/logisticsService';
import { notificationService } from '../../src/services/notificationService';
import { getRecordById } from '../../src/services/analyticsService';

describe('MongoDB', () => {
  it('should have the correct seed data', () => {
    expect(EntityService.getEntityById('test_entity')).toBe({ entityID: 'test_entity', role: 'source', apiKey: 'key', coordinates: { latitude: 0.5, longitude: 0.5 } });
    expect(resourceService.getResourceById('test_resource')).toBe({ resourceID: 'test_resource', metadata: { type: 'type', quantity: 0, expirationDate: new Date() } });
    expect(transactionService.getTransactionById('test_transaction')).toBe({ transactionID: 'test_transaction', sourceID: 'test_entity', sinkID: 'test_entity', resourceID: 'test_resource', timestamp: new Date() });
    expect(getRouteById('test_logistics')).toBe({ logisticsID: 'test_logistics', pickupLocation: { latitude: 0.5, longitude: 0.5 }, dropOffLocation: { latitude: 0.5, longitude: 0.5 }, status: 'scheduled' });
    expect(notificationService.getNotifications(null)[0]).toBe({ notificationID: 'test_notification', type: 'type', status: 'sent' });
    expect(getRecordById('test_analytics')).toBe({ analyticsID: 'test_analytics', data: {} });
  });
});
