import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import { Form } from "@/components/ui/form";
import { CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";
import { changePassword } from "@/api/profile";
import { useMutation } from "@tanstack/react-query";
const passwordFormSchema = z
  .object({
    user_id: z.number(),
    old_password: z.string().min(8, "Password must be at least 8 characters"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof passwordFormSchema>;

export const ChangePasswordForm = () => {
  const { user } = useAppStore();
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.status === 1) {
        toast.success("Passoword Changed successfully!");
      } else {
        console.log(data.error);
        toast.error(data.error || "Failed to create account");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
  });

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      user_id: user?.id,
      old_password: "",
      new_password: "",
      confirmPassword: "",
      email: user?.email,
    },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    console.log("Password form submitted:", values);
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <CustomFormField
            control={form.control}
            name="old_password"
            fieldType={FormFieldType.INPUT}
            label="Current password"
            placeholder="Enter your current password"
            inputType="password"
          />

          <CustomFormField
            control={form.control}
            name="new_password"
            fieldType={FormFieldType.INPUT}
            label="New password"
            placeholder="Enter your new password"
            inputType="password"
          />

          <CustomFormField
            control={form.control}
            name="confirmPassword"
            fieldType={FormFieldType.INPUT}
            label="Confirm new password"
            placeholder="Confirm your new password"
            inputType="password"
          />

          <div className="rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 p-4 border border-amber-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">
                  Password requirements
                </h3>
                <div className="mt-2 text-sm text-amber-700">
                  <ul className="list-none space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>At least 8 characters</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>At least one uppercase letter</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>At least one number</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
            disabled={isPending}
          >
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};
