import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Lock, Building, Edit3 } from "lucide-react";
import { ChangePasswordForm } from "@/components/Form/ChangePasswordForm";
import { BusinessVerificationForm } from "@/components/Form/BusinessVerificationForm";
import Profile from "@/components/Profile";

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your profile, security, and business settings
          </p>
        </div>
        <div className="space-y-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-[45px] bg-slate-100/80 p-1 rounded-xl">
              <TabsTrigger
                value="profile"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Change Password
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Business Verification
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="border-0 shadow-md overflow-hidden py-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">
                        Profile Information
                      </CardTitle>
                      <CardDescription>
                        Update your account details and public profile
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-8 w-8"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <Profile />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="password" className="mt-6">
              <Card className="border-0 shadow-md overflow-hidden py-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3 py-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-slate-100 p-2">
                      <Lock className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <ChangePasswordForm />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Verification Tab */}
            <TabsContent value="business" className="mt-6">
              <Card className="border-0 shadow-md overflow-hidden py-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3 py-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-slate-100 p-2">
                      <Building className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Business Verification
                      </CardTitle>
                      <CardDescription>
                        Verify your business to unlock additional features and
                        benefits
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <BusinessVerificationForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
