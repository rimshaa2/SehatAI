export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  PhoneNumber: undefined;
  Otp: {
    verificationId: string;   // ✅ Firebase Web SDK compatible
    phoneNumber?: string;     // optional but useful
  };
  Register: undefined;
  Home:undefined;
  BookAppointment:undefined;
  DoctorList: undefined;
  DoctorDetails:undefined;
  Payment:undefined;
  Profile:undefined;
  EditProfile:undefined;
  BookingSuccess:undefined;
  AiAssistant: undefined;
  AppointmentDetails:undefined;
  RescheduleAppointment:undefined;
  MedicalRecords: undefined;
}
