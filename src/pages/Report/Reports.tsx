import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import PointsReports from "@/components/Reports/points-report";
import CodesReports from "@/components/Reports/code-report";
import RecipientReports from "@/components/Reports/recipient-report";
import ProductReports from "@/components/Reports/product-report";
import LinksReport from "@/components/Reports/link-report";
import type { DateRange } from "react-day-picker";

export default function ReportsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [program, setProgram] = useState("all");
  const [recipientType, setRecipientType] = useState("all");
  const [activeTab, setActiveTab] = useState("points");
  const [dateOption, setDateOption] = useState("current-month");

  // Handle date option change
  const handleDateOptionChange = (value: string) => {
    setDateOption(value);
    const today = new Date();
    let from = new Date();

    switch (value) {
      case "current-month":
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "last-month":
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case "last-3-months":
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        break;
      case "last-6-months":
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1);
        break;
      case "last-9-months":
        from = new Date(today.getFullYear(), today.getMonth() - 9, 1);
        break;
      case "last-1-year":
        from = new Date(today.getFullYear() - 1, today.getMonth(), 1);
        break;
      case "custom":
        // Keep the current date range for custom
        return;
    }

    setDateRange({ from, to: today });
  };

  // Filter options
  const programs = [
    { value: "all", label: "All Programs" },
    { value: "internal", label: "Internal Employees" },
    { value: "external", label: "External Clients" },
    { value: "channel", label: "Channel Partner" },
    { value: "dealers", label: "Auto Dealers" },
    { value: "realestate", label: "Real Estate" },
    { value: "admin", label: "Admin Level" },
  ];

  const dateOptions = [
    { value: "custom", label: "Custom Date Range" },
    { value: "current-month", label: "Current Month" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "last-9-months", label: "Last 9 Months" },
    { value: "last-1-year", label: "Last 1 Year" },
  ];

  const recipientTypes = [
    { value: "all", label: "All Types" },
    { value: "individual", label: "Individual" },
    { value: "team", label: "Team" },
    { value: "client", label: "Client" },
  ];

  // Handle filter changes
  const handleProgramChange = (value: string) => {
    setProgram(value);
  };

  const handleRecipientTypeChange = (value: string) => {
    setRecipientType(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRefresh = () => {
    // In a real app, this would refetch data
    alert("Refreshing data...");
  };

  const handleExport = () => {
    // In a real app, this would export data
    alert("Exporting data...");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze reward points and codes performance
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select value={dateOption} onValueChange={handleDateOptionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              {dateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {dateOption === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm"
                value={
                  dateRange.from
                    ? dateRange.from.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    from: new Date(e.target.value),
                  }))
                }
              />
              <span>to</span>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm"
                value={
                  dateRange.to ? dateRange.to.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    to: new Date(e.target.value),
                  }))
                }
              />
              <Button size="sm" onClick={() => alert("Date range applied")}>
                Apply
              </Button>
            </div>
          )}
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="points"
        className="space-y-6"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="points">Points Reports</TabsTrigger>
            <TabsTrigger value="codes">Codes Reports</TabsTrigger>
            <TabsTrigger value="recipients">Recipient Reports</TabsTrigger>
            <TabsTrigger value="products">Product Reports</TabsTrigger>
            <TabsTrigger value="links">Links Reports</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={program} onValueChange={handleProgramChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((prog) => (
                  <SelectItem key={prog.value} value={prog.value}>
                    {prog.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeTab === "recipients" && (
              <Select
                value={recipientType}
                onValueChange={handleRecipientTypeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {recipientTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <TabsContent value="points" className="space-y-6">
          <PointsReports dateRange={dateRange} program={program} />
        </TabsContent>

        <TabsContent value="codes" className="space-y-6">
          <CodesReports dateRange={dateRange} program={program} />
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <RecipientReports
            dateRange={dateRange}
            program={program}
            recipientType={recipientType}
          />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductReports dateRange={dateRange} program={program} />
        </TabsContent>
        <TabsContent value="links" className="space-y-6">
          <LinksReport dateRange={dateRange} program={program} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
