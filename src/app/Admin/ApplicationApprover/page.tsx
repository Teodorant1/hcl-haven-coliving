/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import React, { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ApplicationApprover = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();
  const applicants = api.auth.Get_applicants_for_approval.useQuery();
  const AdminAction = api.auth.Approve_Account.useMutation({
    onSuccess: () => {
      applicants.refetch;
    },
  });

  function HandleAdminAction(
    userEmail: string,
    applicationID: string,
    isApproved: boolean,
    gender: string,
    fullname: string,
  ) {
    if (isLoading === true) {
      return "ooogabooga";
    }
    setIsLoading(true);

    AdminAction.mutate({
      userEmail: userEmail,
      applicationID: applicationID,
      isApproved: isApproved,
      gender: gender,
      fullname: fullname,
    });
  }

  return (
    <div className="w-full p-6">
      {session?.user.isAdmin === true && (
        <div>
          <h1 className="mb-4 text-2xl font-bold">Membership Applicants</h1>{" "}
          {applicants.data?.length === 0 && (
            <div className="mx-auto flex h-screen max-w-3xl items-center justify-center ">
              <CardHeader className="bg-red-600 sm:rounded-sm">
                <CardTitle className="text-white">
                  NO APPLICANTS PRESENT
                </CardTitle>
              </CardHeader>
            </div>
          )}
          {/* {session?.user.isAdmin === true && <div>you are approved</div>}
        {session?.user.isAdmin !== true && <div>you are NOT approved</div>} */}
          {applicants && applicants.data?.length! > 0 && (
            <div className="w-full overflow-auto rounded-lg border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date of Birth
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Gender
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Phone Number
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Driver{"'"}s License Number
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Airline
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Employee ID Image Link
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Referred By
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Application Date
                      </th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    {applicants.data!.map((applicant) => (
                      <tr
                        key={applicant.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.name}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.email}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.DateOfBirth.toDateString()}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.gender}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.phoneNumber}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.DriverLicenseNumber}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.airline}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          <a
                            href={
                              "https://rcprbmdrrmrvjubkxifr.supabase.co/storage/v1/object/public/images/" +
                              applicant.Airline_ID_Image
                            }
                            rel="ugc"
                            target="_blank"
                            className="rounded-sm bg-black p-2 text-white"
                          >
                            View Image
                          </a>
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.RefferedBy}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {applicant.applicationDate.toDateString()}
                        </td>
                        <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                          {isLoading === false && (
                            <button
                              className="inline-flex h-10  items-center justify-center whitespace-nowrap rounded-md border border-input bg-background bg-green-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                              type="button"
                              id="radix-:Rrdlafnnja:"
                              aria-haspopup="menu"
                              aria-expanded="false"
                              data-state="closed"
                              onClick={() => {
                                HandleAdminAction(
                                  applicant.email,
                                  applicant.id,
                                  true,
                                  applicant.gender,
                                  applicant.name,
                                );
                              }}
                            >
                              ACCEPT <IoCheckmarkCircleSharp className="ml-2" />
                            </button>
                          )}
                          <button
                            className="inline-flex h-10  items-center justify-center whitespace-nowrap rounded-md border border-input bg-background bg-red-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            type="button"
                            id="radix-:Rrdlafnnja:"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                            onClick={() => {
                              HandleAdminAction(
                                applicant.email,
                                applicant.id,
                                false,
                                applicant.gender,
                                applicant.name,
                              );
                            }}
                          >
                            KICK <MdCancel className="ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      John Doe
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      johndoe@example.com
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      January 1, 1990
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      Male
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      +1 234 567 8901
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      123456789
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      Delta
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      <a href="#" rel="ugc">
                        View Image
                      </a>
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      Emma Johnson
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      March 1, 2024
                    </td>
                    <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                      <button
                        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        type="button"
                        id="radix-:Rrdlafnnja:"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        Action
                      </button>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationApprover;
