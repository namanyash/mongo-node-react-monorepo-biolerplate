import e, { Request, Response } from "express";
import AppLogger from "../utils/logger/Logger";
import { Socket } from "socket.io";
import { AppConfig } from "../config/AppConfig";

// ============================================================================
// ERROR DEFINITIONS
// ============================================================================

interface ErrorDetail {
  errorMsg: string;
  errorCode: number;
}

// Auth & User Errors (400)
const AUTH_ERRORS: Record<string, ErrorDetail> = {
  EMAIL_EXISTS: {
    errorMsg: "Email is already in use",
    errorCode: 400,
  },
  USERNAME_EXISTS: {
    errorMsg: "Username is already in use",
    errorCode: 400,
  },
  INVALID_CREDENTIALS: {
    errorMsg: "Invalid Credentials",
    errorCode: 400,
  },
  USER_NOT_FOUND: {
    errorMsg: "User does not exist",
    errorCode: 400,
  },
  INVALID_OLD_PASSWORD: {
    errorMsg: "Incorrect Password",
    errorCode: 400,
  },
  TEMP_DATA_NOT_FOUND: {
    errorMsg: "Invalid credentials. Permission Denied",
    errorCode: 400,
  },
  DATA_EXPIRED: {
    errorMsg: "Password reset request expired. Please request a new password reset.",
    errorCode: 400,
  },
  INVALID_EMAIL_VERIFICATION_TOKEN: {
    errorMsg: "Invalid email verification token",
    errorCode: 400,
  },
  ACCOUNT_CREATED_LESS_THAN_24_HOURS_AGO: {
    errorMsg: "Account created less than 24 hours ago. Please verify email and login to continue. You can recreate a new account after 24 hours if you have not verified your email.",
    errorCode: 400,
  },
  EMAIL_NOT_VERIFIED: {
    errorMsg: "Please verify your email address before logging in. Check your inbox for the verification email.",
    errorCode: 401,
  },
};

// Project & Rundwn Errors (400/403/404)
const PROJECT_ERRORS: Record<string, ErrorDetail> = {
  INVALID_PROJECT: {
    errorMsg: "Project does not exist",
    errorCode: 400,
  },
  PROJECT_ID_REQUIRED: {
    errorMsg: "Project ID is required",
    errorCode: 400,
  },
  USER_NOT_IN_PROJECT: {
    errorMsg: "User is not part of this project",
    errorCode: 400,
  },
  SELF_INVITE: {
    errorMsg: "Cannot invite yourself to a project",
    errorCode: 400,
  },
  PROJECT_INVITE_EXISTS: {
    errorMsg: "This project already has an invite for the user",
    errorCode: 400,
  },
  RUNDWN_INVITE_EXISTS: {
    errorMsg: "This rundwn already has an invite for the user",
    errorCode: 400,
  },
  USER_EXISTS_IN_PROJECT: {
    errorMsg: "User is already a part of this project",
    errorCode: 400,
  },
  USER_ALREADY_IN_RUNDWN: {
    errorMsg: "User is already a part of this project as a rundwn user",
    errorCode: 400,
  },
  RUNDOWN_USER_NOT_PROJECT_USER: {
    errorMsg: "User is a rundown level user. This action can only be done for project level users.",
    errorCode: 400,
  },
  ROLE_MUST_HAVE_PROJECT_ID: {
    errorMsg: "Role must have a project ID",
    errorCode: 400,
  },
  ROLE_MUST_HAVE_RUNDWN_ID: {
    errorMsg: "Role must have a rundwn ID",
    errorCode: 400,
  },
  PROJECT_USER_NOT_RUNDOWN_USER: {
    errorMsg: "User is a project level user. This action can only be done for rundown level users.",
    errorCode: 400,
  },
  PROJECT_CREATION_FAILED: {
    errorMsg: "Unable to create project. Unknown error occurred",
    errorCode: 400,
  },
  INVITE_DOES_NOT_EXIST: {
    errorMsg: "Invite does not exist this user. It may have been deleted by the sender.",
    errorCode: 400,
  },
  INVALID_RUNDWN: {
    errorMsg: "Rundwn not found",
    errorCode: 404,
  },
  RUNDWN_NOT_FOUND: {
    errorMsg: "Rundwn not found",
    errorCode: 404,
  },
  INVALID_REQUEST: {
    errorMsg: "Rundwn ID or Project ID is required.",
    errorCode: 400,
  },
  GUEST_TOKEN_INVALID: {
    errorMsg: "Guest token is invalid. Access Denied",
    errorCode: 400,
  },
  PROJECT_HAS_RUNDWNS: {
    errorMsg: "Project contains rundwns. Delete all rundwns before deleting the project.",
    errorCode: 403,
  },
  PROJECT_HAS_RUNWDNS: {
    errorMsg: "Project Has Rundwns. Delete All Rundwns Before Deleting Project",
    errorCode: 403,
  },
  SNAPSHOT_NOT_FOUND: {
    errorMsg: "Rundwn Snapshot not found",
    errorCode: 400,
  },
  RESEND_TOO_SOON: {
    errorMsg: "Please wait at least 3 hours before resending an invite.",
    errorCode: 400,
  },
  SOCKET_NOT_FOUND: {
    errorMsg: "Connection not found or already disconnected.",
    errorCode: 400,
  },
  INVITE_ALREADY_RESPONDED: {
    errorMsg: "This invite has already been accepted or rejected.",
    errorCode: 400,
  },
  INVITE_EXPIRED: {
    errorMsg: "This invite has expired.",
    errorCode: 400,
  },
  CANNOT_DELETE_NON_PENDING_INVITE: {
    errorMsg: "Cannot delete an invite that has already been responded to.",
    errorCode: 400,
  },
  ONLY_PROJECT_OWNER_CAN_DELETE: {
    errorMsg: "Only the project owner can delete this project.",
    errorCode: 403,
  },
};

// Role & Permission Errors (400/403)
const ROLE_ERRORS: Record<string, ErrorDetail> = {
  INVALID_ROLE_NAME: {
    errorMsg: "Role does not exist",
    errorCode: 400,
  },
  INVALID_ROLE_ID: {
    errorMsg: "Role does not exist",
    errorCode: 400,
  },
  ROLE_NAME_EXISTS: {
    errorMsg: "Role name already exists in this project. Enter a unique role name",
    errorCode: 400,
  },
  ROLE_NOT_FOUND: {
    errorMsg: "Role does not exist in this project",
    errorCode: 400,
  },
  USERS_HAVE_ROLE: {
    errorMsg: "Cannot delete role as it is assigned to users",
    errorCode: 400,
  },
  INVALID_ACTIONS: {
    errorMsg: "Invalid actions provided",
    errorCode: 400,
  },
  INVALID_ACTIONS_FORMAT: {
    errorMsg: "Actions must be provided as an array",
    errorCode: 400,
  },
  INVALID_ROLE_TYPE: {
    errorMsg: "Invalid role type provided",
    errorCode: 400,
  },
  INVALID_ACTION_SET: {
    errorMsg: "Invalid action set provided",
    errorCode: 400,
  },
  UNAUTHORIZED_ACTION: {
    errorMsg: "You are not authorized to perform this action.",
    errorCode: 403,
  },
  USER_IS_A_PROJECT_MEMBER: {
    errorMsg: "User is already a member of this project",
    errorCode: 500,
  },
  USER_IS_ALREADY_A_PROJECT_LEVEL_USER: {
    errorMsg: "User is already a project level user for this project. Cannot invite user to a rundwn.",
    errorCode: 403,
  },
  OLD_ROLE_NOT_FOUND: {
    errorMsg: "The user's current role could not be found.",
    errorCode: 400,
  },
  NEW_ROLE_NOT_FOUND: {
    errorMsg: "The new role could not be found.",
    errorCode: 400,
  },
  ROLES_MUST_BELONG_TO_SAME_PROJECT: {
    errorMsg: "Both roles must belong to the same project.",
    errorCode: 400,
  },
  PROJECT_ID_REQUIRED: {
    errorMsg: "Project ID is required for this operation",
    errorCode: 400,
  },
  INVALID_RUNDOWN_FOR_ROLE: {
    errorMsg: "The specified rundown does not belong to the same project as the role",
    errorCode: 400,
  },
  RUNDOWNS_MUST_BELONG_TO_SAME_PROJECT: {
    errorMsg: "Both rundowns must belong to the same project",
    errorCode: 400,
  },
  RUNDWN_ID_REQUIRED: {
    errorMsg: "Rundown ID is required for this operation",
    errorCode: 400,
  },
  INVALID_RUNDWN: {
    errorMsg: "Invalid rundown ID provided",
    errorCode: 400,
  },
};

// Payment & Subscription Errors (400)
const PAYMENT_ERRORS: Record<string, ErrorDetail> = {
  FAILED_TO_CREATE_SUBSCRIPTION: {
    errorMsg: "Failed to create subscription. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_CREATE_CUSTOMER: {
    errorMsg: "Failed to create customer. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_ADD_SEATS: {
    errorMsg: "Failed to add seats to subscription. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_REMOVE_SEATS: {
    errorMsg: "Failed to remove seats from subscription. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_CANCEL_SUBSCRIPTION: {
    errorMsg: "Failed to cancel subscription. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_REACTIVATE_SUBSCRIPTION: {
    errorMsg: "Failed to reactivate subscription. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_RETRIEVE_SUBSCRIPTION: {
    errorMsg: "Failed to retrieve subscription details. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_CREATE_PAYMENT_INTENT: {
    errorMsg: "Failed to create payment intent. Please try again later or contact support.",
    errorCode: 400,
  },
  INVALID_BILLING_CYCLE: {
    errorMsg: "Invalid billing cycle. Must be 'monthly' or 'yearly'.",
    errorCode: 400,
  },
  PREMIUM_SUBSCRIPTION_REQUIRED_FOR_SEATS: {
    errorMsg: "Premium subscription is required to purchase additional seats. Please upgrade your plan first.",
    errorCode: 400,
  },
  NO_ADD_ON_SEATS_FOUND: {
    errorMsg: "No add-on seats found in your subscription.",
    errorCode: 400,
  },
  SUBSCRIPTION_ALREADY_EXISTS: {
    errorMsg: "User already has an active subscription",
    errorCode: 400,
  },
  NO_ACTIVE_SUBSCRIPTION: {
    errorMsg: "No active subscription found",
    errorCode: 400,
  },
  INVALID_SEAT_QUANTITY: {
    errorMsg: "Invalid seat quantity. Must be greater than 0",
    errorCode: 400,
  },
  MISSING_STRIPE_SIGNATURE: {
    errorMsg: "Missing Stripe webhook signature",
    errorCode: 400,
  },
  INVALID_WEBHOOK_SIGNATURE: {
    errorMsg: "Invalid webhook signature",
    errorCode: 400,
  },
  PAYMENT_FAILED: {
    errorMsg: "Payment processing failed",
    errorCode: 400,
  },
  SUBSCRIPTION_PAYMENT_INCOMPLETE: {
    errorMsg: "Subscription payment is incomplete. Please complete the payment to activate your subscription.",
    errorCode: 400,
  },
  FAILED_TO_CREATE_ADD_ON_SEATS_CHECKOUT_SESSION: {
    errorMsg: "Failed to create checkout session for add-on seats. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_COMPLETE_ADD_ON_SEATS_SESSION: {
    errorMsg: "Failed to complete add-on seats checkout session. Please try again later or contact support.",
    errorCode: 400,
  },
  FAILED_TO_FETCH_PRODUCTS_AND_PRICES: {
    errorMsg: "Failed to fetch products and prices from Stripe. Please try again later or contact support.",
    errorCode: 500,
  },
  FAILED_TO_FETCH_FORMATTED_PRICING: {
    errorMsg: "Failed to fetch formatted pricing information. Please try again later or contact support.",
    errorCode: 500,
  },
  FAILED_TO_FETCH_PUBLIC_PRICING_DATA: {
    errorMsg: "Failed to fetch pricing data. Please try again later or contact support.",
    errorCode: 500,
  },
  FAILED_TO_FETCH_COMPLETE_SUBSCRIPTION_INFO: {
    errorMsg: "Failed to fetch subscription information. Please try again later or contact support.",
    errorCode: 500,
  },
  FAILED_TO_FETCH_SEAT_PRICING: {
    errorMsg: "Failed to fetch seat pricing information. Please try again later or contact support.",
    errorCode: 500,
  },
  RUNDOWN_PREMIUM_PRODUCT_NOT_FOUND: {
    errorMsg: "Rundown Premium product not found in Stripe. Please contact support.",
    errorCode: 500,
  },
  RUNDOWN_SEAT_PRODUCT_NOT_FOUND: {
    errorMsg: "Rundown Seat product not found in Stripe. Please contact support.",
    errorCode: 500,
  },
  RUNDOWN_PREMIUM_PRICES_NOT_FOUND: {
    errorMsg: "Rundown Premium prices not found in Stripe. Please contact support.",
    errorCode: 500,
  },
  RUNDOWN_SEAT_PRICES_NOT_FOUND: {
    errorMsg: "Rundown Seat prices not found in Stripe. Please contact support.",
    errorCode: 500,
  },
  SUBSCRIPTION_CANNOT_BE_MODIFIED: {
    errorMsg: "This subscription cannot be modified. It may be canceled or expired.",
    errorCode: 400,
  },
  MAIN_SUBSCRIPTION_ITEM_NOT_FOUND: {
    errorMsg: "Main subscription item not found. Please contact support.",
    errorCode: 500,
  },
  FAILED_TO_CHANGE_BILLING_CYCLE: {
    errorMsg: "Failed to change billing cycle. Please try again later or contact support.",
    errorCode: 500,
  },
  BILLING_CYCLE_ALREADY_SET: {
    errorMsg: "Your subscription is already set to this billing cycle.",
    errorCode: 400,
  },
  SUBSCRIPTION_NOT_ACTIVE: {
    errorMsg: "Your subscription is not active. Please ensure your subscription is active before changing the billing cycle.",
    errorCode: 400,
  },
  MISSING_STRIPE_IDS: {
    errorMsg: "Missing Stripe customer or subscription information. Please contact support.",
    errorCode: 400,
  },
  PAYMENT_NOT_COMPLETED: {
    errorMsg: "Payment was not completed. Please try again.",
    errorCode: 400,
  },
  INVALID_SESSION_PURPOSE: {
    errorMsg: "Invalid checkout session purpose.",
    errorCode: 400,
  },
  INVALID_SESSION_METADATA: {
    errorMsg: "Invalid checkout session metadata.",
    errorCode: 400,
  },
  MOCK_STRIPE_IDS_NOT_ALLOWED: {
    errorMsg: "Cannot perform this action with test/mock Stripe data. Please contact support to resolve your subscription.",
    errorCode: 400,
  },
  NO_MOCK_DATA_TO_CLEAR: {
    errorMsg: "No mock subscription data found to clear.",
    errorCode: 400,
  },
  INVALID_SUBSCRIPTION_PRODUCT: {
    errorMsg: "Invalid subscription product. Please contact support.",
    errorCode: 400,
  },
  FAILED_TO_SYNC_SUBSCRIPTION: {
    errorMsg: "Failed to sync subscription data. Please try again later or contact support.",
    errorCode: 500,
  },
  NO_SUBSCRIPTION_TO_SYNC: {
    errorMsg: "No subscription found to sync.",
    errorCode: 400,
  },
};

// Limit & Usage Errors (400)
const LIMIT_ERRORS: Record<string, ErrorDetail> = {
  SUBSCRIPTION_LIMIT_EXCEEDED: {
    errorMsg: "You have reached your subscription limit",
    errorCode: 400,
  },
  RUNDOWN_LIMIT_REACHED: {
    errorMsg: "You have reached your rundown limit. Please upgrade your plan to create more rundowns.",
    errorCode: 400,
  },
  SEAT_LIMIT_REACHED: {
    errorMsg: "You have reached your seat limit. Please purchase additional seats.",
    errorCode: 400,
  },
};

// File & Data Errors (400/500)
const FILE_ERRORS: Record<string, ErrorDetail> = {
  INVALID_FILE: {
    errorMsg: "No file uploaded",
    errorCode: 400,
  },
  INVALID_FILE_TYPE: {
    errorMsg: "Invalid file type. Accepted file types are .xls, .xlsx, .csv",
    errorCode: 400,
  },
  NO_HEADER_ROW_IN_FILE: {
    errorMsg: "Could not find the 'Duration' column in the file. Please ensure the file has a header row with a 'Duration' column.",
    errorCode: 400,
  },
  PDF_GENERATION_FAILED: {
    errorMsg: "PDF Generation Failed. Please try again later",
    errorCode: 500,
  },
  PDF_DOWNLOAD_FAILED: {
    errorMsg: "PDF Download Failed. Please try again later",
    errorCode: 500,
  },
};

// Time & Validation Errors (400/403)
const VALIDATION_ERRORS: Record<string, ErrorDetail> = {
  INVALID_TIMESTAMP: {
    errorMsg: "Invalid Timestamp provided",
    errorCode: 403,
  },
  TIMESTAMP_IN_PAST: {
    errorMsg: "Timestamp provided is in the past",
    errorCode: 403,
  },
};

// System Errors (500)
const SYSTEM_ERRORS: Record<string, ErrorDetail> = {
  ROW_NOT_FOUND: {
    errorMsg: "Internal Server Error",
    errorCode: 500,
  },
  GROUP_NOT_FOUND: {
    errorMsg: "Internal Server Error",
    errorCode: 500,
  },
};

// Combine all API errors
const ALL_API_ERRORS = {
  ...AUTH_ERRORS,
  ...PROJECT_ERRORS,
  ...ROLE_ERRORS,
  ...PAYMENT_ERRORS,
  ...LIMIT_ERRORS,
  ...FILE_ERRORS,
  ...VALIDATION_ERRORS,
  ...SYSTEM_ERRORS,
};

// ============================================================================
// SOCKET ERROR DEFINITIONS
// ============================================================================

const SOCKET_ERRORS: Record<string, string> = {
  // Rundwn & Project
  INVALID_RUNDWN: "rundwn not found",
  RUNDWN_NOT_FOUND: "rundwn not found",
  INVALID_RUNDWN_DATA: "Invalid Rundwn Data",

  // Row & Data
  ROW_NOT_FOUND: "Row not found",
  INVALID_PREV_ROW_DURATION: "Invalid Previous Row Duration",
  INVALID_SEQ_VALUE: "Invalid Value for SEQ",
  CELL_NOT_FOUND_IN_COLUMNS: "Cell not found in data",
  CANNOT_DELETE_REQUIRED_COLUMNS: "Cannot delete required columns (SEQ and DURATION)",

  // User & Groups
  USER_NOT_FOUND: "Login Credentials Invalid. Cloud Not Find User",
  GROUP_NOT_FOUND: "Group not found",

  // Chat & Messages
  MESSAGE_NOT_FOUND: "Message not found",
  CHAT_NOT_FOUND: "Chat not found",
  CHANNEL_NOT_FOUND: "Channel not found",
};

// ============================================================================
// ERROR HANDLER CLASS
// ============================================================================

class AppError {
  private static getApiErrorDetails(errorMessage: string): ErrorDetail {
    const errorDetail = ALL_API_ERRORS[errorMessage];

    if (errorDetail) {
      return errorDetail;
    }

    // Default fallback
    return {
      errorMsg: "An unknown error occurred",
      errorCode: 500,
    };
  }

  private static getSocketErrorDetails(errorMessage: string): string {
    return SOCKET_ERRORS[errorMessage] || "Unknown Error Occurred";
  }

  static handleError(error: any, req: Request, res: Response) {
    AppLogger.error(error.message, error);
    const { errorMsg, errorCode } = AppError.getApiErrorDetails(error.message);

    if (errorMsg === "An unknown error occurred") {
      AppLogger.error("Unknown error occurred", error);
    }

    res.status(errorCode).json({
      errors: [
        {
          type: error.message,
          msg: errorMsg,
        },
      ],
    });
  }

  static handleSocketError(error: any, socket: Socket) {
    AppLogger.error(error.message, error);
    const errorMsg = AppError.getSocketErrorDetails(error.message);
    socket.emit("errorMessage", errorMsg);
  }
}

export default AppError;
