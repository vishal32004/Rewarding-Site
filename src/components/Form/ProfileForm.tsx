import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import { Form } from "@/components/ui/form";
import { useAppStore } from "@/store/store";

const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileForm = () => {
  const { user } = useAppStore();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log("Profile form submitted:", values);
    // Add your form submission logic here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="firstName"
            fieldType={FormFieldType.INPUT}
            label="First name"
            placeholder="Enter your first name"
          />

          <CustomFormField
            control={form.control}
            name="lastName"
            fieldType={FormFieldType.INPUT}
            label="Last name"
            placeholder="Enter your last name"
          />

          <CustomFormField
            control={form.control}
            name="email"
            fieldType={FormFieldType.INPUT}
            label="Email"
            placeholder="Enter your email"
            inputType="email"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
