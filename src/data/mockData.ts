export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: "available" | "busy" | "offline";
  nextSlot?: string;
  rating: number;
  experience: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  distance: string;
  rating: number;
  phone: string;
  doctors: Doctor[];
  image?: string;
  totalBeds: number;
  availableBeds: number;
  emergencyServices: boolean;
}

export const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "City Medical Center",
    address: "123 Main Street, Downtown",
    zipCode: "10101",
    distance: "0.8 km",
    rating: 4.8,
    phone: "+1 (555) 123-4567",
    totalBeds: 250,
    availableBeds: 45,
    emergencyServices: true,
    doctors: [
      {
        id: "d1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        availability: "available",
        rating: 4.9,
        experience: 12
      },
      {
        id: "d2",
        name: "Dr. Michael Chen",
        specialty: "Emergency Medicine",
        availability: "available",
        rating: 4.7,
        experience: 8
      },
      {
        id: "d3",
        name: "Dr. Emily Rodriguez",
        specialty: "Family Medicine",
        availability: "busy",
        nextSlot: "2:30 PM",
        rating: 4.8,
        experience: 15
      },
      {
        id: "d4",
        name: "Dr. James Wilson",
        specialty: "Orthopedics",
        availability: "available",
        rating: 4.6,
        experience: 20
      }
    ]
  },
  {
    id: "2",
    name: "General Hospital",
    address: "456 Oak Avenue, Midtown",
    zipCode: "10102",
    distance: "1.2 km",
    rating: 4.6,
    phone: "+1 (555) 234-5678",
    totalBeds: 180,
    availableBeds: 23,
    emergencyServices: true,
    doctors: [
      {
        id: "d5",
        name: "Dr. Lisa Thompson",
        specialty: "Internal Medicine",
        availability: "available",
        rating: 4.8,
        experience: 10
      },
      {
        id: "d6",
        name: "Dr. Robert Davis",
        specialty: "Surgery",
        availability: "offline",
        rating: 4.9,
        experience: 25
      },
      {
        id: "d7",
        name: "Dr. Maria Garcia",
        specialty: "Pediatrics",
        availability: "busy",
        nextSlot: "4:15 PM",
        rating: 4.7,
        experience: 14
      }
    ]
  },
  {
    id: "3",
    name: "St. Mary's Hospital",
    address: "789 Pine Street, Northside",
    zipCode: "10103",
    distance: "2.1 km",
    rating: 4.7,
    phone: "+1 (555) 345-6789",
    totalBeds: 320,
    availableBeds: 67,
    emergencyServices: true,
    doctors: [
      {
        id: "d8",
        name: "Dr. David Kim",
        specialty: "Neurology",
        availability: "available",
        rating: 4.9,
        experience: 18
      },
      {
        id: "d9",
        name: "Dr. Jennifer Lee",
        specialty: "Dermatology",
        availability: "available",
        rating: 4.6,
        experience: 9
      },
      {
        id: "d10",
        name: "Dr. Thomas Brown",
        specialty: "Psychiatry",
        availability: "busy",
        nextSlot: "Tomorrow 9:00 AM",
        rating: 4.8,
        experience: 16
      }
    ]
  },
  {
    id: "4",
    name: "Community Health Clinic",
    address: "321 Elm Street, Southside",
    zipCode: "10104",
    distance: "3.5 km",
    rating: 4.4,
    phone: "+1 (555) 456-7890",
    totalBeds: 50,
    availableBeds: 12,
    emergencyServices: false,
    doctors: [
      {
        id: "d11",
        name: "Dr. Amanda White",
        specialty: "Family Medicine",
        availability: "available",
        rating: 4.5,
        experience: 7
      },
      {
        id: "d12",
        name: "Dr. Mark Johnson",
        specialty: "Internal Medicine",
        availability: "available",
        rating: 4.6,
        experience: 11
      }
    ]
  }
];

export const mockSpecialties = [
  "Cardiology", "Dermatology", "Emergency Medicine", "Family Medicine",
  "Internal Medicine", "Neurology", "Orthopedics", "Pediatrics", 
  "Psychiatry", "Radiology", "Surgery", "Urology"
];