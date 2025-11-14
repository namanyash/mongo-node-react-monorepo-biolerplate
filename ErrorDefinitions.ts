import { ErrorDetail } from "../types/Logger.types";

// ============================================================================
// ERROR DEFINITIONS
// ============================================================================

// Database & Connection Errors (500) - Require Support Contact
const DATABASE_ERRORS: Record<string, ErrorDetail> = {
  CONNECTION_FAILED: {
    errorMsg: "Database connection failed. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  QUERY_FAILED: {
    errorMsg: "Database query failed. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  TRANSACTION_FAILED: {
    errorMsg: "Database transaction failed. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  CONNECTION_TIMEOUT: {
    errorMsg: "Database connection timeout. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
};

// Authentication & User Errors (400/401) - User Fixable
const AUTH_ERRORS: Record<string, ErrorDetail> = {
  INVALID_CREDENTIALS: {
    errorMsg: "Invalid email or password. Please check your credentials and try again.",
    errorCode: 401,
    supportContact: false,
  },
  TOKEN_EXPIRED: {
    errorMsg: "Your session has expired. Please sign in again.",
    errorCode: 401,
    supportContact: false,
  },
  TOKEN_INVALID: {
    errorMsg: "Invalid authentication token. Please sign in again.",
    errorCode: 401,
    supportContact: false,
  },
  USER_NOT_FOUND: {
    errorMsg: "User account not found. Please check your email or create a new account.",
    errorCode: 404,
    supportContact: false,
  },
  EMAIL_ALREADY_EXISTS: {
    errorMsg: "An account with this email already exists. Please use a different email or sign in.",
    errorCode: 400,
    supportContact: false,
  },
  UNAUTHORIZED: {
    errorMsg: "You are not authorized to perform this action.",
    errorCode: 403,
    supportContact: false,
  },
  ACCOUNT_LOCKED: {
    errorMsg: "Your account has been temporarily locked. Please try again later or contact support.",
    errorCode: 423,
    supportContact: true,
  },
  EMAIL_NOT_VERIFIED: {
    errorMsg: "Please verify your email address before signing in. Check your inbox for a verification email.",
    errorCode: 401,
    supportContact: false,
  },
  VERIFICATION_TOKEN_INVALID: {
    errorMsg: "Invalid or expired verification token. Please request a new verification email.",
    errorCode: 400,
    supportContact: false,
  },
  EMAIL_ALREADY_VERIFIED: {
    errorMsg: "This email address has already been verified.",
    errorCode: 400,
    supportContact: false,
  },
  INVALID_TOKEN: {
    errorMsg: "Invalid authentication token. Please sign in again.",
    errorCode: 401,
    supportContact: false,
  },
  REFRESH_TOKEN_REQUIRED: {
    errorMsg: "Refresh token is required. Please sign in again.",
    errorCode: 401,
    supportContact: false,
  },
  INVALID_REFRESH_TOKEN: {
    errorMsg: "Invalid or expired refresh token. Please sign in again.",
    errorCode: 401,
    supportContact: false,
  },
  EMAIL_VERIFICATION_RATE_LIMIT_EXCEEDED: {
    errorMsg: "Too many verification email requests. You can send a maximum of 3 verification emails per hour.",
    errorCode: 429,
    supportContact: false,
  },
  EMAIL_VERIFICATION_TEMPORARILY_BLOCKED: {
    errorMsg: "You have reached the limit of verification email requests. Please wait before requesting another email.",
    errorCode: 429,
    supportContact: false,
  },
};

// Validation & Input Errors (400) - User Fixable
const VALIDATION_ERRORS: Record<string, ErrorDetail> = {
  INVALID_EMAIL: {
    errorMsg: "Please enter a valid email address.",
    errorCode: 400,
    supportContact: false,
  },
  PASSWORD_TOO_WEAK: {
    errorMsg: "Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.",
    errorCode: 400,
    supportContact: false,
  },
  REQUIRED_FIELD_MISSING: {
    errorMsg: "Required fields are missing. Please fill in all required information.",
    errorCode: 400,
    supportContact: false,
  },
  INVALID_DATE_FORMAT: {
    errorMsg: "Please enter a valid date in the correct format.",
    errorCode: 400,
    supportContact: false,
  },
  INVALID_DATE_RANGE: {
    errorMsg: "End date must be after start date. Please select valid dates.",
    errorCode: 400,
    supportContact: false,
  },
  GUEST_COUNT_INVALID: {
    errorMsg: "Guest count must be between 1 and 20 adults, and 0 to 10 children.",
    errorCode: 400,
    supportContact: false,
  },
};

// Business Logic Errors (400/409) - Mixed
const BUSINESS_ERRORS: Record<string, ErrorDetail> = {
  SEARCH_NO_RESULTS: {
    errorMsg: "No destinations found matching your criteria. Please try different search terms.",
    errorCode: 404,
    supportContact: false,
  },
  BOOKING_UNAVAILABLE: {
    errorMsg: "This destination is not available for the selected dates. Please choose different dates.",
    errorCode: 409,
    supportContact: false,
  },
  RATE_LIMIT_EXCEEDED: {
    errorMsg: "Too many requests. Please wait a moment before trying again.",
    errorCode: 429,
    supportContact: false,
  },
  SERVICE_TEMPORARILY_UNAVAILABLE: {
    errorMsg: "This service is temporarily unavailable. Please try again later.",
    errorCode: 503,
    supportContact: true,
  },
};

// External API Errors (500/502/503) - Require Support Contact
const EXTERNAL_API_ERRORS: Record<string, ErrorDetail> = {
  MAPS_API_ERROR: {
    errorMsg: "Unable to load map data. Please try again later.",
    errorCode: 502,
    supportContact: true,
  },
  WEATHER_API_ERROR: {
    errorMsg: "Unable to load weather information. Please try again later.",
    errorCode: 502,
    supportContact: true,
  },
  BOOKING_API_ERROR: {
    errorMsg: "Booking service is currently unavailable. Please try again later.",
    errorCode: 503,
    supportContact: true,
  },
  PAYMENT_API_ERROR: {
    errorMsg: "Payment processing is currently unavailable. Please try again later.",
    errorCode: 503,
    supportContact: true,
  },
  EMAIL_SEND_FAILED: {
    errorMsg: "Unable to send email. Please try again later or contact support.",
    errorCode: 502,
    supportContact: true,
  },
};

// File & Upload Errors (400/413) - User Fixable
const FILE_ERRORS: Record<string, ErrorDetail> = {
  FILE_TOO_LARGE: {
    errorMsg: "File size exceeds the maximum limit of 10MB. Please choose a smaller file.",
    errorCode: 413,
    supportContact: false,
  },
  INVALID_FILE_TYPE: {
    errorMsg: "Invalid file type. Please upload images in JPG, PNG, or WebP format.",
    errorCode: 400,
    supportContact: false,
  },
  FILE_UPLOAD_FAILED: {
    errorMsg: "File upload failed. Please try again.",
    errorCode: 500,
    supportContact: true,
  },
  FILE_NOT_FOUND: {
    errorMsg: "The requested file was not found.",
    errorCode: 404,
    supportContact: false,
  },
};

// System & Infrastructure Errors (500) - Require Support Contact
const SYSTEM_ERRORS: Record<string, ErrorDetail> = {
  INTERNAL_SERVER_ERROR: {
    errorMsg: "An unexpected error occurred. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  CONFIGURATION_ERROR: {
    errorMsg: "System configuration error. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  MEMORY_ERROR: {
    errorMsg: "System memory error. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  DISK_SPACE_ERROR: {
    errorMsg: "System storage error. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  UNKNOWN_ERROR: {
    errorMsg: "An unknown error occurred. Please try again later.",
    errorCode: 500,
    supportContact: true,
  },
  REQUEST_TIMEOUT: {
    errorMsg: "Request timeout - operation took too long to complete. Please try again.",
    errorCode: 408,
    supportContact: true,
  },
  ROUTE_NOT_FOUND: {
    errorMsg: "The requested route was not found.",
    errorCode: 404,
    supportContact: false,
  },
  INVALID_JSON: {
    errorMsg: "Invalid JSON format in request body.",
    errorCode: 400,
    supportContact: false,
  },
};

// Network & Communication Errors (500/502/504) - Require Support Contact
const NETWORK_ERRORS: Record<string, ErrorDetail> = {
  NETWORK_TIMEOUT: {
    errorMsg: "Network timeout occurred. Please check your connection and try again.",
    errorCode: 504,
    supportContact: true,
  },
  SERVICE_UNAVAILABLE: {
    errorMsg: "Service is temporarily unavailable. Please try again later.",
    errorCode: 503,
    supportContact: true,
  },
  BAD_GATEWAY: {
    errorMsg: "Gateway error occurred. Please try again later.",
    errorCode: 502,
    supportContact: true,
  },
};

// Combine all error definitions
export const ALL_ERRORS = {
  ...DATABASE_ERRORS,
  ...AUTH_ERRORS,
  ...VALIDATION_ERRORS,
  ...BUSINESS_ERRORS,
  ...EXTERNAL_API_ERRORS,
  ...FILE_ERRORS,
  ...SYSTEM_ERRORS,
  ...NETWORK_ERRORS,
};

// Error categories for easier management
export const ERROR_CATEGORIES = {
  DATABASE: DATABASE_ERRORS,
  AUTH: AUTH_ERRORS,
  VALIDATION: VALIDATION_ERRORS,
  BUSINESS: BUSINESS_ERRORS,
  EXTERNAL_API: EXTERNAL_API_ERRORS,
  FILE: FILE_ERRORS,
  SYSTEM: SYSTEM_ERRORS,
  NETWORK: NETWORK_ERRORS,
};

// Get all errors that require support contact
export const SUPPORT_CONTACT_ERRORS = Object.entries(ALL_ERRORS)
  .filter(([_, error]) => error.supportContact)
  .reduce((acc, [key, error]) => {
    acc[key] = error;
    return acc;
  }, {} as Record<string, ErrorDetail>);