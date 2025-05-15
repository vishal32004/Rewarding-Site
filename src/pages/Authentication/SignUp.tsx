import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";

// import { OtpModal } from "@/components/Popup/OtpModal";
import { Link, useNavigate } from "react-router-dom";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import { signUp } from "@/api/authentication";
import { toast } from "sonner";
import { SelectItem } from "@/components/ui/select";

const signupFormSchema = z.object({
  company_name: z.string().min(2, "Name must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Please Enter A Valid Phone Number"),
  number_of_employee: z.string().min(1, "Please Enter A Valid Number"),
});

const Signup = () => {
  // const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data.status === 1) {
        toast.success("Account created successfully!");
        // Redirect to login or verification page
        navigate("/thank-you-for-request");
        // Or if you need OTP verification:
        // setOpen(true);
      } else {
        console.log(data.error);
        toast.error(data.error || "Failed to create account");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      company_name: "",
      name: "",
      email: "",
      mobile: "",
      number_of_employee: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    // setOpen(true);
    mutate(values);
  }

  return (
    <div className="py-5 flex justify-center">
      <div className="w-full md:max-w-4xl">
        <div className="flex flex-col gap-6 items-center">
          <img
            src="images/logo.jpeg"
            alt="Lukit gifts"
            height={100}
            width={100}
          />
          <Card className="overflow-hidden w-lg">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Create an Account</h1>
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="company_name"
                        fieldType={FormFieldType.INPUT}
                        label="Company Name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="name"
                        fieldType={FormFieldType.INPUT}
                        label="Name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="email"
                        fieldType={FormFieldType.INPUT}
                        label="Email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="mobile"
                        fieldType={FormFieldType.INPUT}
                        label="Number"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="number_of_employee"
                        fieldType={FormFieldType.SELECT}
                        label="Number Of Employees"
                      >
                        <SelectItem value="0-50">0-50</SelectItem>
                        <SelectItem value="51 - 200">51 - 200</SelectItem>
                        <SelectItem value="201 - 500">201 - 500</SelectItem>
                        <SelectItem value="501 - 1000">501 - 1000</SelectItem>
                        <SelectItem value="1001 - 5000">1001 - 5000</SelectItem>
                        <SelectItem value="5001 - 10000">
                          5001 - 10000
                        </SelectItem>
                        <SelectItem
                          value="10000+"
                        >
                          10000+
                        </SelectItem>
                      </CustomFormField>
                    </div>
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={isPending}
                    >
                      Sign Up
                    </Button>
                    <div className="text-center text-sm">
                      Already have an account?
                      <Link
                        to="/login"
                        className="underline underline-offset-4 ml-2"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* {open && <OtpModal open={open} setOpen={setOpen} />} */}
    </div>
  );
};

export default Signup;
