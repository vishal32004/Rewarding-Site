import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DateRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CodeData {
  id: string;
  user: string;
  type: string;
  value: string;
  status: "Redeemed" | "Sent" | "Expired";
  date: string;
}

interface MonthlyData {
  name: string;
  sent: number;
  redeemed: number;
}

interface TypeData {
  name: string;
  value: number;
}

interface Recipient {
  id: number;
  name: string;
  email: string;
  codes: number;
  type: string;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  codesSent: number;
  codesRedeemed: number;
  status: "Active" | "Completed" | "Upcoming";
}

interface CodesReportsProps {
  dateRange: DateRange;
  program: string;
}

export default function CodesReports({
  dateRange,
  program,
}: CodesReportsProps) {
  const [codeFilter, setCodeFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const totalCodesSent = 5280;
  const totalCodesRedeemed = 3142;
  const redemptionRate = Math.round(
    (totalCodesRedeemed / totalCodesSent) * 100
  );
  const totalCampaigns = 18;

  const monthlyData: MonthlyData[] = [
    { name: "Jan", sent: 520, redeemed: 310 },
    { name: "Feb", sent: 580, redeemed: 350 },
    { name: "Mar", sent: 620, redeemed: 380 },
    { name: "Apr", sent: 590, redeemed: 340 },
    { name: "May", sent: 680, redeemed: 420 },
    { name: "Jun", sent: 710, redeemed: 450 },
    { name: "Jul", sent: 750, redeemed: 480 },
    { name: "Aug", sent: 730, redeemed: 412 },
  ];

  const typeData: TypeData[] = [
    { name: "Discount Codes", value: 40 },
    { name: "Free Product", value: 25 },
    { name: "Free Shipping", value: 20 },
    { name: "Gift Cards", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentCodes: CodeData[] = [
    {
      id: "CODE-2234",
      user: "Linda Perez",
      type: "Discount",
      value: "25% OFF",
      status: "Redeemed",
      date: "2025-04-09",
    },
    {
      id: "CODE-2235",
      user: "Raj Patel",
      type: "Gift Card",
      value: "$100",
      status: "Sent",
      date: "2025-03-20",
    },
    {
      id: "CODE-2236",
      user: "Emily Johnson",
      type: "Free Product",
      value: "Noise Cancelling Earbuds",
      status: "Redeemed",
      date: "2025-02-06",
    },
    {
      id: "CODE-2237",
      user: "Sales Rocket Team",
      type: "Free Shipping",
      value: "Free Shipping",
      status: "Expired",
      date: "2024-12-30",
    },
    {
      id: "CODE-2238",
      user: "Olivia Nguyen",
      type: "Discount",
      value: "10% OFF",
      status: "Sent",
      date: "2024-11-15",
    },
    {
      id: "CODE-2239",
      user: "NeoCorp Ltd",
      type: "Gift Card",
      value: "$200",
      status: "Redeemed",
      date: "2024-10-22",
    },
    {
      id: "CODE-2240",
      user: "Innovation Team",
      type: "Free Product",
      value: "Smart Water Bottle",
      status: "Redeemed",
      date: "2024-09-19",
    },
  ];

  const topRecipients: Recipient[] = [
    {
      id: 1,
      name: "Linda Perez",
      email: "linda@example.com",
      codes: 24,
      type: "Individual",
    },
    {
      id: 2,
      name: "Design Team",
      email: "design@example.com",
      codes: 18,
      type: "Team",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@example.com",
      codes: 21,
      type: "Individual",
    },
    {
      id: 4,
      name: "Growth Hackers Inc",
      email: "growth@example.com",
      codes: 15,
      type: "Client",
    },
    {
      id: 5,
      name: "Innovation Team",
      email: "innovation@example.com",
      codes: 19,
      type: "Team",
    },
  ];

  const campaigns: Campaign[] = [
    {
      id: "C-2001",
      name: "Spring Discount Drive",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      codesSent: 850,
      codesRedeemed: 520,
      status: "Active",
    },
    {
      id: "C-2002",
      name: "New Customer Welcome",
      startDate: "2025-01-15",
      endDate: "2025-12-31",
      codesSent: 620,
      codesRedeemed: 380,
      status: "Active",
    },
    {
      id: "C-2003",
      name: "Summer Referral Bonus",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      codesSent: 0,
      codesRedeemed: 0,
      status: "Upcoming",
    },
    {
      id: "C-2004",
      name: "Holiday Gift Cards",
      startDate: "2024-11-15",
      endDate: "2025-01-15",
      codesSent: 1200,
      codesRedeemed: 980,
      status: "Completed",
    },
  ];

  // Filter data based on program with proper typing
  const filterDataByProgram = (data: MonthlyData[]): MonthlyData[] => {
    if (program === "all") return data;

    return data.map((item) => ({
      ...item,
      sent:
        program === "internal"
          ? item.sent * 0.4
          : program === "external"
          ? item.sent * 0.3
          : program === "channel"
          ? item.sent * 0.1
          : program === "dealers"
          ? item.sent * 0.1
          : program === "realestate"
          ? item.sent * 0.05
          : item.sent * 0.05,
      redeemed:
        program === "internal"
          ? item.redeemed * 0.4
          : program === "external"
          ? item.redeemed * 0.3
          : program === "channel"
          ? item.redeemed * 0.1
          : program === "dealers"
          ? item.redeemed * 0.1
          : item.redeemed * 0.05
          ? item.redeemed * 0.05
          : item.redeemed * 0.05,
    }));
  };

  // Apply filter to monthly data
  const filteredMonthlyData = filterDataByProgram(monthlyData);

  // Filter codes based on date range and code filter
  const filteredRecentCodes = recentCodes.filter((code) => {
    if (!dateRange?.from || !dateRange?.to) return true;

    const codeDate = parseISO(code.date);
    const dateMatches = isWithinInterval(codeDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });

    if (!dateMatches) return false;

    // Apply code filter
    if (codeFilter === "redeemed" && code.status !== "Redeemed") return false;
    if (codeFilter === "sent" && code.status !== "Sent") return false;
    if (codeFilter === "not-redeemed" && code.status === "Redeemed")
      return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Codes Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCodesSent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Codes Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCodesRedeemed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +10.8% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Redemption Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redemptionRate}%</div>
            <p className="text-xs text-muted-foreground">
              -1.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              +2 from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Codes Sent vs. Redeemed</CardTitle>
            <CardDescription>
              Monthly comparison for the current year
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredMonthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" fill="#8884d8" name="Codes Sent" />
                <Bar dataKey="redeemed" fill="#82ca9d" name="Codes Redeemed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Codes Distribution by Type</CardTitle>
            <CardDescription>Percentage of codes by type</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="flex justify-end p-4 border-b">
          <Select value={codeFilter} onValueChange={setCodeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter codes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Codes</SelectItem>
              <SelectItem value="redeemed">Codes Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Codes Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Codes Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Who Received Maximum Codes?</CardTitle>
          <CardDescription>
            Top recipients ranked from maximum to minimum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Codes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={recipient.name}
                        />
                        <AvatarFallback>
                          {recipient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{recipient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{recipient.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{recipient.type}</Badge>
                  </TableCell>
                  <TableCell>{recipient.codes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <div className="flex justify-end p-4 border-b">
          <Select value={codeFilter} onValueChange={setCodeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter codes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Codes</SelectItem>
              <SelectItem value="redeemed">Codes Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Codes Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Codes Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Campaign Level Report</CardTitle>
          <CardDescription>
            Performance metrics for individual campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign ID</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Codes Sent</TableHead>
                <TableHead>Codes Redeemed</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.startDate}</TableCell>
                  <TableCell>{campaign.endDate}</TableCell>
                  <TableCell>{campaign.codesSent.toLocaleString()}</TableCell>
                  <TableCell>
                    {campaign.codesRedeemed.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "Active"
                          ? "default"
                          : campaign.status === "Completed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <div className="flex justify-end p-4 border-b">
          <Select value={codeFilter} onValueChange={setCodeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter codes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Codes</SelectItem>
              <SelectItem value="redeemed">Codes Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Codes Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Codes Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Recent Code Transactions</CardTitle>
          <CardDescription>
            Latest code activities from{" "}
            {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
            {dateRange?.to?.toLocaleDateString() ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecentCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.id}</TableCell>
                  <TableCell>{code.user}</TableCell>
                  <TableCell>{code.type}</TableCell>
                  <TableCell>{code.value}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        code.status === "Redeemed"
                          ? "default"
                          : code.status === "Sent"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {code.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{code.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
