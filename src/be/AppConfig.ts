import dotenv from "dotenv";
dotenv.config();

export class AppConfig {
  public static readonly APP_PORT = {
    value: process.env.APP_PORT || "3031",
    isRequired: true,
    isSecret: false,
  };

  public static readonly MONGO_CONNECTION_STRING = {
    value: process.env.MONGO_CONNECTION_STRING,
    isRequired: true,
    isSecret: false,
  };

  public static readonly MONGO_PASSWORD = {
    value: process.env.MONGO_PASSWORD,
    isRequired: true,
    isSecret: true,
  };

  private static checkRequiredEnvVars() {
    const requiredEnvVars = Object.entries(this).filter(([_, value]) => value.isRequired && typeof value === "object");
    const missingEnvVars = requiredEnvVars.filter(([_, value]) => !value.value);
    if (missingEnvVars.length > 0) {
      console.error(`Missing required environment variables: ${missingEnvVars.map(([key]) => key).join(", ")}`);
      process.exit(1);
    }
  }

  private static printEnvVars() {
    const envVars = Object.entries(this).filter(([_, value]) => typeof value === "object");
    console.log("\n------------Environment variables------------");
    envVars.forEach(([key, value]) => {
      const displayValue = value.isSecret ? "*****" : value.value;
      console.log(`${key}: ${displayValue}`);
    });
    console.log("--------------------------------------------\n");
  }

  static {
    this.checkRequiredEnvVars();
    this.printEnvVars();
  }
}
