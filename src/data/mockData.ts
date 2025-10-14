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
    name: "University Teaching Hospital (UTH)",
    address: "Nationalist Road, Ridgeway, Lusaka",
    distance: "3.2 km",
    rating: 4.8,
    phone: "+260 211 256 067",
    totalBeds: 250,
    availableBeds: 45,
    emergencyServices: true,
    doctors: [
      {
        id: "d1",
        name: "Dr. Mwansa Kunda",
        specialty: "Cardiology",
        availability: "available",
        rating: 4.9,
        experience: 12
      },
      {
        id: "d2",
        name: "Dr. James Phiri",
        specialty: "Neurology",
        availability: "available",
        rating: 4.7,
        experience: 8
      },
      {
        id: "d3",
        name: "Dr. Sarah Banda",
        specialty: "Orthopedics",
        availability: "busy",
        nextSlot: "2:30 PM",
        rating: 4.8,
        experience: 15
      },
      {
        id: "d4",
        name: "Dr. Peter Mulenga",
        specialty: "Emergency Medicine",
        availability: "available",
        rating: 4.6,
        experience: 20
      }
    ]
  },
  {
    id: "2",
    name: "Levy Mwanawasa University Teaching Hospital",
    address: "Levy Junction, Great East Road, Lusaka",
    distance: "8.5 km",
    rating: 4.6,
    phone: "+260 211 372 000",
    totalBeds: 180,
    availableBeds: 23,
    emergencyServices: true,
    doctors: [
      {
        id: "d5",
        name: "Dr. Grace Tembo",
        specialty: "Pediatrics",
        availability: "available",
        rating: 4.8,
        experience: 10
      },
      {
        id: "d6",
        name: "Dr. Moses Zulu",
        specialty: "Gynecology",
        availability: "offline",
        rating: 4.9,
        experience: 25
      },
      {
        id: "d7",
        name: "Dr. Ruth Sikota",
        specialty: "Dermatology",
        availability: "busy",
        nextSlot: "4:15 PM",
        rating: 4.7,
        experience: 14
      },
      {
        id: "d8",
        name: "Dr. John Kabwe",
        specialty: "Internal Medicine",
        availability: "available",
        rating: 4.5,
        experience: 11
      }
    ]
  },
  {
    id: "3",
    name: "Cancer Diseases Hospital",
    address: "Nationalist Road, Lusaka",
    distance: "4.1 km",
    rating: 4.7,
    phone: "+260 211 253 635",
    totalBeds: 320,
    availableBeds: 67,
    emergencyServices: true,
    doctors: [
      {
        id: "d9",
        name: "Dr. Chanda Mwale",
        specialty: "Oncology",
        availability: "available",
        rating: 4.9,
        experience: 18
      },
      {
        id: "d10",
        name: "Dr. Alice Mwamba",
        specialty: "Radiology",
        availability: "available",
        rating: 4.6,
        experience: 9
      },
      {
        id: "d11",
        name: "Dr. Patrick Musonda",
        specialty: "Internal Medicine",
        availability: "busy",
        nextSlot: "Tomorrow 9:00 AM",
        rating: 4.8,
        experience: 16
      }
    ]
  },
  {
    id: "4",
    name: "Lusaka Trust Hospital",
    address: "Chilimbulu Road, Lusaka",
    distance: "5.3 km",
    rating: 4.5,
    phone: "+260 211 291 333",
    totalBeds: 50,
    availableBeds: 12,
    emergencyServices: true,
    doctors: [
      {
        id: "d12",
        name: "Dr. Miriam Chilufya",
        specialty: "Family Medicine",
        availability: "available",
        rating: 4.5,
        experience: 7
      },
      {
        id: "d13",
        name: "Dr. George Lungu",
        specialty: "Internal Medicine",
        availability: "available",
        rating: 4.6,
        experience: 11
      }
    ]
  },
  {
    id: "5",
    name: "Coptic Hospital",
    address: "Chifundo Road, Lusaka",
    distance: "6.8 km",
    rating: 4.4,
    phone: "+260 211 278 882",
    totalBeds: 80,
    availableBeds: 18,
    emergencyServices: true,
    doctors: [
      {
        id: "d14",
        name: "Dr. Emmanuel Haangala",
        specialty: "Surgery",
        availability: "available",
        rating: 4.7,
        experience: 15
      },
      {
        id: "d15",
        name: "Dr. Catherine Mbewe",
        specialty: "Pediatrics",
        availability: "busy",
        nextSlot: "3:00 PM",
        rating: 4.5,
        experience: 9
      }
    ]
  }
];

export const mockSpecialties = [
  "Cardiology", "Dermatology", "Emergency Medicine", "Family Medicine",
  "Internal Medicine", "Neurology", "Orthopedics", "Pediatrics", 
  "Gynecology", "Radiology", "Surgery", "Oncology"
];