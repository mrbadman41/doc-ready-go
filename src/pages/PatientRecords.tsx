import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { useState } from 'react';

const PatientRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    { id: 1, name: 'John Smith', age: 45, lastVisit: '2024-01-15', condition: 'Hypertension', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', age: 32, lastVisit: '2024-01-14', condition: 'Diabetes', status: 'Active' },
    { id: 3, name: 'Michael Brown', age: 56, lastVisit: '2024-01-10', condition: 'Arthritis', status: 'Follow-up' },
    { id: 4, name: 'Emily Davis', age: 28, lastVisit: '2024-01-08', condition: 'Migraine', status: 'Active' },
    { id: 5, name: 'David Wilson', age: 41, lastVisit: '2024-01-05', condition: 'Back Pain', status: 'Recovery' },
    { id: 6, name: 'Lisa Anderson', age: 38, lastVisit: '2024-01-03', condition: 'Anxiety', status: 'Active' },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {patient.name}
                      </div>
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {patient.lastVisit}
                      </div>
                    </TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                        {patient.status}
                      </Badge>
                    </TableCell>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PatientRecords;
