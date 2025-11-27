import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { ChevronLeft, Search, ChevronRight } from "lucide-react-native";
import styles from "./styles/BookAppointmentStyles";

// Dummy Data for Medical Categories
const SPECIALTIES = [
  {
    id: "1",
    title: "Ear, Nose & Throat",
    subtitle: "Wide selection of doctor's specialties",
    // Use require() for local assets or uri for remote
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2865/2865917.png" }, // Ear Icon
    color: "#E8F1FF", // Light Blue bg for icon
  },
  {
    id: "2",
    title: "Mental wellness",
    subtitle: "Wide selection of doctor's specialties",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png" }, // Brain Icon
    color: "#F2E7FE", // Light Purple
  },
  {
    id: "3",
    title: "Dental",
    subtitle: "Wide selection of doctor's specialties",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png" }, // Tooth Icon
    color: "#E8F1FF",
  },
  {
    id: "4",
    title: "Bones",
    subtitle: "Wide selection of doctor's specialties",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2966/2966378.png" }, // Bone Icon
    color: "#FEFCE4", // Light Yellow
  },
];

export default ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <ChevronLeft color="#1C2A3A" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book an Appointment</Text>
          <View style={{ width: 24 }} /> 
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Medical Problems</Text>
          <Text style={styles.sectionSubtitle}>
            Wide selection of doctor's specialties
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#A1A8B0" size={20} style={styles.searchIcon} />
          <TextInput 
            placeholder="symptoms, diseases..." 
            placeholderTextColor="#A1A8B0"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
             <View style={styles.filterLine1} />
             <View style={styles.filterLine2} />
             <View style={styles.filterLine3} />
          </TouchableOpacity>
        </View>

        {/* Specialties List */}
        <View style={styles.listContainer}>
          {SPECIALTIES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => navigation.navigate("DoctorList", { specialty: item.title })}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Image source={item.icon} style={styles.icon} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight color="#199A8E" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* See More Link */}
        <TouchableOpacity style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreText}>See More</Text>
          <ChevronRight color="#1C69FF" size={16} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};