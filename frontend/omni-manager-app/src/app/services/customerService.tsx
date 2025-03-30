import { client, account } from '../appwrite';
import { ID } from 'appwrite';
import { Databases } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

// Initialize the Appwrite Databases service
const databases = new Databases(client);

// Replace with your actual database ID and collection ID
const DATABASE_ID = "67e8f48c0021c6cafdc1";
const COLLECTION_ID = "67e90145003193b591f2";

interface Customer {
  name: string;
  org: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  status?: string;
  userId?:string;
  customerId:string;
}

export const CustomerService = {
  async createCustomer(customerData: Customer): Promise<any> {
    try {
      // Ensure user is authenticated
      const user = await account.get();
      if (!user) throw new Error('User not authenticated');

      // Add default status if not provided
      const customerGuid:string = uuidv4()
      const completeCustomer = {
        ...customerData,
        status: customerData.status || 'Active',
        userId: user.$id,
        customerId: customerGuid
      };
      console.log(completeCustomer)

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        completeCustomer
      );

      return response;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  async listCustomers(): Promise<any> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      console.error('Error listing customers:', error);
      throw error;
    }
  }
};