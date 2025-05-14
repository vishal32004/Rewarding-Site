import { Link } from "react-router-dom";
import { CheckCircle, Clock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouForRequest() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="bg-[#f5f7fa] border-b border-[#e6eaf0] px-8 py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#ebf5ec] flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-[#38a169]" />
              </div>
              <div>
                <h1 className="text-[#2d3748] text-lg font-semibold">
                  Request Confirmation
                </h1>
                <p className="text-[#718096] text-sm">
                  Submitted on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-[#2d3748] text-2xl font-semibold mb-3">
                  Thank You for Your Request
                </h2>
                <p className="text-[#718096] max-w-xl mx-auto">
                  We've received your submission and our team will begin
                  processing it promptly. You will receive a confirmation email
                  shortly with the details of your request.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-[#4a5568] mr-2" />
                    <h3 className="text-[#2d3748] font-medium">
                      Processing Time
                    </h3>
                  </div>
                  <p className="text-[#718096] text-sm">
                    Your request will be reviewed within 24-48 business hours
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-[#4a5568] mr-2" />
                    <h3 className="text-[#2d3748] font-medium">
                      Email Confirmation
                    </h3>
                  </div>
                  <p className="text-[#718096] text-sm">
                    You'll receive a detailed confirmation email with your
                    request information
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-[#4a5568] mr-2" />
                    <h3 className="text-[#2d3748] font-medium">
                      Personal Follow-up
                    </h3>
                  </div>
                  <p className="text-[#718096] text-sm">
                    A team member will contact you if additional information is
                    required
                  </p>
                </div>
              </div>

              <div className="border-t border-[#e2e8f0] pt-8 mt-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    variant="outline"
                    className="border-[#cbd5e0] text-[#4a5568] hover:bg-[#f7fafc] hover:text-[#2d3748] rounded-md px-6 py-2.5 text-sm font-medium"
                  >
                    <Link to="/">Return to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-[#a0aec0] text-sm">
          <p>
            If you have any questions, please contact our support team at{" "}
            <a
              href="mailto:support@company.com"
              className="text-[#4299e1] hover:underline"
            >
              support@company.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
