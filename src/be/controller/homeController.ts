import { Request, Response } from "express";
import axios from "axios";
import { appData } from "../AppData"; // path may differ based on structure
import { AppData, Environment } from "../types/AppDataT";

export const getAllEnvData = async (_req: Request, res: Response) => {
  try {
    const result: Record<Environment, any[]> = {
      dev: [],
      staging: [],
      prod: [],
    };

    const environments = Object.keys(appData) as Environment[];

    for (const env of environments) {
      const { FE_X_DOMAIN, API_X_DOMAIN } = appData[env];

      const urls = [`https://${FE_X_DOMAIN}/assets/build.json`, `https://${FE_X_DOMAIN}/config.json`, `https://${API_X_DOMAIN}/web/build`];

      for (const url of urls) {
        try {
          const response = await axios.get(url);
          result[env].push({ url, data: response.data });
        } catch (err: any) {
          result[env].push({
            url,
            error: err.message || "Failed to fetch",
          });
        }
      }
    }

    res.json({
      appData,
      fetchedData: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
