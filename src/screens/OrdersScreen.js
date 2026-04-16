import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrder } from '../context/OrderContext';

export default function OrdersScreen({ navigation }) {
  const { orders } = useOrder();

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 22 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>You haven't placed any orders.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Order #{item.id.toUpperCase()}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.orderItems}>
                {item.items.slice(0, 3).map((product, idx) => (
                  <Image key={idx} source={{ uri: product.image }} style={styles.itemImage} />
                ))}
                {item.items.length > 3 && (
                  <View style={styles.moreItemsBadge}>
                    <Text style={styles.moreItemsText}>+{item.items.length - 3}</Text>
                  </View>
                )}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.orderTotalLabel}>Total Amount:</Text>
                <Text style={styles.orderTotalValue}>₹{item.total.toLocaleString()}</Text>
              </View>
            </View>
          )}
        />
      )}
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
  list: { padding: 16 },
  orderCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  orderId: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  orderDate: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusBadge: { backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '600', color: '#1D4ED8' },
  orderItems: { flexDirection: 'row', gap: 8, marginBottom: 16, alignItems: 'center' },
  itemImage: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#f3f4f6' },
  moreItemsBadge: {
    width: 50, height: 50, borderRadius: 8, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center',
  },
  moreItemsText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  orderFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12,
  },
  orderTotalLabel: { fontSize: 14, color: '#6B7280' },
  orderTotalValue: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: '#9CA3AF' },
});
