import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
// import { OtpModal } from "@/components/Popup/OtpModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authentication";
import { toast } from "sonner";
import { useAppStore } from "@/store/store";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAppStore();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === 1 && data.User) {
        toast.success(data.message);
        setAuth(data.User);
        // Redirect to login or verification page
        // navigate("/thank-you-for-request");
        // Or if you need OTP verification:
        // setOpen(true);
        navigate(from, { replace: true });
      } else {
        console.log(data.error);
        toast.error(data.message || "Failed to Login");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    // setOpen(true);
    mutate(values);
  }

  function handleTogglePassword() {
    setShowPassword((el) => !el);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="w-full md:max-w-4xl">
        <div className="flex justify-center items-center gap-6 flex-col">
          <img
            src="images/logo.jpeg"
            alt="Lukit gifts"
            height={100}
            width={100}
          />
          <Card className="overflow-hidden w-md">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  className="p-6 md:p-8"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                    </div>

                    <CustomFormField
                      control={form.control}
                      name="email"
                      fieldType={FormFieldType.INPUT}
                      label="Email"
                      placeholder="Enter Email"
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            {showPassword ? (
                              <Eye
                                className="absolute right-2 top-[5px] cursor-pointer"
                                onClick={handleTogglePassword}
                                color="#22c55e"
                              />
                            ) : (
                              <EyeOff
                                className="absolute right-2 top-[5px] cursor-pointer"
                                onClick={handleTogglePassword}
                                color="#22c55e"
                              />
                            )}
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={isPending}
                    >
                      Login
                    </Button>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?
                      <Link
                        to="/signup"
                        className="underline underline-offset-4 ml-2"
                      >
                        Sign up
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

export default Login;
