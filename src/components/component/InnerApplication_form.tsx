/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/8LLPmfIQR2J
 */
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { convert_date_string_to_DATE } from "utilities";
import { type ChangeEvent, useState } from "react";
import { supabase } from "supabaseclient";
import Form_success_page from "@/_components/form-success-page";

export function InnerApplication_form() {
  const [gender, setgender] = useState<string>("Select");
  const { status, data: session } = useSession();
  const [applicationSent, setapplicationSent] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSelectChange = (eventvalue: string) => {
    setgender(eventvalue); // Update the state with the selected value
  };
  const applytoPilot = api.auth.SendApplication.useMutation({
    onSuccess: () => {
      setapplicationSent(true);
    },
  });

  async function ApplyToAirlineProgram() {
    if (isLoading === true) {
      return "oogabooga";
    }
    setIsLoading(true);

    const date = (document.getElementById("dob") as HTMLInputElement).value;
    const actualDate = convert_date_string_to_DATE(date);
    console.log(typeof date);
    console.log(date);
    console.log(typeof actualDate);
    console.log(actualDate);

    const name = (document.getElementById("name") as HTMLInputElement).value;
    // const gender = (document.getElementById("gender") as HTMLInputElement)
    //   .value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    // const email = (document.getElementById("email") as HTMLInputElement).value;
    const driverlicense = (
      document.getElementById("driver-license") as HTMLInputElement
    ).value;
    const state = (document.getElementById("state") as HTMLInputElement).value;
    const airline = (document.getElementById("airline") as HTMLInputElement)
      .value;
    const employeeid = (
      document.getElementById("employee-id") as HTMLInputElement
    ).value;
    const jobtitle = (document.getElementById("job-title") as HTMLInputElement)
      .value;
    const airline_id_image = (
      document.getElementById("airline-id-image") as HTMLInputElement
    ).value;
    const emergency_contact_name = (
      document.getElementById("emergency-contact-name") as HTMLInputElement
    ).value;
    const emergency_contact_address = (
      document.getElementById("emergency-contact-address") as HTMLInputElement
    ).value;
    const emergency_contact_phone = (
      document.getElementById("emergency-contact-phone") as HTMLInputElement
    ).value;
    const emergency_contact_relationship = (
      document.getElementById(
        "emergency-contact-relationship",
      ) as HTMLInputElement
    ).value;
    const referred_by = (
      document.getElementById("referred-by") as HTMLInputElement
    ).value;

    console.log(name);
    console.log(gender);
    console.log(phone);
    console.log(session?.user.email);
    console.log(driverlicense);
    console.log(state);
    console.log(airline);
    console.log(employeeid);
    console.log(jobtitle);
    console.log(airline_id_image);
    console.log(emergency_contact_name);
    console.log(emergency_contact_address);
    console.log(emergency_contact_phone);
    console.log(emergency_contact_relationship);
    console.log(referred_by);
    console.log(selectedFile);
    console.log(
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    );

    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + employeeid + selectedFile!.name, selectedFile!, {
        cacheControl: "3600",
        upsert: true,
      });

    applytoPilot.mutate({
      gender: gender,
      name: name,
      DateOfBirth: actualDate,
      phoneNumber: phone,
      DriverLicenseNumber: driverlicense,
      state: state,
      airline: airline,
      AirlineEmployeeID: employeeid,
      JobTitle: jobtitle,
      Airline_ID_Image: "public/" + employeeid + selectedFile!.name,
      Emergency_Contact_Name: emergency_contact_name,
      Emergency_Contact_PhoneNumber: emergency_contact_phone,
      Emergency_Contact_Relationship: emergency_contact_relationship,
      RefferedBy: referred_by,
    });
  }

  return (
    <main className="px-4 py-8 md:px-6 lg:px-8">
      {status === "unauthenticated" && (
        <div className="mx-auto flex h-screen max-w-3xl items-center justify-center ">
          <CardHeader className="bg-red-600">
            <CardTitle className="text-white">ACCESS DENIED!</CardTitle>
            <CardDescription className="text-white">
              LOG IN TO GAIN ACCESS TO THIS PAGE{" "}
            </CardDescription>
          </CardHeader>
        </div>
      )}
      {status === "authenticated" && applicationSent === true && (
        <Form_success_page />
      )}
      {status === "authenticated" && applicationSent === false && (
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Apply to Airline Program </CardTitle>
            <CardDescription>
              Please fill out the form below. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required={true} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" required={true} type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" aria-required={true} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem
                    // onClick={() => {}}
                    value="male"
                  >
                    Male
                  </SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                required={true}
                type="tel"
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                required={true}
                type="email"
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="driver-license">
                Driver{"'"}s License Number
              </Label>
              <Input
                id="driver-license"
                placeholder="Enter your driver's license number"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Enter your state"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="airline">Airline</Label>
              <Input
                id="airline"
                placeholder="Enter your airline"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-id">Airline Employee ID</Label>
              <Input
                id="employee-id"
                placeholder="Enter your airline employee ID"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="Enter your job title"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="airline-id-image">Airline ID Image</Label>
              <Input
                id="airline-id-image"
                required={true}
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-contact-name">
                Emergency Contact Name
              </Label>
              <Input
                id="emergency-contact-name"
                placeholder="Enter emergency contact name"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-contact-address">
                Emergency Contact Address
              </Label>
              <Input
                id="emergency-contact-address"
                placeholder="Enter emergency contact address"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-contact-phone">
                Emergency Contact Phone Number
              </Label>
              <Input
                id="emergency-contact-phone"
                placeholder="Enter emergency contact phone number"
                required={true}
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-contact-relationship">
                Emergency Contact Relationship
              </Label>
              <Input
                id="emergency-contact-relationship"
                placeholder="Enter emergency contact relationship"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referred-by">Referred By</Label>
              <Input
                id="referred-by"
                placeholder="Enter referred by"
                required={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button
              onClick={() => {
                console.log(session.user);
              }}
              className="ml-auto"
            >
              print user
            </Button> */}
            {isLoading === false && (
              <Button
                onClick={async () => {
                  await ApplyToAirlineProgram();
                }}
                className="ml-auto"
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
