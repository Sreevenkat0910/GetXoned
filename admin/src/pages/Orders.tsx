import { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { OrderDetailsDrawer } from "../components/OrderDetailsDrawer";
import { mockOrders, Order } from "../utils/mockData";
import { toast } from "sonner@2.0.3";

export function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: Order['status']) => {
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
        <h2 className="text-[#262930] dark:text-white">Orders Management</h2>
        <p className="text-sm text-[#404040] dark:text-gray-400 mt-1">
          Track and manage customer orders
        </p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040] dark:text-gray-400" />
              <Input
                placeholder="Search by order ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-[#262930] dark:text-white">
            All Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
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
                    <div className="text-sm">
                      <p className="text-[#262930] dark:text-white">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-[#404040] dark:text-gray-400 truncate max-w-[200px]">
                        {order.items[0].productName}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#262930] dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-[#404040] dark:text-gray-400">
                    {order.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
