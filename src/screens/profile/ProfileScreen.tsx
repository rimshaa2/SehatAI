import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  ChevronLeft,
  Edit2,
  Calendar,
  FileText,
  Pill,
  User,
  Bell,
  Globe,
  ChevronRight,
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

import styles from "./styles/ProfileScreenStyles";

export default ({ navigation }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          setLoading(true);

          const user = auth.currentUser;

          if (!user) {
            setUserData(null);
            return;
          }

          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            setUserData(snap.data());
          } else {
            // fallback for Google users
            setUserData({
              fullName: user.displayName || "User",
              email: user.email,
              phone: user.phoneNumber || "",
            });
          }
        } catch (err) {
          console.error("Profile fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [])
  );

  const MenuItem = ({
    icon,
    title,
    subtitle,
    color = "#E0E7FF",
    onPress,
  }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.menuIconBox, { backgroundColor: color }]}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#66CDAA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileBlock}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#FFFFFF" />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {userData?.fullName || "Guest User"}
            </Text>
            <Text style={styles.userEmail}>{userData?.email}</Text>
            <Text style={styles.userPhone}>
              {userData?.phone || "No phone added"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate("EditProfile", { userData })}
          >
            <Edit2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Health Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Calendar size={24} color="#6366F1" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>

            <View style={styles.statItem}>
              <FileText size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Records</Text>
            </View>

            <View style={styles.statItem}>
              <Pill size={24} color="#EF4444" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Medicines</Text>
            </View>
          </View>
        </View>

        <MenuItem
          icon={<User size={20} color="#3B82F6" />}
          title="Personal Information"
          subtitle="Update your details"
          color="#EFF6FF"
          onPress={() => navigation.navigate("EditProfile", { userData })}
        />

        <MenuItem
          icon={<Bell size={20} color="#8B5CF6" />}
          title="Notifications"
          subtitle="Manage preferences"
          color="#F5F3FF"
        />

        <MenuItem
          icon={<Globe size={20} color="#10B981" />}
          title="Language"
          subtitle="English, اردو, پنجابی"
          color="#ECFDF5"
        />
      </ScrollView>
    </View>
  );
};
