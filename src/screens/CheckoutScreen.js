import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function CheckoutScreen({ navigation }) {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const handlePlaceOrder = () => {
    if (!address.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter your shipping address and phone number.');
      return;
    }
    
    addOrder({
      items,
      total: totalPrice,
      address,
      phone,
      status: 'Processing',
    });
    
    clearCart();
    
    Alert.alert('Order Placed! 🎉', `Your order of ₹${totalPrice.toLocaleString()} has been placed successfully!`, [
      { text: 'View Orders', onPress: () => navigation.navigate('ProfileTab') },
      { text: 'Continue Shopping', onPress: () => navigation.navigate('Home') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Address</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="123 Main St, Appt 4B..."
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>{items.length}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryTotal}>₹{totalPrice.toLocaleString()}</Text>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder}>
          <Text style={styles.checkoutBtnText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 16, marginTop: 10 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    fontSize: 15, color: '#1F2937', borderWidth: 1, borderColor: '#E5E7EB'
  },
  summaryCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1F2937', fontWeight: '500' },
  summaryTotal: { fontSize: 16, color: '#7C3AED', fontWeight: '700' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  checkoutBtn: {
    backgroundColor: '#7C3AED', paddingVertical: 16, borderRadius: 14,
    alignItems: 'center',
  },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
