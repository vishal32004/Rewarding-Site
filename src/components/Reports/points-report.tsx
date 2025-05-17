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

interface Transaction {
  id: string;
  user: string;
  type: "Earned" | "Redeemed";
  points: number;
  reason: string;
  date: string;
}

interface MonthlyData {
  name: string;
  sent: number;
  redeemed: number;
}

interface ChannelData {
  name: string;
  value: number;
}

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

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  pointsSent: number;
  pointsRedeemed: number;
  status: "Active" | "Completed" | "Upcoming";
}

interface PointsReportsProps {
  dateRange: DateRange;
  program: string;
}

export default function PointsReports({
  dateRange,
  program,
}: PointsReportsProps) {
  const [pointsFilter, setPointsFilter] = useState("all");

  // Filter data based on program
  const filterDataByProgram = (data: MonthlyData[]) => {
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
          : program === "realestate"
          ? item.redeemed * 0.05
          : item.redeemed * 0.05,
    }));
  };

  // Sample data - in a real app, this would come from an API
  const totalPointsSent = 125750;
  const totalPointsRedeemed = 87320;
  const redemptionRate = Math.round(
    (totalPointsRedeemed / totalPointsSent) * 100
  );
  const totalCampaigns = 24;

  const monthlyData: MonthlyData[] = [
    { name: "Jan", sent: 12500, redeemed: 8700 },
    { name: "Feb", sent: 13200, redeemed: 9100 },
    { name: "Mar", sent: 15800, redeemed: 10500 },
    { name: "Apr", sent: 14700, redeemed: 9800 },
    { name: "May", sent: 16800, redeemed: 11200 },
    { name: "Jun", sent: 17500, redeemed: 12300 },
    { name: "Jul", sent: 18250, redeemed: 13100 },
    { name: "Aug", sent: 17000, redeemed: 12620 },
  ];

  const channelData: ChannelData[] = [
    { name: "Purchase Rewards", value: 45 },
    { name: "Referral Bonuses", value: 25 },
    { name: "Promotional", value: 20 },
    { name: "Birthday Rewards", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentTransactions: Transaction[] = [
    {
      id: "TX-9001",
      user: "Linda Perez",
      type: "Earned",
      points: 300,
      reason: "Purchase",
      date: "2025-04-10",
    },
    {
      id: "TX-9002",
      user: "Raj Patel",
      type: "Redeemed",
      points: 700,
      reason: "Gift Card",
      date: "2025-03-22",
    },
    {
      id: "TX-9003",
      user: "Emily Johnson",
      type: "Earned",
      points: 500,
      reason: "Referral",
      date: "2025-02-07",
    },
    {
      id: "TX-9004",
      user: "Innovation Team",
      type: "Earned",
      points: 1200,
      reason: "Milestone Achievement",
      date: "2024-12-19",
    },
    {
      id: "TX-9005",
      user: "Sales Rocket Team",
      type: "Redeemed",
      points: 900,
      reason: "Product Discount",
      date: "2024-11-27",
    },
    {
      id: "TX-9006",
      user: "Olivia Nguyen",
      type: "Earned",
      points: 250,
      reason: "Feedback Bonus",
      date: "2024-10-16",
    },
    {
      id: "TX-9007",
      user: "NeoCorp Ltd",
      type: "Redeemed",
      points: 1800,
      reason: "Hardware Purchase",
      date: "2024-09-05",
    },
  ];

  const topRecipients: Recipient[] = [
    {
      id: 1,
      name: "Linda Perez",
      email: "linda@example.com",
      points: 6100,
      tier: "Platinum",
      redemptions: 15,
      type: "Individual",
      lastActive: "2025-04-15",
    },
    {
      id: 2,
      name: "Design Team",
      email: "design@example.com",
      points: 4450,
      tier: "Gold",
      redemptions: 9,
      type: "Team",
      lastActive: "2025-03-30",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@example.com",
      points: 5300,
      tier: "Platinum",
      redemptions: 13,
      type: "Individual",
      lastActive: "2025-02-18",
    },
    {
      id: 4,
      name: "Growth Hackers Inc",
      email: "growth@example.com",
      points: 3900,
      tier: "Gold",
      redemptions: 8,
      type: "Client",
      lastActive: "2025-01-22",
    },
    {
      id: 5,
      name: "Innovation Team",
      email: "innovation@example.com",
      points: 4700,
      tier: "Gold",
      redemptions: 10,
      type: "Team",
      lastActive: "2025-01-04",
    },
  ];

  const campaigns: Campaign[] = [
    {
      id: "C-1001",
      name: "Spring Loyalty Drive",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      pointsSent: 25000,
      pointsRedeemed: 18000,
      status: "Active",
    },
    {
      id: "C-1002",
      name: "New Customer Welcome",
      startDate: "2025-01-15",
      endDate: "2025-12-31",
      pointsSent: 18500,
      pointsRedeemed: 12000,
      status: "Active",
    },
    {
      id: "C-1003",
      name: "Summer Referral Bonus",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      pointsSent: 0,
      pointsRedeemed: 0,
      status: "Upcoming",
    },
    {
      id: "C-1004",
      name: "Holiday Rewards",
      startDate: "2024-11-15",
      endDate: "2025-01-15",
      pointsSent: 32000,
      pointsRedeemed: 28500,
      status: "Completed",
    },
  ];

  // Apply filter to monthly data
  const filteredMonthlyData = filterDataByProgram(monthlyData);

  // Filter transactions based on date range and points filter
  const filteredTransactions = recentTransactions.filter((tx) => {
    if (!dateRange?.from || !dateRange?.to) return true;

    const txDate = parseISO(tx.date);
    const dateMatches = isWithinInterval(txDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });

    if (!dateMatches) return false;

    // Apply points filter
    if (pointsFilter === "redeemed" && tx.type !== "Redeemed") return false;
    if (pointsFilter === "sent" && tx.type !== "Earned") return false;
    if (pointsFilter === "not-redeemed" && tx.type === "Redeemed") return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Points Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPointsSent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Points Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPointsRedeemed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% from previous period
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
              -2.1% from previous period
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
              +3 from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Points Sent vs. Redeemed</CardTitle>
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
                <Bar dataKey="sent" fill="#8884d8" name="Points Sent" />
                <Bar dataKey="redeemed" fill="#82ca9d" name="Points Redeemed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Points Distribution by Event Type</CardTitle>
            <CardDescription>Percentage of points by source</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
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
                  {channelData.map((entry, index) => (
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
          <Select value={pointsFilter} onValueChange={setPointsFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter points" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Points</SelectItem>
              <SelectItem value="redeemed">Points Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Points Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Points Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Who Received Maximum Points?</CardTitle>
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
                <TableHead>Points Balance</TableHead>
                <TableHead>Redemptions</TableHead>
                <TableHead>Tier</TableHead>
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
                  <TableCell>{recipient.points.toLocaleString()}</TableCell>
                  <TableCell>{recipient.redemptions}</TableCell>
                  <TableCell>{recipient.tier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <div className="flex justify-end p-4 border-b">
          <Select value={pointsFilter} onValueChange={setPointsFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter points" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Points</SelectItem>
              <SelectItem value="redeemed">Points Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Points Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Points Sent</SelectItem>
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
                <TableHead>Points Sent</TableHead>
                <TableHead>Points Redeemed</TableHead>
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
                  <TableCell>{campaign.pointsSent.toLocaleString()}</TableCell>
                  <TableCell>
                    {campaign.pointsRedeemed.toLocaleString()}
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
          <Select value={pointsFilter} onValueChange={setPointsFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter points" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Points</SelectItem>
              <SelectItem value="redeemed">Points Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Points Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Points Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Recent Point Transactions</CardTitle>
          <CardDescription>
            Latest point activities across all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tx.type === "Earned" ? "default" : "secondary"}
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={
                      tx.type === "Earned" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {tx.type === "Earned" ? "+" : "-"}
                    {tx.points}
                  </TableCell>
                  <TableCell>{tx.reason}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
