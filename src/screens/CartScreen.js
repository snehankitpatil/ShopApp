import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 22 }} />
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to get started</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const savings = items.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({items.length})</Text>
        <TouchableOpacity onPress={() => Alert.alert('Clear Cart', 'Remove all items?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: clearCart },
        ])}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {items.map((item, idx) => (
          <View key={`${item.id}-${item.selectedSize}-${idx}`} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              {item.selectedSize && (
                <Text style={styles.itemMeta}>Size: {item.selectedSize}</Text>
              )}
              {item.selectedColor && (
                <Text style={styles.itemMeta}>Color: {item.selectedColor}</Text>
              )}
              <View style={styles.itemBottom}>
                <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => {
                      if (item.quantity === 1) removeFromCart(item.id, item.selectedSize);
                      else updateQuantity(item.id, item.selectedSize, item.quantity - 1);
                    }}
                  >
                    <Ionicons name={item.quantity === 1 ? 'trash-outline' : 'remove'} size={14} color="#7C3AED" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={14} color="#7C3AED" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Price Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Price Details</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{(totalPrice + savings).toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={[styles.summaryValue, styles.savingsText]}>-₹{savings.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={[styles.summaryValue, styles.savingsText]}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{totalPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.savingsBanner}>
            <Ionicons name="pricetag-outline" size={14} color="#16A34A" />
            <Text style={styles.savingsBannerText}>You save ₹{savings.toLocaleString()} on this order!</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.checkoutTotal}>₹{totalPrice.toLocaleString()}</Text>
          <Text style={styles.checkoutSavings}>Saved ₹{savings.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
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
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  list: { flex: 1, paddingHorizontal: 16 },
  cartItem: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16,
    padding: 12, marginBottom: 12, gap: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  itemImage: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#f3f4f6' },
  itemInfo: { flex: 1, justifyContent: 'space-between' },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1F2937', lineHeight: 20 },
  itemMeta: { fontSize: 12, color: '#9CA3AF' },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  qtyControl: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#EDE9FE', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4,
  },
  qtyBtn: { padding: 2 },
  qtyText: { fontSize: 14, fontWeight: '700', color: '#7C3AED', minWidth: 16, textAlign: 'center' },
  summary: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1F2937', fontWeight: '500' },
  savingsText: { color: '#16A34A', fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  savingsBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#DCFCE7', padding: 10, borderRadius: 10, marginTop: 8,
  },
  savingsBannerText: { fontSize: 13, color: '#16A34A', fontWeight: '600' },
  checkoutBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
  },
  checkoutTotal: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  checkoutSavings: { fontSize: 12, color: '#16A34A', fontWeight: '500' },
  checkoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#7C3AED', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14,
  },
  checkoutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: '#9CA3AF' },
  shopBtn: {
    backgroundColor: '#7C3AED', paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: 14, marginTop: 16,
  },
  shopBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
