import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfile } from "@/api/profile";
import { useAppStore } from "@/store/store";

const personalFormSchema = z.object({
  user_id: z.number(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  Gender: z.string().min(1, "Gender is required"),
  Day: z.string().min(1, "Day is required"),
  Month: z.string().min(1, "Month is required"),
  Year: z.string().min(1, "Year is required"),
  Address: z.string().min(1, "Address is required"),
  City: z.string().min(1, "City is required"),
  State: z.string().min(1, "State is required"),
  Landmark: z.string().optional(),
  PinCode: z.string().min(1, "Pin code is required"),
  Country: z.string().min(1, "Country is required"),
  Shipping_Address: z.string().optional(),
  Shipping_City: z.string().optional(),
  Shipping_State: z.string().optional(),
  Shipping_Landmark: z.string().optional(),
  Shipping_PinCode: z.string().optional(),
  Shipping_Country: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  gst_no: z.string().min(1, "GST number is required"),
  pan_no: z.string().min(1, "PAN number is required"),
});

export type ProfileUpdateForm = z.infer<typeof personalFormSchema>;

export const BusinessVerificationForm = () => {
  const { user } = useAppStore();
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data.status === 1) {
        toast.success("Account created successfully!");
      } else {
        console.log(data.error);
        toast.error(data.error || "Failed to create account");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
  });

  const form = useForm<ProfileUpdateForm>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      user_id: user?.id,
      first_name: "",
      last_name: "",
      Gender: "",
      Day: "",
      Month: "",
      Year: "",
      Address: "",
      City: "",
      State: "",
      Landmark: "",
      PinCode: "",
      Country: "",
      Shipping_Address: "",
      Shipping_City: "",
      Shipping_State: "",
      Shipping_Landmark: "",
      Shipping_PinCode: "",
      Shipping_Country: "",
      company_name: "",
      gst_no: "",
      pan_no: "",
    },
  });

  const onSubmit = (values: ProfileUpdateForm) => {
    console.log("Personal form submitted:", values);
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="first_name"
            fieldType={FormFieldType.INPUT}
            label="First Name"
            placeholder="Enter your first name"
          />

          <CustomFormField
            control={form.control}
            name="last_name"
            fieldType={FormFieldType.INPUT}
            label="Last Name"
            placeholder="Enter your last name"
          />

          <CustomFormField
            control={form.control}
            name="Gender"
            fieldType={FormFieldType.SELECT}
            label="Gender"
            placeholder="Select gender"
          >
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
          </CustomFormField>

          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="Day"
              fieldType={FormFieldType.SELECT}
              label="Day"
              placeholder="Day"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="Month"
              fieldType={FormFieldType.SELECT}
              label="Month"
              placeholder="Month"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="Year"
              fieldType={FormFieldType.SELECT}
              label="Year"
              placeholder="Year"
            >
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          <CustomFormField
            control={form.control}
            name="Address"
            fieldType={FormFieldType.INPUT}
            label="Address"
            placeholder="Enter your address"
          />

          <CustomFormField
            control={form.control}
            name="City"
            fieldType={FormFieldType.INPUT}
            label="City"
            placeholder="Enter your city"
          />

          <CustomFormField
            control={form.control}
            name="State"
            fieldType={FormFieldType.INPUT}
            label="State"
            placeholder="Enter your state"
          />

          <CustomFormField
            control={form.control}
            name="Landmark"
            fieldType={FormFieldType.INPUT}
            label="Landmark"
            placeholder="Enter nearby landmark"
          />

          <CustomFormField
            control={form.control}
            name="PinCode"
            fieldType={FormFieldType.INPUT}
            label="Pin Code"
            placeholder="Enter pin code"
          />

          <CustomFormField
            control={form.control}
            name="Country"
            fieldType={FormFieldType.SELECT}
            label="Country"
            placeholder="Select country"
          >
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
          </CustomFormField>

          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">
              Shipping Address (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomFormField
                control={form.control}
                name="Shipping_Address"
                fieldType={FormFieldType.INPUT}
                label="Shipping Address"
                placeholder="Enter shipping address"
              />

              <CustomFormField
                control={form.control}
                name="Shipping_City"
                fieldType={FormFieldType.INPUT}
                label="City"
                placeholder="Enter shipping city"
              />

              <CustomFormField
                control={form.control}
                name="Shipping_State"
                fieldType={FormFieldType.INPUT}
                label="State"
                placeholder="Enter shipping state"
              />

              <CustomFormField
                control={form.control}
                name="Shipping_Landmark"
                fieldType={FormFieldType.INPUT}
                label="Landmark"
                placeholder="Enter nearby landmark"
              />

              <CustomFormField
                control={form.control}
                name="Shipping_PinCode"
                fieldType={FormFieldType.INPUT}
                label="Pin Code"
                placeholder="Enter shipping pin code"
              />

              <CustomFormField
                control={form.control}
                name="Shipping_Country"
                fieldType={FormFieldType.SELECT}
                label="Country"
                placeholder="Select shipping country"
              >
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </CustomFormField>
            </div>
          </div>

          <CustomFormField
            control={form.control}
            name="company_name"
            fieldType={FormFieldType.INPUT}
            label="Company Name"
            placeholder="Enter your company name"
          />

          <CustomFormField
            control={form.control}
            name="gst_no"
            fieldType={FormFieldType.INPUT}
            label="GST Number"
            placeholder="Enter GST number"
          />

          <CustomFormField
            control={form.control}
            name="pan_no"
            fieldType={FormFieldType.INPUT}
            label="PAN Number"
            placeholder="Enter PAN number"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600"
            disabled={isPending}
          >
            Submit for Verification
          </Button>
        </div>
      </form>
    </Form>
  );
};
