import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DateRange } from "react-day-picker";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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

interface Recipient {
  id: number;
  name: string;
  email: string;
  points: number;
  tier: string;
  redemptions: number;
  type: string;
  lastActive?: string;
}

interface RecipientType {
  name: string;
  count: number;
  percentage: number;
}

interface EngagementData {
  name: string;
  engagement: number;
}

interface EventType {
  name: string;
  count: number;
  percentage: number;
}

interface RecipientReportsProps {
  dateRange: DateRange;
  program: string;
  recipientType: string;
}

export default function RecipientReports({
  dateRange,
  program,
  recipientType,
}: RecipientReportsProps) {
  const [rewardTypeFilter, setRewardTypeFilter] = useState("all");
  const [adminLevelFilter, setAdminLevelFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const recipientTypes: RecipientType[] = [
    { name: "Internal Employees", count: 850, percentage: 34 },
    { name: "External Clients", count: 650, percentage: 26 },
    { name: "Channel Partner", count: 450, percentage: 18 },
    { name: "Auto Dealers", count: 300, percentage: 12 },
    { name: "Real Estate", count: 250, percentage: 10 },
  ];

  const eventTypes: EventType[] = [
    { name: "Purchase", count: 1200, percentage: 40 },
    { name: "Referral", count: 750, percentage: 25 },
    { name: "Feedback", count: 600, percentage: 20 },
    { name: "Milestone", count: 450, percentage: 15 },
  ];

  const engagementData: EngagementData[] = [
    { name: "Jan", engagement: 65 },
    { name: "Feb", engagement: 68 },
    { name: "Mar", engagement: 72 },
    { name: "Apr", engagement: 70 },
    { name: "May", engagement: 75 },
    { name: "Jun", engagement: 78 },
    { name: "Jul", engagement: 82 },
    { name: "Aug", engagement: 80 },
  ];

  const adminLevels = [
    { value: "all", label: "All Levels" },
    { value: "l1", label: "Level 1" },
    { value: "l2", label: "Level 2" },
    { value: "l3", label: "Level 3" },
  ];

  const rewardTypes = [
    { value: "all", label: "All Types" },
    { value: "points", label: "Points" },
    { value: "codes", label: "Codes" },
    { value: "links", label: "Links" },
  ];

  const campaigns = [
    { value: "all", label: "All Campaigns" },
    { value: "c1", label: "Spring Loyalty Drive" },
    { value: "c2", label: "New Customer Welcome" },
    { value: "c3", label: "Summer Referral Bonus" },
    { value: "c4", label: "Holiday Rewards" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const topRecipients: Recipient[] = [
    {
      id: 1,
      name: "Linda Perez",
      email: "linda@example.com",
      points: 6100,
      tier: "Platinum",
      redemptions: 15,
      type: "Internal Employees",
      lastActive: "2025-04-15",
    },
    {
      id: 2,
      name: "Design Team",
      email: "design@example.com",
      points: 4450,
      tier: "Gold",
      redemptions: 9,
      type: "Internal Employees",
      lastActive: "2025-03-30",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@example.com",
      points: 5300,
      tier: "Platinum",
      redemptions: 13,
      type: "External Clients",
      lastActive: "2025-02-18",
    },
    {
      id: 4,
      name: "Growth Hackers Inc",
      email: "growth@example.com",
      points: 3900,
      tier: "Gold",
      redemptions: 8,
      type: "Channel Partner",
      lastActive: "2025-01-22",
    },
    {
      id: 5,
      name: "Innovation Team",
      email: "innovation@example.com",
      points: 4700,
      tier: "Gold",
      redemptions: 10,
      type: "Internal Employees",
      lastActive: "2025-01-04",
    },
    {
      id: 6,
      name: "Beta Solutions",
      email: "beta@example.com",
      points: 4200,
      tier: "Gold",
      redemptions: 9,
      type: "External Clients",
      lastActive: "2024-12-16",
    },
    {
      id: 7,
      name: "Emily Johnson",
      email: "emilyj@example.com",
      points: 4900,
      tier: "Platinum",
      redemptions: 11,
      type: "Auto Dealers",
      lastActive: "2024-11-30",
    },
    {
      id: 8,
      name: "Sales Rocket Team",
      email: "salesrocket@example.com",
      points: 3500,
      tier: "Gold",
      redemptions: 7,
      type: "Internal Employees",
      lastActive: "2024-10-12",
    },
    {
      id: 9,
      name: "Olivia Nguyen",
      email: "olivia@example.com",
      points: 4100,
      tier: "Gold",
      redemptions: 9,
      type: "Real Estate",
      lastActive: "2024-09-07",
    },
    {
      id: 10,
      name: "NeoCorp Ltd",
      email: "neocorp@example.com",
      points: 3600,
      tier: "Gold",
      redemptions: 7,
      type: "External Clients",
      lastActive: "2024-08-14",
    },
  ];

  // Filter recipients based on type, reward type, admin level, campaign, and date range
  const filteredRecipients = topRecipients.filter((recipient) => {
    // Filter by recipient type
    if (
      recipientType !== "all" &&
      recipient.type.toLowerCase() !== recipientType
    ) {
      return false;
    }

    // Filter by date range if lastActive exists
    if (recipient.lastActive && dateRange?.from && dateRange?.to) {
      const lastActiveDate = parseISO(recipient.lastActive);
      return isWithinInterval(lastActiveDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      });
    }

    return true;
  });

  // Filter recipient types based on selected type
  const filteredRecipientTypes =
    recipientType === "all"
      ? recipientTypes
      : recipientTypes.filter(
          (type) => type.name.toLowerCase() === recipientType
        );

  // Filter engagement data by date range if needed
  const filteredEngagementData = engagementData; // Add date filtering if your engagement data has dates

  // Display text for program and type
  const programDisplay =
    program === "all"
      ? "All Programs"
      : program === "internal"
      ? "Internal Employees"
      : program === "external"
      ? "External Clients"
      : program === "channel"
      ? "Channel Partner"
      : program === "dealers"
      ? "Auto Dealers"
      : program === "realestate"
      ? "Real Estate"
      : "Admin Level";

  const typeDisplay =
    recipientType === "all"
      ? "All Types"
      : recipientType === "individual"
      ? "Individuals"
      : recipientType === "team"
      ? "Teams"
      : "Clients";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recipients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Recipients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,875</div>
            <p className="text-xs text-muted-foreground">
              75% of total recipients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recipient Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Redemptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.8</div>
            <p className="text-xs text-muted-foreground">
              +1.2 from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recipient Types & Event Type Level</CardTitle>
            <CardDescription>
              Distribution of recipients by type from{" "}
              {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
              {dateRange?.to?.toLocaleDateString() ?? "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecipientTypes.map((type) => (
                <div key={type.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({type.count})
                      </span>
                    </div>
                    <span className="text-sm">{type.percentage}%</span>
                  </div>
                  <Progress value={type.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Event Type Level</CardTitle>
            <CardDescription>Distribution of events by type</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {eventTypes.map((entry, index) => (
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
        <CardHeader>
          <CardTitle>Recipient Engagement Trend</CardTitle>
          <CardDescription>
            Monthly engagement from{" "}
            {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
            {dateRange?.to?.toLocaleDateString() ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredEngagementData}
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
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <div className="flex flex-wrap gap-4 justify-end p-4 border-b">
          <Select value={rewardTypeFilter} onValueChange={setRewardTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Reward Type" />
            </SelectTrigger>
            <SelectContent>
              {rewardTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={adminLevelFilter} onValueChange={setAdminLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Admin Level" />
            </SelectTrigger>
            <SelectContent>
              {adminLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.value} value={campaign.value}>
                  {campaign.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Top Recipients</CardTitle>
          <CardDescription>
            {typeDisplay} with the highest point balances in {programDisplay}
            from {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
            {dateRange?.to?.toLocaleDateString() ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Points Balance</TableHead>
                <TableHead>Redemptions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipients.map((recipient) => (
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
                  <TableCell>{recipient.tier}</TableCell>
                  <TableCell>{recipient.points.toLocaleString()}</TableCell>
                  <TableCell>{recipient.redemptions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
