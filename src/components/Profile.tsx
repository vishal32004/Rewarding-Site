import { fetchUserDetails } from "@/api/profile";
import { formatDate } from "@/lib/helper";
import { useAppStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  Home,
  Flag,
  Navigation,
  Building,
  Hash,
  Cake,
  Check,
} from "lucide-react";

const Profile = () => {
  const { user } = useAppStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => fetchUserDetails(user!.email),
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.email,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something Went Wrong</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-5 flex items-center text-gray-800">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.first_name}
                {data?.Registerdata?.last_name}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </p>
              <p className="font-medium text-gray-800 flex items-center mt-1">
                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                {data?.Userdata?.email}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </p>
              <p className="font-medium text-gray-800 flex items-center mt-1">
                <Phone className="mr-2 h-4 w-4 text-gray-400" />
                {data?.Registerdata?.Mobile}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.Gender}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birth Date
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Cake className="mr-2 h-4 w-4 text-gray-400" />
                  {data?.Registerdata?.Day} {data?.Registerdata?.Month}
                  {data?.Registerdata?.Year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Address */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-5 flex items-center text-gray-800">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3">
              <Home className="h-5 w-5 text-emerald-600" />
            </div>
            Primary Address
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.Address}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.City}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.State}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Flag className="mr-2 h-4 w-4 text-gray-400" />
                  {data?.Registerdata?.Country}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pincode
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Hash className="mr-2 h-4 w-4 text-gray-400" />
                  {data?.Registerdata?.PinCode}
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Landmark
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.Landmark}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-5 flex items-center text-gray-800">
            <div className="bg-amber-100 p-2 rounded-lg mr-3">
              <Navigation className="h-5 w-5 text-amber-600" />
            </div>
            Shipping Address
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.Shipping_Address}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.Shipping_City}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.Shipping_State}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Flag className="mr-2 h-4 w-4 text-gray-400" />
                  {data?.Registerdata?.Shipping_Country}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pincode
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Hash className="mr-2 h-4 w-4 text-gray-400" />
                  {data?.Registerdata?.Shipping_PinCode}
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Landmark
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.Shipping_Landmark}
              </p>
            </div>
          </div>
        </div>

        {/* Company & Verification */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-5 flex items-center text-gray-800">
            <div className="bg-sky-100 p-2 rounded-lg mr-3">
              <Building className="h-5 w-5 text-sky-600" />
            </div>
            Company & Verification
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {data?.Registerdata?.company_name}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GST Number
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.gst_no}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PAN Number
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.Registerdata?.pan_no}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100 flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Email Verified
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100 flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Terms Accepted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account Created
            </p>
            <p className="font-medium text-gray-800 mt-1">
              {formatDate(data?.Userdata?.created_at ?? "")}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="font-medium text-gray-800 mt-1">
              {formatDate(data?.Registerdata?.updated_at ?? "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
