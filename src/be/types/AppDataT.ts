export type Environment = "dev" | "staging" | "prod";

export type DomainConfig = {
  FE_X_DOMAIN: string;
  LANDING_X_DOMAIN: string;
  API_X_DOMAIN: string;
};

export type AppData = Record<Environment, DomainConfig>;
