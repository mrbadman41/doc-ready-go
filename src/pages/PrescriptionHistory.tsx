import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, Pill, FileText } from 'lucide-react';
import { useState } from 'react';

const PrescriptionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    {
      id: 1,
      patient: 'John Smith',
      date: '2024-01-15',
      medication: 'Lisinopril 10mg',
      dosage: 'Once daily',
      duration: '30 days',
      status: 'Active',
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      date: '2024-01-14',
      medication: 'Metformin 500mg',
      dosage: 'Twice daily',
      duration: '90 days',
      status: 'Active',
    },
    {
      id: 3,
      patient: 'Michael Brown',
      date: '2024-01-10',
      medication: 'Ibuprofen 400mg',
      dosage: 'As needed',
      duration: '14 days',
      status: 'Completed',
    },
    {
      id: 4,
      patient: 'Emily Davis',
      date: '2024-01-08',
      medication: 'Sumatriptan 50mg',
      dosage: 'As needed',
      duration: '30 days',
      status: 'Active',
    },
    {
      id: 5,
      patient: 'David Wilson',
      date: '2024-01-05',
      medication: 'Naproxen 250mg',
      dosage: 'Twice daily',
      duration: '21 days',
      status: 'Active',
    },
    {
      id: 6,
      patient: 'Lisa Anderson',
      date: '2024-01-03',
      medication: 'Sertraline 25mg',
      dosage: 'Once daily',
      duration: '90 days',
      status: 'Active',
    },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
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

        <div className="grid gap-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {prescription.patient}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {prescription.date}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                    {prescription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Dosage</p>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{prescription.duration}</p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">Refill</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrescriptionHistory;
