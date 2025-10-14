import { Package, Layers, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard } from "../components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockStats, mockOrdersOverTime, mockSalesByCapsule, mockOrders } from "../utils/mockData";

export function Dashboard() {
  const recentOrders = mockOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'pending':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'cancelled':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[#262930] dark:text-white">Dashboard Overview</h2>
        <p className="text-sm text-[#404040] dark:text-gray-400 mt-1">
          Monitor your store performance and recent activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={mockStats.totalProducts}
          icon={Package}
          iconColor="#A00000"
        />
        <StatsCard
          title="Total Capsules"
          value={mockStats.totalCapsules}
          icon={Layers}
          iconColor="#CC5500"
        />
        <StatsCard
          title="Total Orders"
          value={mockStats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: mockStats.ordersGrowth, label: "from last month" }}
          iconColor="#404040"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: mockStats.revenueGrowth, label: "from last month" }}
          iconColor="#262930"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Over Time */}
        <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#262930] dark:text-white">
              <TrendingUp className="w-5 h-5 text-[#A00000]" />
              Orders Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockOrdersOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE7E2" />
                <XAxis dataKey="month" stroke="#404040" />
                <YAxis stroke="#404040" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #EAE7E2',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#A00000" 
                  strokeWidth={2}
                  name="Orders"
                  dot={{ fill: '#A00000', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#CC5500" 
                  strokeWidth={2}
                  name="Revenue ($)"
                  dot={{ fill: '#CC5500', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Capsule */}
        <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-[#262930] dark:text-white">Sales by Capsule</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesByCapsule}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE7E2" />
                <XAxis dataKey="name" stroke="#404040" />
                <YAxis stroke="#404040" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #EAE7E2',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#A00000" name="Revenue ($)" />
                <Bar dataKey="orders" fill="#CC5500" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-[#262930] dark:text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-[#262930] dark:text-white">
                    {order.orderId}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-[#262930] dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-[#404040] dark:text-gray-400">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-[#404040] dark:text-gray-400">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </TableCell>
                  <TableCell className="text-[#262930] dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm text-[#404040] dark:text-gray-400">
                    {order.createdAt}
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
