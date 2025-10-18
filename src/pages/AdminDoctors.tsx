import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';

const AdminDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah@example.com', specialty: 'Cardiology', patients: 45, status: 'active' },
    { id: 2, name: 'Dr. Mike Johnson', email: 'mike@example.com', specialty: 'Neurology', patients: 38, status: 'active' },
    { id: 3, name: 'Dr. Emily Brown', email: 'emily@example.com', specialty: 'Pediatrics', patients: 52, status: 'active' },
    { id: 4, name: 'Dr. James Wilson', email: 'james@example.com', specialty: 'Orthopedics', patients: 41, status: 'inactive' },
    { id: 5, name: 'Dr. Lisa Davis', email: 'lisa@example.com', specialty: 'Dermatology', patients: 36, status: 'active' },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manage Doctors</CardTitle>
                <CardDescription>View and manage doctor accounts</CardDescription>
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Doctor
              </Button>
            </div>
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
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>
                      <Badge variant={doctor.status === 'active' ? 'default' : 'secondary'}>
                        {doctor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
    </div>
  );
};

export default AdminDoctors;
