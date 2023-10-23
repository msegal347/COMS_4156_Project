import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: any;

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

beforeAll(async () => {
  const mongoUri = "mongodb://localhost:27017/testDB";
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
});



afterAll(async () => {
  await mongoose.disconnect();
});

describe('MongoDB', () => {
  it('should create & save item successfully', async () => {
    const itemData = { name: 'Item1' };
    const validItem = new Item(itemData);
    const savedItem = await validItem.save();

    expect(savedItem._id).toBeDefined();
    expect(savedItem.name).toBe(itemData.name);
  });

  it('should update an item', async () => {
    const itemData = { name: 'Item2' };
    const item = new Item(itemData);
    await item.save();

    item.name = 'NewItem2';
    const updatedItem = await item.save();

    expect(updatedItem._id).toBeDefined();
    expect(updatedItem.name).toBe('NewItem2');
  });

  it('should delete an item', async () => {
    const itemData = { name: 'Item3' };
    const item = new Item(itemData);
    await item.save();
    
    await Item.findByIdAndDelete(item._id);
    const deletedItem = await Item.findById(item._id);

    expect(deletedItem).toBeNull();
  });
});

