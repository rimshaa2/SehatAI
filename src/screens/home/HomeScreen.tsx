import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore";
import { 
  Search, 
  Bell, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Home, 
  User, 
  CalendarDays 
} from "lucide-react-native";

const { width } = Dimensions.get("window");
import styles from "./styles/HomeScreenStyles"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList} from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState("User");
  const auth = getAuth();
  const db = getFirestore();

  // Fetch User Name from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Try to get name from Auth profile first
        if (user.displayName) {
          setUserName(user.displayName.split(" ")[0]); // Get first name
        } else {
          // Fallback to Firestore if auth profile is empty
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData?.fullName?.split(" ")[0] || "User");
          }
        }
      }
    };
    fetchUserData();
  }, []);

  // Reusable Grid Item Component
  const GridItem = ({ title, subtitle, icon, color, onPress }: any) => (
    <TouchableOpacity 
      style={[styles.gridItem, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <View style={styles.gridIconContainer}>
        <Image source={icon} style={styles.gridIcon} resizeMode="contain" />
      </View>
      <Text style={styles.gridTitle}>{title}</Text>
      <Text style={styles.gridSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for bottom tab
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi {userName}!</Text>
            <Text style={styles.subGreeting}>I hope you are doing fine!!</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
             {/* Placeholder for User Icon - You can replace with Image */}
             <User color="#1C2A3A" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#A1A8B0" size={20} style={styles.searchIcon} />
          <TextInput 
            placeholder="symptoms, diseases..." 
            style={styles.searchInput}
            placeholderTextColor="#A1A8B0"
          />
          <TouchableOpacity style={styles.filterButton}>
             {/* Filter Icon Lines */}
             <View style={styles.filterLine1} />
             <View style={styles.filterLine2} />
             <View style={styles.filterLine3} />
          </TouchableOpacity>
        </View>

        {/* Appointment Card */}
        <View style={styles.appointmentCard}>
          <View style={styles.doctorInfo}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} // Placeholder Doctor Image
              style={styles.doctorImage} 
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.doctorName}>Dr. Sundas Hassan</Text>
              <Text style={styles.doctorSpeciality}>Ear, Nose & Throat specialist</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <MessageCircle color="#FFFFFF" size={20} fill="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Calendar color="#FFFFFF" size={16} />
              <Text style={styles.dateText}>Wed, 10 Jan, 2024</Text>
            </View>
            <View style={styles.dateItem}>
              <Clock color="#FFFFFF" size={16} />
              <Text style={styles.dateText}>Morning set: 11:00</Text>
            </View>
          </View>
        </View>

        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          <GridItem 
            title="Book an Appointment" 
            subtitle="Find a Doctor or specialist"
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png' }} // Replace with local assets
            color="#E8F1FF" // Light Blue
            onPress={() => navigation.navigate("BookAppointment")}
          />
          <GridItem 
            title="Medical Records" 
            subtitle="view medical reports and history"
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' }}
            color="#EBFDF2" // Light Green
          />
          <GridItem 
            title="Check Symptoms" 
            subtitle="Get trusted medical advice instantly with virtual assistant."
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' }}
            color="#F2E7FE" // Light Purple
          />
          <GridItem 
            title="Report an emergency" 
            subtitle="Take help in emergency situation"
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/564/564619.png' }}
            color="#FFEEEE" // Light Red
          />
          <GridItem 
            title="Log Medicines" 
            subtitle="get reminded to take medicines"
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/883/883360.png' }}
            color="#FFF5EB" // Light Orange
          />
          <GridItem 
            title="Mental Wellness" 
            subtitle="seek Mental health support"
            icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913520.png' }}
            color="#FEFCE4" // Light Yellow
          />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>How AI is Revolutionizing Medical Consultations</Text>
            <TouchableOpacity>
              <Text style={styles.promoLink}>Find out now →</Text>
            </TouchableOpacity>
          </View>
          {/* Placeholder for the DNA/AI illustration */}
          <View style={styles.promoImagePlaceholder}>
             <Text style={{color:'white', fontWeight:'bold'}}>AI</Text>
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Home color="#1C2A3A" size={24} /></TouchableOpacity>
        <TouchableOpacity><MessageCircle color="#FFFFFF" size={24} /></TouchableOpacity>
        <TouchableOpacity><User color="#FFFFFF" size={24} /></TouchableOpacity>
        <TouchableOpacity><CalendarDays color="#FFFFFF" size={24} /></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;