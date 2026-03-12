export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
}

export interface Appointment {
  id: number;
  patient_id: number;
  patient_name?: string;
  patient_email?: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}
