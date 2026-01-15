import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft, Star, MapPin, Calendar, PenTool } from "lucide-react-native";

// Firebase imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

import styles from "./styles/PaymentScreenStyles";

export default ({ navigation, route }: any) => {
  // 1. Get Data from Navigation Params
  const { doctor, date, time, reason } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);

  // Payment Calculations
  const consultationFee = 2500;
  const adminFee = 500;
  const total = consultationFee + adminFee;

  const handleConfirmBooking = async () => {
    setIsLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "You must be logged in to book an appointment.");
        setIsLoading(false);
        return;
      }

      // Prepare Appointment Data
      const appointmentData = {
        userId: user.uid,
        userEmail: user.email,
        doctorId: doctor?.id,
        doctorName: doctor?.name,
        doctorSpecialty: doctor?.specialty,
        doctorImage: doctor?.image,
        date: date,
        time: time,
        reason: reason || "General Consultation",
        totalAmount: total,
        status: "upcoming",
        createdAt: serverTimestamp(),
      };

      // Save to Firestore
      await addDoc(collection(db, "appointments"), appointmentData);

      // Navigate to success screen
      navigation.replace("BookingSuccess", {
        doctor,
        date,
        time,
      });

    } catch (error) {
      console.error("Booking Error:", error);
      Alert.alert("Booking Failed", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1C2A3A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image 
            source={{ uri: doctor?.image || 'https://via.placeholder.com/150' }} 
            style={styles.doctorImage} 
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor?.name || "Doctor Name"}</Text>
            <Text style={styles.specialty}>{doctor?.specialty || "Specialist"}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={12} color="#199A8E" fill="#199A8E" />
              <Text style={styles.ratingText}>{doctor?.rating || 4.5}</Text>
            </View>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#6B7280" />
              <Text style={styles.locationText}>800m away</Text>
            </View>
          </View>
        </View>

        {/* Date & Reason Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Calendar size={20} color="#199A8E" />
          </View>
          <Text style={styles.infoText}>{date} | {time}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reason</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <PenTool size={20} color="#199A8E" />
          </View>
          <Text style={styles.infoText} numberOfLines={2}>
            {reason || "General Consultation"}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Payment Details */}
        <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Payment Detail</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Consultation</Text>
          <Text style={styles.paymentValue}>Rs. {consultationFee}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Admin Fee</Text>
          <Text style={styles.paymentValue}>Rs. {adminFee}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Additional Discount</Text>
          <Text style={styles.paymentValue}>-</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rs. {total}</Text>
        </View>

        <View style={styles.divider} />

        {/* Payment Method */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Payment Method</Text>
        <View style={styles.methodCard}>
          <Text style={styles.visaText}>VISA</Text>
          <TouchableOpacity>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalPrice}>Rs. {total}</Text>
        </View>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmBooking}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
