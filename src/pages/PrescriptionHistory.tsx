import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, Pill, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const PrescriptionHistory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user?.id) return;

      // Get doctor's ID
      const { data: doctorData } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!doctorData) return;

      // Fetch medical records with prescriptions for this doctor
      const { data, error } = await supabase
        .from('medical_records')
        .select('*, profiles!medical_records_patient_id_fkey(name)')
        .eq('doctor_id', doctorData.id)
        .not('prescription', 'is', null)
        .order('record_date', { ascending: false });

      if (!error && data) {
        setPrescriptions(data);
      }
      setLoading(false);
    };

    fetchPrescriptions();
  }, [user]);

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.profiles?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.prescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Prescription History</h1>
          <p className="text-muted-foreground mt-2">View all prescriptions you've issued</p>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient or medication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>New Prescription</Button>
        </div>

        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Loading prescriptions...</p>
        ) : filteredPrescriptions.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No prescriptions found</p>
        ) : (
          <div className="grid gap-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-lg">Prescription</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {prescription.profiles?.name || 'Unknown'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {prescription.record_date}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Pill className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm font-medium">Prescription</p>
                        <p className="text-sm text-muted-foreground">{prescription.prescription}</p>
                      </div>
                    </div>
                    {prescription.diagnosis && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Diagnosis</p>
                          <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PrescriptionHistory;
