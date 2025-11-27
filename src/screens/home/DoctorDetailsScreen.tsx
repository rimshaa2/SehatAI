import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput, // Added TextInput import
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ChevronLeft,
  MoreVertical,
  MapPin,
  Star,
  MessageSquare,
} from "lucide-react-native";
import styles from "./styles/DoctorDetailsStyles";

// Generate next 7 days
const generateDates = () => {
  const dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: days[d.getDay()],
      date: d.getDate(),
      fullDate: d.toISOString().split("T")[0],
    });
  }
  return dates;
};

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export default ({ navigation, route }: any) => {
  const { doctor } = route.params || {};

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // New State for Reason
  const [reason, setReason] = useState("");

  const handleBookAppointment = () => {
    if (!selectedTime) {
      Alert.alert("Select Time", "Please select a time slot to continue.");
      return;
    }

    if (reason.trim().length === 0) {
      Alert.alert(
        "Reason Required",
        "Please enter a brief reason for your appointment."
      );
      return;
    }

    // 👇 Navigate to Payment Screen passing all data
    navigation.navigate("Payment", {
      doctor: doctor,
      date: selectedDate, // or full ISO date string
      time: selectedTime,
      reason: reason,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <ChevronLeft color="#1C2A3A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MoreVertical color="#1C2A3A" size={24} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Doctor Profile */}
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: doctor?.image || "https://via.placeholder.com/150",
              }}
              style={styles.doctorImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.doctorName}>
                {doctor?.name || "Dr. Name"}
              </Text>
              <Text style={styles.specialty}>
                {doctor?.specialty || "Specialist"}
              </Text>

              <View style={styles.ratingContainer}>
                <Star size={12} color="#199A8E" fill="#199A8E" />
                <Text style={styles.ratingText}>{doctor?.rating || 4.5}</Text>
              </View>

              <View style={styles.locationContainer}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.locationText}>800m away</Text>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText} numberOfLines={3}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <Text style={styles.readMore}> Read more</Text>
            </Text>
          </View>

          {/* Date Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateScroll}
          >
            {dates.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedDate === item.date && styles.dateCardActive,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === item.date && styles.textActive,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateNumText,
                    selectedDate === item.date && styles.textActive,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionContainer}>
            <View
              style={{
                height: 1,
                backgroundColor: "#F3F4F6",
                marginBottom: 20,
              }}
            />
          </View>

          {/* Time Selector */}
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.textActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* NEW: Reason Input Field */}
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonLabel}>Reason for Appointment</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="E.g., Severe headache and nausea..."
              placeholderTextColor="#9CA3AF"
              multiline={true}
              numberOfLines={4}
              value={reason}
              onChangeText={setReason}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <MessageSquare size={24} color="#199A8E" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
