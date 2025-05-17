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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface LinkData {
  id: string;
  name: string;
  generatedBy: string;
  claimedBy: string | null;
  status: "Claimed" | "Pending" | "Expired";
  points: number;
  generatedDate: string;
  claimedDate: string | null;
}

interface MonthlyData {
  name: string;
  generated: number;
  claimed: number;
}

interface StatusData {
  name: string;
  value: number;
}

interface Recipient {
  id: number;
  name: string;
  email: string;
  links: number;
  type: string;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  linksGenerated: number;
  linksClaimed: number;
  status: "Active" | "Completed" | "Upcoming";
}

interface LinksReportProps {
  dateRange: DateRange;
  program: string;
}

export default function LinksReport({ dateRange, program }: LinksReportProps) {
  const [linkFilter, setLinkFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const totalLinksGenerated = 3750;
  const totalLinksClaimed = 2180;
  const claimRate = Math.round((totalLinksClaimed / totalLinksGenerated) * 100);
  const totalCampaigns = 15;

  const monthlyData: MonthlyData[] = [
    { name: "Jan", generated: 380, claimed: 220 },
    { name: "Feb", generated: 420, claimed: 250 },
    { name: "Mar", generated: 460, claimed: 280 },
    { name: "Apr", generated: 440, claimed: 260 },
    { name: "May", generated: 490, claimed: 300 },
    { name: "Jun", generated: 520, claimed: 330 },
    { name: "Jul", generated: 550, claimed: 340 },
    { name: "Aug", generated: 490, claimed: 300 },
  ];

  const statusData: StatusData[] = [
    { name: "Claimed", value: 58 },
    { name: "Pending", value: 32 },
    { name: "Expired", value: 10 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  const recentLinks: LinkData[] = [
    {
      id: "LINK-7001",
      name: "Spring Referral Bonus",
      generatedBy: "Linda Perez",
      claimedBy: "John Smith",
      status: "Claimed",
      points: 500,
      generatedDate: "2025-04-05",
      claimedDate: "2025-04-08",
    },
    {
      id: "LINK-7002",
      name: "Team Achievement Reward",
      generatedBy: "Raj Patel",
      claimedBy: "Design Team",
      status: "Claimed",
      points: 1000,
      generatedDate: "2025-03-18",
      claimedDate: "2025-03-20",
    },
    {
      id: "LINK-7003",
      name: "Customer Loyalty Bonus",
      generatedBy: "Emily Johnson",
      claimedBy: "Sarah Williams",
      status: "Claimed",
      points: 750,
      generatedDate: "2025-02-10",
      claimedDate: "2025-02-15",
    },
    {
      id: "LINK-7004",
      name: "Product Launch Incentive",
      generatedBy: "Innovation Team",
      claimedBy: null,
      status: "Pending",
      points: 1200,
      generatedDate: "2025-01-25",
      claimedDate: null,
    },
    {
      id: "LINK-7005",
      name: "Quarterly Performance Bonus",
      generatedBy: "Sales Rocket Team",
      claimedBy: "Marketing Team",
      status: "Claimed",
      points: 900,
      generatedDate: "2024-12-10",
      claimedDate: "2024-12-12",
    },
    {
      id: "LINK-7006",
      name: "Feedback Survey Reward",
      generatedBy: "Olivia Nguyen",
      claimedBy: null,
      status: "Expired",
      points: 250,
      generatedDate: "2024-11-05",
      claimedDate: null,
    },
    {
      id: "LINK-7007",
      name: "Partner Referral Bonus",
      generatedBy: "NeoCorp Ltd",
      claimedBy: "TechSolutions Inc",
      status: "Claimed",
      points: 1500,
      generatedDate: "2024-10-20",
      claimedDate: "2024-10-22",
    },
    {
      id: "LINK-7008",
      name: "New User Welcome Bonus",
      generatedBy: "Michael Chen",
      claimedBy: "Jessica Taylor",
      status: "Claimed",
      points: 300,
      generatedDate: "2024-09-15",
      claimedDate: "2024-09-16",
    },
    {
      id: "LINK-7009",
      name: "Holiday Special Reward",
      generatedBy: "HR Department",
      claimedBy: null,
      status: "Pending",
      points: 800,
      generatedDate: "2024-08-30",
      claimedDate: null,
    },
  ];

  const topRecipients: Recipient[] = [
    {
      id: 1,
      name: "Linda Perez",
      email: "linda@example.com",
      links: 18,
      type: "Individual",
    },
    {
      id: 2,
      name: "Design Team",
      email: "design@example.com",
      links: 15,
      type: "Team",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@example.com",
      links: 16,
      type: "Individual",
    },
    {
      id: 4,
      name: "Growth Hackers Inc",
      email: "growth@example.com",
      links: 12,
      type: "Client",
    },
    {
      id: 5,
      name: "Innovation Team",
      email: "innovation@example.com",
      links: 14,
      type: "Team",
    },
  ];

  const campaigns: Campaign[] = [
    {
      id: "C-3001",
      name: "Spring Referral Program",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      linksGenerated: 650,
      linksClaimed: 420,
      status: "Active",
    },
    {
      id: "C-3002",
      name: "New Customer Welcome",
      startDate: "2025-01-15",
      endDate: "2025-12-31",
      linksGenerated: 520,
      linksClaimed: 310,
      status: "Active",
    },
    {
      id: "C-3003",
      name: "Summer Referral Bonus",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      linksGenerated: 0,
      linksClaimed: 0,
      status: "Upcoming",
    },
    {
      id: "C-3004",
      name: "Holiday Rewards",
      startDate: "2024-11-15",
      endDate: "2025-01-15",
      linksGenerated: 980,
      linksClaimed: 780,
      status: "Completed",
    },
  ];

  // Filter data based on program with proper typing
  const filterDataByProgram = (data: MonthlyData[]): MonthlyData[] => {
    if (program === "all") return data;

    return data.map((item) => ({
      ...item,
      generated:
        program === "internal"
          ? item.generated * 0.4
          : program === "external"
          ? item.generated * 0.3
          : program === "channel"
          ? item.generated * 0.1
          : program === "dealers"
          ? item.generated * 0.1
          : program === "realestate"
          ? item.generated * 0.05
          : item.generated * 0.05,
      claimed:
        program === "internal"
          ? item.claimed * 0.4
          : program === "external"
          ? item.claimed * 0.3
          : program === "channel"
          ? item.claimed * 0.1
          : program === "dealers"
          ? item.claimed * 0.1
          : program === "realestate"
          ? item.claimed * 0.05
          : item.claimed * 0.05,
    }));
  };

  // Apply filter to monthly data
  const filteredMonthlyData = filterDataByProgram(monthlyData);

  // Filter links based on date range and link filter
  const filteredLinks = recentLinks.filter((link) => {
    if (!dateRange?.from || !dateRange?.to) return true;

    const linkDate = parseISO(link.generatedDate);
    const dateMatches = isWithinInterval(linkDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });

    if (!dateMatches) return false;

    // Apply link filter
    if (linkFilter === "redeemed" && link.status !== "Claimed") return false;
    if (linkFilter === "sent" && link.status !== "Pending") return false;
    if (linkFilter === "not-redeemed" && link.status === "Claimed")
      return false;

    return true;
  });

  // Calculate average claim time
  // const calculateAvgClaimTime = () => {
  //   const claimedLinks = recentLinks.filter(
  //     (link) => link.status === "Claimed" && link.claimedDate
  //   );

  //   if (claimedLinks.length === 0) return 0;

  //   const totalDays = claimedLinks.reduce((total, link) => {
  //     const generatedDate = new Date(link.generatedDate);
  //     const claimedDate = new Date(link.claimedDate!);
  //     const diffTime = Math.abs(
  //       claimedDate.getTime() - generatedDate.getTime()
  //     );
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     return total + diffDays;
  //   }, 0);

  //   return (totalDays / claimedLinks.length).toFixed(1);
  // };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Links Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLinksGenerated.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Links Claimed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLinksClaimed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claim Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{claimRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from previous period
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
            <CardTitle>Links Generated vs. Claimed</CardTitle>
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
                <Bar
                  dataKey="generated"
                  fill="#8884d8"
                  name="Links Generated"
                />
                <Bar dataKey="claimed" fill="#82ca9d" name="Links Claimed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Link Status Distribution</CardTitle>
            <CardDescription>Percentage of links by status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
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
                  {statusData.map((entry, index) => (
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
          <Select value={linkFilter} onValueChange={setLinkFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter links" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Links</SelectItem>
              <SelectItem value="redeemed">Links Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Links Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Links Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Who Generated Maximum Links?</CardTitle>
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
                <TableHead>Total Links</TableHead>
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
                  <TableCell>{recipient.links}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <div className="flex justify-end p-4 border-b">
          <Select value={linkFilter} onValueChange={setLinkFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter links" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Links</SelectItem>
              <SelectItem value="redeemed">Links Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Links Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Links Sent</SelectItem>
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
                <TableHead>Links Generated</TableHead>
                <TableHead>Links Claimed</TableHead>
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
                  <TableCell>
                    {campaign.linksGenerated.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {campaign.linksClaimed.toLocaleString()}
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
          <Select value={linkFilter} onValueChange={setLinkFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter links" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Links</SelectItem>
              <SelectItem value="redeemed">Links Redeemed</SelectItem>
              <SelectItem value="not-redeemed">
                Links Yet to be Redeemed
              </SelectItem>
              <SelectItem value="sent">Links Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Reward Links</CardTitle>
          <CardDescription>
            Links generated for rewards from{" "}
            {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
            {dateRange?.to?.toLocaleDateString() ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead>Claimed By</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Claimed Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.id}</TableCell>
                  <TableCell>{link.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`/placeholder.svg?height=24&width=24`}
                          alt={link.generatedBy}
                        />
                        <AvatarFallback>
                          {link.generatedBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{link.generatedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {link.claimedBy ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`/placeholder.svg?height=24&width=24`}
                            alt={link.claimedBy}
                          />
                          <AvatarFallback>
                            {link.claimedBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{link.claimedBy}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not claimed</span>
                    )}
                  </TableCell>
                  <TableCell>{link.points.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        link.status === "Claimed"
                          ? "default"
                          : link.status === "Pending"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{link.generatedDate}</TableCell>
                  <TableCell>
                    {link.claimedDate || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
