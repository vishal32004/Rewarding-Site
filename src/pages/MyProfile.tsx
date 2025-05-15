import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Building, Mail, Edit3 } from "lucide-react";
import { ProfileForm } from "@/components/Form/ProfileForm";
import { ChangePasswordForm } from "@/components/Form/ChangePasswordForm";
import { BusinessVerificationForm } from "@/components/Form/BusinessVerificationForm";

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

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 relative">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <div className="flex items-center justify-center mt-1 text-sm text-slate-500">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  <span>john.doe@example.com</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 p-1 rounded-xl">
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
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3">
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
                    <ProfileForm />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Change Password Tab */}
              <TabsContent value="password" className="mt-6">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-slate-100 p-2">
                        <Lock className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Change Password
                        </CardTitle>
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
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-3">
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
    </div>
  );
}
