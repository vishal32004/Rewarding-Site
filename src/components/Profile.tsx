import { formatDate } from "@/lib/helper";
import { useAppStore } from "@/store/store";
import {
  User,
  Mail,
  Phone,
  Home,
  Flag,
  Navigation,
  Hash,
  Cake,
} from "lucide-react";

const Profile = () => {
  const { userRegisterData } = useAppStore();

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
                {userRegisterData?.first_name} {userRegisterData?.last_name}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </p>
              <p className="font-medium text-gray-800 flex items-center mt-1">
                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                {userRegisterData?.email}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </p>
              <p className="font-medium text-gray-800 flex items-center mt-1">
                <Phone className="mr-2 h-4 w-4 text-gray-400" />
                {userRegisterData?.Mobile}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {userRegisterData?.Gender}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birth Date
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Cake className="mr-2 h-4 w-4 text-gray-400" />
                  {userRegisterData?.Day} {userRegisterData?.Month}
                  {userRegisterData?.Year}
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
                {userRegisterData?.Address}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {userRegisterData?.City}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {userRegisterData?.State}
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
                  {userRegisterData?.Country}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pincode
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Hash className="mr-2 h-4 w-4 text-gray-400" />
                  {userRegisterData?.PinCode}
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Landmark
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {userRegisterData?.Landmark}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
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
                {userRegisterData?.Shipping_Address}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {userRegisterData?.Shipping_City}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </p>
                <p className="font-medium text-gray-800 mt-1">
                  {userRegisterData?.Shipping_State}
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
                  {userRegisterData?.Shipping_Country}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pincode
                </p>
                <p className="font-medium text-gray-800 flex items-center mt-1">
                  <Hash className="mr-2 h-4 w-4 text-gray-400" />
                  {userRegisterData?.Shipping_PinCode}
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Landmark
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {userRegisterData?.Shipping_Landmark}
              </p>
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
              {formatDate(userRegisterData?.created_at ?? "")}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="font-medium text-gray-800 mt-1">
              {formatDate(userRegisterData?.updated_at ?? "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
