import { type Decimal } from "@prisma/client/runtime/library";
import { type DateRange } from "react-day-picker";

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

export type CB_get_user_response = {
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

//  https://hotels.cloudbeds.com/api/v1.1/docs/#api-Room-getRoomsUnassigned
export type CB_get_empty_rooms_response = {
  success: boolean;
  data: {
    propertyID: number;
    rooms: {
      roomID: string;
      roomName: string;
      dormRoomName: string;
      roomDescription: string;
      maxGuests: number;
      isPrivate: boolean;
      roomBlocked: boolean;
      roomTypeID: number;
      roomTypeName: string;
      roomTypeNameShort: string;
    }[];
  }[];
  count: number;
  total: number;
  message?: string;
};

export type cb_room_subtype = {
  roomID: string;
  roomName: string;
  dormRoomName: string;
  roomDescription: string;
  maxGuests: number;
  isPrivate: boolean;
  roomBlocked: boolean;
  roomTypeID: number;
  roomTypeName: string;
  roomTypeNameShort: string;
};

// v 1.0 result from webhook
export type Cloudbeds_webhook_APIresponse = {
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

export interface CalendarDateRangePickerProps {
  className?: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setStage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export type Cloudbeds_post_reservation_payload = {
  propertyID?: number;
  sourceID?: number;
  thirdPartyIdentifier?: string;
  startDate: Date;
  endDate: Date;
  guestFirstName: string;
  guestLastName: string;
  guestGender?: string;
  guestCountry: string;
  guestZip: string;
  guestEmail: string;
  guestPhone?: string;
  estimatedArrivalTime?: Date; //needs to be time instead
  rooms: {
    roomTypeID: number;
    quantity: number;
    roomID?: number;
    roomRateID?: number;
  };
  adults: {
    roomTypeID: number;
    quantity: number;
    roomID?: number;
  };
  children: {
    roomTypeID: number;
    quantity: number;
    roomID?: number;
  };
  paymentMethod: string;
  cardToken?: string;
  paymentAuthorizationCode?: string;
  customfields?: {
    fieldName: "fieldValue";
  };
  promoCode?: string;
  allotmentBlockCode?: string;
  dateCreated?: Date;
  sendEmailConfirmation?: boolean;
};
