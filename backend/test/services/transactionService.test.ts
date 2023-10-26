// Import only for type information and mocking
import * as transactionService from '../../src/services/transactionService';
import Transaction from '../../src/models/transactionModel'; 
import { Types } from 'mongoose';

jest.mock('../../src/models/transactionModel');



describe('transactionService', () => {
    it('should crate a new transaction correctly', async () => {
        const mockUserId = new Types.ObjectId(1);
        const mockData = { userId: mockUserId, amount: 100, type: "credit", save: jest.fn()};
        
        
        (Transaction as jest.MockedClass<typeof Transaction>).mockImplementation(() => {
            return mockData as any;
          });
        mockData.save.mockResolvedValueOnce(mockData);

        const result = await transactionService.transactionService.createTransaction(mockData);

        //Assertations
        expect(result).toEqual(mockData);
        expect(result).toBeDefined();
        expect(result.userId).toEqual(mockUserId);
        expect(result.amount).toEqual(100);
        expect(result.type).toEqual('credit');
    });
    


});


