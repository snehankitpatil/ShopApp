import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);

  const isFavorited = isInWishlist(product.id);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, selectedColor });
    Alert.alert('Added to Cart! 🛍️', `${product.name} has been added to your cart.`, [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => toggleWishlist(product)}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorited ? '#EF4444' : '#1F2937'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          {/* Title & Price */}
          <View style={styles.row}>
            <Text style={styles.category}>{product.category}</Text>
            {product.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s}
                name={s <= Math.floor(product.rating) ? 'star' : 'star-outline'}
                size={16}
                color="#F59E0B"
              />
            ))}
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewText}>· {product.reviews} reviews</Text>
          </View>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Size</Text>
              <View style={styles.optionRow}>
                {product.sizes.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.optionChip, selectedSize === s && styles.optionChipActive]}
                    onPress={() => setSelectedSize(s)}
                  >
                    <Text
                      style={[styles.optionChipText, selectedSize === s && styles.optionChipTextActive]}
                    >
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Colors */}
          {product.colors.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Color</Text>
              <View style={styles.optionRow}>
                {product.colors.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.optionChip, selectedColor === c && styles.optionChipActive]}
                    onPress={() => setSelectedColor(c)}
                  >
                    <Text
                      style={[styles.optionChipText, selectedColor === c && styles.optionChipTextActive]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryItem}>
              <Ionicons name="rocket-outline" size={20} color="#7C3AED" />
              <Text style={styles.deliveryText}>Free delivery on orders above ₹499</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Ionicons name="refresh-outline" size={20} color="#7C3AED" />
              <Text style={styles.deliveryText}>7-day easy returns</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#7C3AED" />
              <Text style={styles.deliveryText}>100% authentic products</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-add-outline" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={() => { handleAddToCart(); navigation.navigate('Cart'); }}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 40, height: 40, backgroundColor: '#fff',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  image: { width, height: 320, backgroundColor: '#f3f4f6' },
  content: { padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  category: { fontSize: 12, color: '#7C3AED', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  badge: { backgroundColor: '#EDE9FE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 11, color: '#7C3AED', fontWeight: '600' },
  name: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginBottom: 12, lineHeight: 30 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  price: { fontSize: 24, fontWeight: '800', color: '#1F2937' },
  originalPrice: { fontSize: 16, color: '#9CA3AF', textDecorationLine: 'line-through' },
  discountTag: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  discountText: { fontSize: 12, color: '#16A34A', fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 20 },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginLeft: 4 },
  reviewText: { fontSize: 13, color: '#6B7280' },
  optionSection: { marginBottom: 20 },
  optionLabel: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 10 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#E5E7EB', backgroundColor: '#fff',
  },
  optionChipActive: { borderColor: '#7C3AED', backgroundColor: '#EDE9FE' },
  optionChipText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  optionChipTextActive: { color: '#7C3AED', fontWeight: '700' },
  description: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
  deliveryCard: {
    backgroundColor: '#F3F4F6', borderRadius: 14, padding: 16, gap: 10,
  },
  deliveryItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  deliveryText: { fontSize: 13, color: '#374151' },
  bottomBar: {
    flexDirection: 'row', padding: 16, gap: 12,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6',
  },
  addToCartBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1F2937', borderRadius: 14, paddingVertical: 14, gap: 6,
  },
  addToCartText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  buyNowBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#7C3AED', borderRadius: 14, paddingVertical: 14,
  },
  buyNowText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
