import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const AdminDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDoctorId, setDeleteDoctorId] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const { data } = await supabase
      .from('doctors')
      .select(`
        *,
        profiles:user_id (name, email),
        hospitals (name)
      `)
      .order('created_at', { ascending: false });

    setDoctors(data || []);
    setLoading(false);
  };

  const handleDeleteDoctor = async () => {
    if (!deleteDoctorId) return;

    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', deleteDoctorId);

    if (error) {
      toast.error('Failed to delete doctor');
    } else {
      toast.success('Doctor deleted successfully');
      fetchDoctors();
    }
    setDeleteDoctorId(null);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Doctors</CardTitle>
            <CardDescription>View and manage doctor accounts</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">Dr. {doctor.profiles?.name || 'N/A'}</TableCell>
                    <TableCell>{doctor.profiles?.email}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.hospitals?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doctor.experience} years</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setDeleteDoctorId(doctor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={!!deleteDoctorId} onOpenChange={() => setDeleteDoctorId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the doctor profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDoctor}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDoctors;
