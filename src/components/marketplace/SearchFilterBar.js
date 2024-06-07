// SearchFilterBar.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Select from "react-native-picker-select";
import { AD_CATEGORY_CHOICES, AD_TYPE_CHOICES } from "../../constants";

const SearchFilterBar = ({
  selectedCategory,
  selectedType,
  setSelectedCategory,
  setSelectedType,
  totalAdsCategoryCount,
  totalAdsTypeCount,
}) => {
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);

  useEffect(() => {
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedCategory = await AsyncStorage.getItem("selectedCategory");
      const storedType = await AsyncStorage.getItem("selectedType");

      if (storedCategory && storedType) {
        setSelectedCategory(storedCategory);
        setSelectedType(storedType);
      }
    };

    fetchData();
  }, [setSelectedCategory, setSelectedType]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSelectedType(null);

    await AsyncStorage.setItem("selectedCategory", category);
    await AsyncStorage.removeItem("selectedType");
  };

  const handleTypeChange = async (type) => {
    setSelectedType(type);

    await AsyncStorage.setItem("selectedType", type.value);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {adCategoryChoices.map(([value, label]) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.categoryItem,
              selectedCategory === value ? styles.activeCategory : null,
            ]}
            onPress={() => handleCategoryChange(value)}
          >
            <Text style={styles.categoryText}>
              {label} ({value === selectedCategory ? totalAdsCategoryCount : 0})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedCategory && (
        <View style={styles.selectContainer}>
          <Select
            onValueChange={(type) => handleTypeChange(type)}
            items={adTypeChoices[selectedCategory].map(([value, label]) => ({
              value,
              label: `${label} (${
                value === selectedType ? totalAdsTypeCount : 0
              })`,
            }))}
            placeholder={{
              label: `Select Type`,
              value: null,
            }}
            value={selectedType}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    color: "#fff",
  },
  selectContainer: {
    marginTop: 20,
  },
});

export default SearchFilterBar;
