import { AppData } from "./types/AppDataT.js";

export const appData: AppData = {
  dev: {
    FE_X_DOMAIN: "dev.rundwn.live",
    LANDING_X_DOMAIN: "landing-dev.rundwn.live",
    API_X_DOMAIN: "api-dev.rundwn.live",
  },
  staging: {
    FE_X_DOMAIN: "staging.rundwn.live",
    LANDING_X_DOMAIN: "landing-staging.rundwn.live",
    API_X_DOMAIN: "api-staging.rundwn.live",
  },
  prod: {
    FE_X_DOMAIN: "app.rundwn.live",
    LANDING_X_DOMAIN: "landing.rundwn.live",
    API_X_DOMAIN: "api.rundwn.live",
  },
};
