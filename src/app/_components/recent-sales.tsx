// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { type recentReservations } from "project-types";
import {
  Calculate_number_of_days_between_two_dates,
  getPrettierDate,
} from "utilities";

export function RecentSales(reservations: recentReservations) {
  return (
    <div className="space-y-8">
      {reservations.data && reservations.data.length > 0 && (
        <>
          {reservations.data.map((reservation, index) => (
            <div key={reservation.id}>
              {index < 10 && (
                <div className="flex items-center">
                  {/* <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar> */}
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {Calculate_number_of_days_between_two_dates(
                        reservation.check_in,
                        reservation.check_out,
                      )}
                      {" Night Stay"}
                      {/* + {" index: "}
                  {index} */}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getPrettierDate(reservation.check_in).monthName}{" "}
                      {getPrettierDate(reservation.check_in).dayName}
                      {" - "}
                      {getPrettierDate(reservation.check_out).monthName}{" "}
                      {getPrettierDate(reservation.check_out).dayName}
                      {/* {"////////////////"}
                  {reservation.check_in.toDateString()}
                  {"-----------"}
                  {reservation.check_out.toDateString()} */}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +${reservation.TotalPrice}
                  </div>
                </div>
              )}{" "}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
