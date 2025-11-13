import mongoose from 'mongoose';
import { AppConfig } from './AppConfig';

export class Database {
  private static instance: Database;
  
  private constructor() {}
  
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  public async connect(): Promise<boolean> {
    try {
      const connectionString = AppConfig.MONGO_CONNECTION_STRING.value!.replace(
        '<db_password>', 
        AppConfig.MONGO_PASSWORD.value!
      );
      
      await mongoose.connect(connectionString);
      console.log('✅ Connected to MongoDB');
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      return false;
    }
  }
  
  public async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      if (mongoose.connection.readyState !== 1) {
        await this.connect();
      }
      
      // Test with a simple operation
      const admin = mongoose.connection.db?.admin();
      const result = await admin?.ping();
      
      return {
        success: true,
        message: 'MongoDB connection successful',
        details: {
          readyState: mongoose.connection.readyState,
          host: mongoose.connection.host,
          name: mongoose.connection.name,
          ping: result
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'MongoDB connection failed',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}