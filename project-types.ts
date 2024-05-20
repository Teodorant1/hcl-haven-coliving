import { type Decimal } from "@prisma/client/runtime/library";
import { type DateRange } from "react-day-picker";
import { type cloudbeds_reservation, type spent_day } from "@prisma/client";

export type recharts_month = {
  name: string;
  total: number;
};

export type recharts_yearly_breakdown = {
  year: number;
  month_hashmap: Map<string, spent_day[]>;
};

export type recentReservations = {
  success: boolean;
  data: cloudbeds_reservation[];
  number_of_rows?: number;
};

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

export interface DashBoardPageProps {
  className?: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setStage: React.Dispatch<React.SetStateAction<string | undefined>>;
  CBEDS_response: Cloudbeds_post_reservation_RESPONSE | undefined;
  setCBEDS_response?: React.Dispatch<
    React.SetStateAction<Cloudbeds_post_reservation_RESPONSE | undefined>
  >;
}

export interface Single_Day_Calendar_Props {
  className?: string;
  date: Date | undefined;
  currentDate: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setStage: React.Dispatch<React.SetStateAction<string | undefined>>;
  CBEDS_response?: Cloudbeds_post_reservation_RESPONSE | undefined;
  setCBEDS_response?: React.Dispatch<
    React.SetStateAction<Cloudbeds_post_reservation_RESPONSE | undefined>
  >;
}

export interface Dashboard_Confirmation_modal_Props {
  className?: string;
  date: Date | undefined;
  currentDate: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setStage: React.Dispatch<React.SetStateAction<string | undefined>>;
  CBEDS_response: Cloudbeds_post_reservation_RESPONSE | undefined;
  setCBEDS_response: React.Dispatch<
    React.SetStateAction<Cloudbeds_post_reservation_RESPONSE | undefined>
  >;
}

export interface DashboardModalConfirmation_Props {
  hotel_name: string;
  roomtype: string;
  checkin_date: Date;
  checkout_date: Date;
  totalprice: number;
  name: string;
  email: string;
  phone: string;
}

export type Cloudbeds_post_reservation_payload = {
  propertyID?: number;
  sourceID?: number;
  thirdPartyIdentifier?: string;
  startDate: string;
  endDate: string;
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
  }[];
  adults: {
    roomTypeID: number;
    quantity: number;
    roomID?: number;
  }[];
  children: {
    roomTypeID: number;
    quantity: number;
    roomID?: number;
  }[];
  paymentMethod: string;
  cardToken?: string;
  paymentAuthorizationCode?: string;
  customfields?: {
    fieldName: string;
  }[];
  promoCode?: string;
  allotmentBlockCode?: string;
  dateCreated?: Date;
  sendEmailConfirmation?: boolean;
};
export type Cloudbeds_post_reservation_RESPONSE = {
  success: boolean;
  reservationID: string;
  status: string;
  guestID: string;
  guestFirstName: string;
  guestLastName: string;
  guestGender: string;
  guestEmail: string;
  startDate: string;
  endDate: string;
  dateCreated: Date;
  grandTotal: number;
  unassigned: {
    subReservationID: string;
    roomTypeName: string;
    roomTypeID: string;
    adults: number;
    children: number;
    dailyrates: {
      date: Date;
      rate: number;
    };
    roomTotal: number;
  }[];
  message?: string;
};

export type getAvailableRoomTypes_payload = {
  propertyIDs: string;
  startDate: string;
  endDate: string;
  rooms: number;
  adults: number;
  children: number;
};

export type getAvailableRoomTypes_Result = {
  success: boolean;
  data: {
    propertyID: number;
    propertyCurrency: {
      currencyCode: string;
      currencySymbol: string;
      currencyPosition: string;
    };
    propertyRooms: propertyRoom[];
  }[];
  roomCount: number;
  count: number;
  total: number;
  message?: string;
};

export type propertyRoom = {
  roomTypeID: number;
  roomTypeName: string;
  roomTypeNameShort: string;
  roomTypeDescription: string;
  maxGuests: number;
  adultsIncluded: number;
  childrenIncluded: number;
  roomTypePhotos: {
    thumb: string;
    image: string;
  }[];
  roomTypeFeatures: string[];
  roomRate: number;
  roomRateID: number;
  ratePlanNamePublic: string;
  ratePlanNamePrivate: string;
  roomsAvailable: number;
  roomRateDetailed: { date: Date; rate: number };
  derivedType: string;
  derivedValue: number;
};

export type getReservations_payload = {
  propertyID?: number;
  includeGuestsDetails?: boolean;
  status?: string;
  // resultsFrom?: string;
  // resultsTo?: string;
  // sortByRecent?: boolean;
  // pageNumber?: number;
  // pageSize?: number;
};

export type getSingle_reservation_result = {
  success: boolean;
  data: {
    propertyID: number;
    guestName: string;
    guestEmail: string;
    isAnonymized: boolean;
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    guestList: {
      [guestID: string]: {
        guestID: string;
        guestFirstName: string;
        guestLastName: string;
        guestGender: string;
        guestEmail: string;
        guestPhone: string;
        guestCellPhone: string;
        guestCountry: string;
        guestAddress: string;
        guestAddress2: string;
        guestCity: string;
        guestZip: string;
        guestState: string;
        guestStatus: string;
        guestBirthdate: string;
        guestDocumentType: string;
        guestDocumentNumber: string;
        guestDocumentIssueDate: string;
        guestDocumentIssuingCountry: string;
        guestDocumentExpirationDate: string;
        assignedRoom: boolean;
        roomID: string;
        roomName: string;
        roomTypeName: string;
        isMainGuest: boolean;
        isAnonymized: boolean;
        taxID: string;
        companyTaxID: string;
        companyName: string;
        // customFields: any[]; // or define a type for custom fields
        // unassignedRooms: any[]; // or define a type for unassigned rooms
        rooms: {
          roomTypeID: string;
          roomTypeName: string;
          roomID: string;
          roomName: string;
          subReservationID: string;
        }[];
      };
    };
    reservationID: string;
    dateCreated: string;
    dateModified: string;
    source: string;
    sourceID: string;
    thirdPartyIdentifier: string;
    status: string;
    total: number;
    balance: number;
    balanceDetailed: {
      suggestedDeposit: string;
      subTotal: number;
      additionalItems: number;
      taxesFees: number;
      grandTotal: number;
      paid: number;
    };
    assigned: {
      roomTypeName: string;
      roomTypeNameShort: string;
      roomTypeID: string;
      subReservationID: string;
      startDate: string;
      endDate: string;
      adults: string;
      children: string;
      dailyRates: {
        date: string;
        rate: number;
      }[];
      roomTotal: string;
      roomName: string;
      roomID: string;
    }[];
    unassigned: unknown[]; // or define a type for unassigned rooms
    cardsOnFile: {
      cardID: string;
      cardNumber: string;
      cardType: string;
    }[];
    customFields: unknown[]; // or define a type for custom fields
    startDate: string;
    endDate: string;
    allotmentBlockCode: null;
    orderId: string;
  };
};

export type getReservations_result = {
  success: boolean;
  data: Reservation[];
};

export type Reservation = {
  propertyID: string;
  reservationID: string;
  dateCreated: string;
  dateModified: string;
  status: string;
  guestID: string;
  guestName: string;
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
  balance: number;
  sourceName: string;
  sourceID: string;
  thirdPartyIdentifier: null | string;
  allotmentBlockCode: null | string;
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  guestList: {
    [guestID: string]: {
      guestName: string;
      guestFirstName: string;
      guestLastName: string;
      guestGender: string;
      guestEmail: string;
      guestPhone: string;
      guestCellPhone: string;
      guestAddress: string;
      guestAddress2: string;
      guestCity: string;
      guestState: string;
      guestCountry: string;
      guestZip: string;
      guestBirthdate: string;
      guestDocumentType: string;
      guestDocumentNumber: string;
      guestDocumentIssueDate: string;
      guestDocumentIssuingCountry: string;
      guestDocumentExpirationDate: string;
      taxID: string;
      companyTaxID: string;
      companyName: string;
      subReservationID: string;
      startDate: string;
      endDate: string;
      assignedRoom: boolean;
      isAnonymized: boolean;
      rooms: {
        roomID: string;
        roomName: string;
        roomTypeName: string;
        roomTypeID: string;
        roomTypeNameShort: string;
        rateID: string;
        ratePlanName: string;
        roomStatus: string;
        subReservationID: string;
      }[];
      roomID: string;
      roomName: string;
      roomTypeName: string;
      isMainGuest: boolean;
    };
  };
};
