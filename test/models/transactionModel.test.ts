import Transaction from '../../src/models/transactionModel'; // Update the path accordingly
import mongoose from 'mongoose';

describe('Transaction Model', () => {
    it('should have the correct schema', () => {
        const schemaKeys = Object.keys(Transaction.schema.paths);
        const expectedKeys = [
          'userId',
          'amount',
          'type',
          '_id',
          '__v'
        ];
        expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
      });
    
      it('should have userId as required', () => {
        const isUserIdRequired = (Transaction.schema.path('userId') as any).isRequired;
        expect(isUserIdRequired).toBeTruthy();
      });
    
      it('should have amount as required', () => {
        const isAmountRequired = (Transaction.schema.path('amount') as any).isRequired;
        expect(isAmountRequired).toBeTruthy();
      });
    
      it('should have card type as required', () => {
        const isCardRequired = (Transaction.schema.path('type') as any).isRequired;
        expect(isCardRequired).toBeTruthy();
      });
  
});
