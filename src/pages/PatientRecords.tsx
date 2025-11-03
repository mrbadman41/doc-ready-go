import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const PatientRecords = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!user?.id) return;

      // Get doctor's ID
      const { data: doctorData } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!doctorData) return;

      // Fetch medical records for this doctor
      const { data, error } = await supabase
        .from('medical_records')
        .select('*, profiles!medical_records_patient_id_fkey(name)')
        .eq('doctor_id', doctorData.id)
        .order('record_date', { ascending: false });

      if (!error && data) {
        setRecords(data);
      }
      setLoading(false);
    };

    fetchRecords();
  }, [user]);

  const filteredRecords = records.filter(record =>
    record.profiles?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
          <p className="text-muted-foreground mt-2">View and manage patient information</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Patients</CardTitle>
                <CardDescription>Complete list of your patients</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Add Patient</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Loading records...</p>
            ) : filteredRecords.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No patient records found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Record Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {record.profiles?.name || 'Unknown'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {record.record_date}
                        </div>
                      </TableCell>
                      <TableCell>{record.diagnosis || 'N/A'}</TableCell>
                      <TableCell>{record.prescription || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4 mr-2" />
                          View Record
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PatientRecords;
