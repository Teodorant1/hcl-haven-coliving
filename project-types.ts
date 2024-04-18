import { type Decimal } from "@prisma/client/runtime/library";

export type registrationForm = {
  email: string;
  password: string;
  name: string;
  BirthDate: number; // needs to be dateTime
};

export type StripeMetadata = {
  description: string;
  packageName: string;
  email: string;
  priceID: string;
  price: number;
  method: string;
};

export type V1D1_CloudbedsAPIresponse = {
  success: boolean;
  data: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    cellPhone: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    birthDate: Date;
    documentType: string;
    documentNumber: string;
    documentIssueDate: Date;
    documentIssuingCountry: string;
    specialRequests: string;
    taxID?: string;
    companyTaxID?: string;
    companyName?: string;
    isAnonymized: boolean;
    guestOptIn: boolean;
    isMerged: string;
    newGuestID: string;
  };
};

// v 1.0
export type CloudbedsAPIresponse = {
  version: string;
  timestamp: Decimal;
  event: string;
  propertyID?: number;
  propertyID_str?: string;
  reservationID?: string;
  reservationId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  propertyId?: number;
  propertyId_str?: string;
  roomId?: string;
  roomID?: string;
  roomTypeID?: number;
  roomTypeId?: number;
  guestId?: number;
  guestId_str?: string;
  clientID?: number;
  oldState?: string;
  newState?: string;
  queueTaskId?: number;
  queueTaskId_str?: string;
  roomBlockID?: string;
  roomBlockType?: string;
  roomBlockReason?: string;
  rooms?: string[];
};
