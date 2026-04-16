import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const menuItems = [
  { id: '1', label: 'My Orders', icon: 'receipt-outline', color: '#7C3AED' },
  { id: '2', label: 'Saved Addresses', icon: 'location-outline', color: '#3B82F6' },
  { id: '3', label: 'Payment Methods', icon: 'card-outline', color: '#10B981' },
  { id: '4', label: 'Wishlist', icon: 'heart-outline', color: '#EF4444' },
  { id: '5', label: 'Coupons & Offers', icon: 'pricetag-outline', color: '#F59E0B' },
  { id: '6', label: 'Help & Support', icon: 'headset-outline', color: '#6B7280' },
  { id: '7', label: 'About Us', icon: 'information-circle-outline', color: '#6B7280' },
];

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  const handleMenuPress = (item) => {
    if (item.label === 'My Orders') {
      navigation.navigate('Orders');
    } else if (item.label === 'Wishlist') {
      navigation.navigate('Wishlist');
    } else {
      Alert.alert(item.label, 'Coming soon!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>My Profile</Text>

        {/* Avatar */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View>
            <Text style={styles.name}>Snehankit Patil</Text>
            <Text style={styles.email}>snehankit@gmail.com</Text>
            <View style={styles.memberBadge}>
              <Ionicons name="star" size={11} color="#F59E0B" />
              <Text style={styles.memberText}>Gold Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color="#7C3AED" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Orders', value: '12' },
            { label: 'Wishlist', value: '8' },
            { label: 'Reviews', value: '5' },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, idx < menuItems.length - 1 && styles.menuBorder]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications Toggle */}
        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#7C3AED20' }]}>
              <Ionicons name="notifications-outline" size={18} color="#7C3AED" />
            </View>
            <Text style={styles.menuLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E7EB', true: '#7C3AED' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert('Logout', 'Are you sure?')}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>ShopApp v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  title: { fontSize: 22, fontWeight: '700', color: '#1F2937', paddingHorizontal: 20, paddingTop: 10, marginBottom: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16,
    padding: 16, marginBottom: 14,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#7C3AED', justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#fff' },
  name: { fontSize: 17, fontWeight: '700', color: '#1F2937' },
  email: { fontSize: 13, color: '#9CA3AF', marginBottom: 4 },
  memberBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20,
    alignSelf: 'flex-start',
  },
  memberText: { fontSize: 10, color: '#D97706', fontWeight: '600' },
  editBtn: { marginLeft: 'auto' },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 16, marginBottom: 14, overflow: 'hidden',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#7C3AED' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  menuCard: {
    backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16,
    marginBottom: 14, overflow: 'hidden',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, color: '#1F2937', fontWeight: '500' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: 16, paddingVertical: 14,
    backgroundColor: '#FEF2F2', borderRadius: 14, marginBottom: 8,
  },
  logoutText: { fontSize: 15, color: '#EF4444', fontWeight: '600' },
  version: { textAlign: 'center', fontSize: 12, color: '#D1D5DB', marginBottom: 30 },
});
