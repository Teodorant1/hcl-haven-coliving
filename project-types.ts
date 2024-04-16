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

export type CloudbedsAPIresponse = {
  version: string;
  timestamp: Decimal;
  event: string;
  propertyID?: number;
  propertyID_str?: number;
  reservationID?: string;
  reservationId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  propertyId?: number;
  propertyId_str?: number;
  roomId?: string;
  roomID?: string;
  roomTypeID?: number;
  roomTypeId?: number;
  guestId?: number;
  guestId_str?: number;
  clientID?: number;
  oldState?: string;
  newState?: string;
  queueTaskId?: number;
  queueTaskId_str?: number;
  roomBlockID?: string;
  roomBlockType?: string;
  roomBlockReason?: string;
  rooms?: string[];
};
