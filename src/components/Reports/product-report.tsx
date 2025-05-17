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

interface Product {
  id: string;
  name: string;
  pointsEarned: number;
  pointsRedeemed: number;
  category: string;
  recipientType: string;
}

interface CategoryData {
  name: string;
  earned: number;
  redeemed: number;
}

interface Redemption {
  id: string;
  product: string;
  points: number;
  user: string;
  date: string;
}

interface ProductReportsProps {
  dateRange: DateRange;
  program: string;
}

export default function ProductReports({
  dateRange,
  program,
}: ProductReportsProps) {
  const [recipientTypeFilter, setRecipientTypeFilter] = useState("all");
  const [rewardTypeFilter, setRewardTypeFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const topProducts: Product[] = [
    {
      id: "P-1001",
      name: "Premium Headphones",
      pointsEarned: 16500,
      pointsRedeemed: 12000,
      category: "Electronics",
      recipientType: "Internal Employees",
    },
    {
      id: "P-1002",
      name: "Fitness Tracker",
      pointsEarned: 13900,
      pointsRedeemed: 9800,
      category: "Wearables",
      recipientType: "External Clients",
    },
    {
      id: "P-1003",
      name: "Wireless Earbuds",
      pointsEarned: 11700,
      pointsRedeemed: 8500,
      category: "Electronics",
      recipientType: "Channel Partner",
    },
    {
      id: "P-1004",
      name: "Smart Water Bottle",
      pointsEarned: 9700,
      pointsRedeemed: 7200,
      category: "Fitness",
      recipientType: "Internal Employees",
    },
    {
      id: "P-1005",
      name: "Yoga Mat",
      pointsEarned: 8800,
      pointsRedeemed: 6700,
      category: "Fitness",
      recipientType: "Auto Dealers",
    },
    {
      id: "P-1006",
      name: "Standing Desk Converter",
      pointsEarned: 10200,
      pointsRedeemed: 7100,
      category: "Office",
      recipientType: "Real Estate",
    },
    {
      id: "P-1007",
      name: "Smartphone Gimbal",
      pointsEarned: 7800,
      pointsRedeemed: 5400,
      category: "Photography",
      recipientType: "External Clients",
    },
  ];

  const categoryData: CategoryData[] = [
    { name: "Electronics", earned: 35000, redeemed: 22000 },
    { name: "Wearables", earned: 25000, redeemed: 16000 },
    { name: "Fitness", earned: 20000, redeemed: 12000 },
    { name: "Home", earned: 15000, redeemed: 9000 },
    { name: "Apparel", earned: 12000, redeemed: 7000 },
  ];

  const recentRedemptions: Redemption[] = [
    {
      id: "R-6001",
      product: "Fitness Tracker",
      points: 2200,
      user: "Linda Perez",
      date: "2025-04-10",
    },
    {
      id: "R-6002",
      product: "Yoga Mat",
      points: 700,
      user: "Raj Patel",
      date: "2025-03-22",
    },
    {
      id: "R-6003",
      product: "Premium Headphones",
      points: 2700,
      user: "Emily Johnson",
      date: "2025-02-05",
    },
    {
      id: "R-6004",
      product: "Standing Desk Converter",
      points: 3100,
      user: "Innovation Team",
      date: "2024-12-18",
    },
    {
      id: "R-6005",
      product: "Smart Water Bottle",
      points: 900,
      user: "Sales Rocket Team",
      date: "2024-11-27",
    },
    {
      id: "R-6006",
      product: "Wireless Earbuds",
      points: 1600,
      user: "Olivia Nguyen",
      date: "2024-10-14",
    },
    {
      id: "R-6007",
      product: "Smartphone Gimbal",
      points: 1800,
      user: "NeoCorp Ltd",
      date: "2024-09-05",
    },
  ];

  const recipientTypes = [
    { value: "all", label: "All Recipient Types" },
    { value: "internal", label: "Internal Employees" },
    { value: "external", label: "External Clients" },
    { value: "channel", label: "Channel Partner" },
    { value: "dealers", label: "Auto Dealers" },
    { value: "realestate", label: "Real Estate" },
  ];

  const rewardTypes = [
    { value: "all", label: "All Reward Types" },
    { value: "points", label: "Points" },
    { value: "codes", label: "Codes" },
    { value: "links", label: "Links" },
  ];

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Filter data based on program with proper typing
  const filterDataByProgram = (data: Product[]): Product[] => {
    if (program === "all") return data;

    return data.filter((product) => {
      if (
        program === "internal" &&
        product.recipientType === "Internal Employees"
      )
        return true;
      if (
        program === "external" &&
        product.recipientType === "External Clients"
      )
        return true;
      if (program === "channel" && product.recipientType === "Channel Partner")
        return true;
      if (program === "dealers" && product.recipientType === "Auto Dealers")
        return true;
      if (program === "realestate" && product.recipientType === "Real Estate")
        return true;
      return false;
    });
  };

  // Filter redemptions based on date range
  const filteredRedemptions = recentRedemptions.filter((redemption) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const redemptionDate = parseISO(redemption.date);
    return isWithinInterval(redemptionDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });
  });

  // Apply filter to product data
  let filteredTopProducts = filterDataByProgram(topProducts);

  // Apply recipient type filter
  if (recipientTypeFilter !== "all") {
    filteredTopProducts = filteredTopProducts.filter((product) => {
      if (
        recipientTypeFilter === "internal" &&
        product.recipientType === "Internal Employees"
      )
        return true;
      if (
        recipientTypeFilter === "external" &&
        product.recipientType === "External Clients"
      )
        return true;
      if (
        recipientTypeFilter === "channel" &&
        product.recipientType === "Channel Partner"
      )
        return true;
      if (
        recipientTypeFilter === "dealers" &&
        product.recipientType === "Auto Dealers"
      )
        return true;
      if (
        recipientTypeFilter === "realestate" &&
        product.recipientType === "Real Estate"
      )
        return true;
      return false;
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              +5 from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>
            Points earned and redeemed by product category
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earned" fill="#8884d8" name="Points Earned" />
              <Bar dataKey="redeemed" fill="#82ca9d" name="Points Redeemed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <div className="flex flex-wrap gap-4 justify-end p-4 border-b">
          <Select
            value={recipientTypeFilter}
            onValueChange={setRecipientTypeFilter}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter by recipient type" />
            </SelectTrigger>
            <SelectContent>
              {recipientTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={rewardTypeFilter} onValueChange={setRewardTypeFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter by reward type" />
            </SelectTrigger>
            <SelectContent>
              {rewardTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>
            Products with the highest point activity by recipient type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Recipient Type</TableHead>
                <TableHead>Points Earned</TableHead>
                <TableHead>Points Redeemed</TableHead>
                <TableHead>Redemption Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopProducts.map((product) => {
                const redemptionRate = Math.round(
                  (product.pointsRedeemed / product.pointsEarned) * 100
                );
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.recipientType}</Badge>
                    </TableCell>
                    <TableCell>
                      {product.pointsEarned.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {product.pointsRedeemed.toLocaleString()}
                    </TableCell>
                    <TableCell>{redemptionRate}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Product Redemptions</CardTitle>
          <CardDescription>
            Latest product redemptions from{" "}
            {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
            {dateRange?.to?.toLocaleDateString() ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Redemption ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRedemptions.map((redemption) => (
                <TableRow key={redemption.id}>
                  <TableCell className="font-medium">{redemption.id}</TableCell>
                  <TableCell>{redemption.product}</TableCell>
                  <TableCell>{redemption.points.toLocaleString()}</TableCell>
                  <TableCell>{redemption.user}</TableCell>
                  <TableCell>{redemption.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
