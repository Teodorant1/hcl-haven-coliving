import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getReservations_result } from "project-types";

export function RecentSales(reservations: getReservations_result) {
  return (
    <div className="space-y-8">
      {reservations &&
        reservations.success === true &&
        reservations.data.length > 0 && (
          <>
            {reservations.data.map((reservation) => (
              <div
                key={reservation.reservationID}
                className="flex items-center"
              >
                {/* <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar> */}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {reservation.guestList[reservation.guestID]?.guestFirstName}
                    -{" "}
                    {reservation.guestList[reservation.guestID]?.guestLastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.guestList[reservation.guestID]?.guestEmail}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  +{reservation.balance}$
                </div>
              </div>
            ))}
          </>
        )}
    </div>
  );
}
