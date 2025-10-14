import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Checkbox } from "../components/ui/checkbox";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CapsuleFormModal } from "../components/CapsuleFormModal";
import { mockCapsules, mockProducts, Capsule, Product } from "../utils/mockData";
import { toast } from "sonner@2.0.3";

export function Capsules() {
  const [capsules, setCapsules] = useState(mockCapsules);
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCapsule, setEditingCapsule] = useState<Capsule | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<string | null>(null);
  const [viewCapsuleOpen, setViewCapsuleOpen] = useState(false);
  const [viewingCapsule, setViewingCapsule] = useState<Capsule | null>(null);

  const filteredCapsules = capsules.filter(capsule =>
    capsule.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCapsule = () => {
    setEditingCapsule(undefined);
    setIsModalOpen(true);
  };

  const handleEditCapsule = (capsule: Capsule) => {
    setEditingCapsule(capsule);
    setIsModalOpen(true);
  };

  const handleSaveCapsule = (capsuleData: Partial<Capsule>) => {
    if (editingCapsule) {
      setCapsules(capsules.map(c => 
        c.id === editingCapsule.id ? { ...c, ...capsuleData } : c
      ));
      toast.success('Capsule updated successfully');
    } else {
      const newCapsule: Capsule = {
        id: `cap${Date.now()}`,
        ...capsuleData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      } as Capsule;
      setCapsules([newCapsule, ...capsules]);
      toast.success('Capsule created successfully');
    }
  };

  const handleDeleteCapsule = () => {
    if (selectedCapsule) {
      setCapsules(capsules.filter(c => c.id !== selectedCapsule));
      toast.success('Capsule deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedCapsule(null);
    }
  };

  const handleDuplicateCapsule = (capsule: Capsule) => {
    const duplicatedCapsule: Capsule = {
      ...capsule,
      id: `cap${Date.now()}`,
      name: `${capsule.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCapsules([duplicatedCapsule, ...capsules]);
    toast.success('Capsule duplicated successfully');
  };

  const handleViewCapsule = (capsule: Capsule) => {
    setViewingCapsule(capsule);
    setViewCapsuleOpen(true);
  };

  const handleToggleFeatured = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
    ));
    toast.success('Featured status updated');
  };

  const getCapsuleProducts = (capsuleId: string) => {
    return products.filter(p => p.capsuleId === capsuleId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[#262930] dark:text-white">Capsules Management</h2>
          <p className="text-sm text-[#404040] dark:text-gray-400 mt-1">
            Manage product collections and capsules
          </p>
        </div>
        <Button onClick={handleAddCapsule} className="bg-[#A00000] hover:bg-[#800000]">
          <Plus className="mr-2 h-4 w-4" />
          Add Capsule
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040] dark:text-gray-400" />
            <Input
              placeholder="Search capsules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Capsules Table */}
      <Card className="border-0 shadow-sm bg-white dark:bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-[#262930] dark:text-white">
            All Capsules ({filteredCapsules.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Capsule</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCapsules.map((capsule) => (
                <TableRow key={capsule.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={capsule.coverImage}
                        alt={capsule.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <p className="text-sm text-[#262930] dark:text-white">{capsule.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#404040] dark:text-gray-400 max-w-xs truncate">
                    {capsule.description}
                  </TableCell>
                  <TableCell className="text-sm text-[#262930] dark:text-white">
                    {getCapsuleProducts(capsule.id).length} products
                  </TableCell>
                  <TableCell className="text-sm text-[#404040] dark:text-gray-400">
                    {capsule.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCapsule(capsule)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Products
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCapsule(capsule)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateCapsule(capsule)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCapsule(capsule.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-[#A00000]"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Capsule Form Modal */}
      <CapsuleFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCapsule}
        capsule={editingCapsule}
      />

      {/* View Capsule Products Dialog */}
      <Dialog open={viewCapsuleOpen} onOpenChange={setViewCapsuleOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#262930] dark:text-white">
              {viewingCapsule?.name} - Products
            </DialogTitle>
            <DialogDescription>
              Manage products and featured items in this capsule
            </DialogDescription>
          </DialogHeader>
          {viewingCapsule && (
            <div className="space-y-4">
              {getCapsuleProducts(viewingCapsule.id).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-[#262930] dark:text-white">{product.name}</p>
                    <p className="text-xs text-[#404040] dark:text-gray-400 mt-1">
                      ${product.price.toFixed(2)} • Stock: {product.stock}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`featured-${product.id}`}
                      checked={product.isFeatured}
                      onCheckedChange={() => handleToggleFeatured(product.id)}
                    />
                    <label
                      htmlFor={`featured-${product.id}`}
                      className="text-sm text-[#404040] dark:text-gray-400 cursor-pointer"
                    >
                      Featured
                    </label>
                  </div>
                </div>
              ))}
              {getCapsuleProducts(viewingCapsule.id).length === 0 && (
                <div className="text-center py-8 text-[#404040] dark:text-gray-400">
                  <p>No products in this capsule yet</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Capsule?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the capsule.
              Products in this capsule will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCapsule}
              className="bg-[#A00000] hover:bg-[#800000]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
