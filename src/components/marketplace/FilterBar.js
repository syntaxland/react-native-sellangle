// FilterBar.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  // Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Select from "react-native-picker-select";

const AD_CATEGORY_CHOICES = [
  ["Home Appliances", "Home Appliances"],
  ["Pets", "Pets"],
  ["Fashion", "Fashion"],
  ["Mobile Phones", "Mobile Phones"],
  ["Properties", "Properties"],
  ["Electronics", "Electronics"],
  ["Vehicles", "Vehicles"],
  ["Services", "Services"],
  ["Health & Beauty", "Health & Beauty"],
  ["Sports", "Sports"],
  ["Jobs", "Jobs"],
  ["Babies and Kids", "Babies and Kids"],
  ["Agric & Food", "Agric & Food"],
  ["Repairs", "Repairs"],
  ["Equipment & Tools", "Equipment & Tools"],
  ["CVs", "CVs"],
  ["Others", "Others"],
];

const AD_TYPE_CHOICES = {
  "Home Appliances": [
    ["Washing Machine", "Washing Machine"],
    ["Refrigerator", "Refrigerator"],
    ["Microwave", "Microwave"],
    ["Coffee Machine", "Coffee Machine"],
    ["Air Conditioner", "Air Conditioner"],
    ["Solar", "Solar"],
    ["Kitchen Appliances", "Kitchen Appliances"],
  ],
  Pets: [
    ["Dog", "Dog"],
    ["Cat", "Cat"],
    ["Fish", "Fish"],
    ["Bird", "Bird"],
  ],
  Properties: [
    ["House", "House"],
    ["Apartment", "Apartment"],
    ["Land", "Land"],
    ["Commercial Property", "Commercial Property"],
  ],
  Electronics: [
    ["Laptop", "Laptop"],
    ["Smartphone", "Smartphone"],
    ["Camera", "Camera"],
    ["Headphones", "Headphones"],
    ["Television", "Television"],
  ],
  Fashion: [
    ["Clothing", "Clothing"],
    ["Shoes", "Shoes"],
    ["Accessories", "Accessories"],
  ],
  Vehicles: [
    ["Car", "Car"],
    ["Motorcycle", "Motorcycle"],
    ["Bicycle", "Bicycle"],
  ],
  Services: [
    ["Cleaning", "Cleaning"],
    ["Plumbing", "Plumbing"],
    ["Electrician", "Electrician"],
    ["Catering", "Catering"],
    ["Tutoring", "Tutoring"],
  ],
  "Mobile Phones": [
    ["iPhone", "iPhone"],
    ["Samsung", "Samsung"],
    ["Google Pixel", "Google Pixel"],
    ["OnePlus", "OnePlus"],
  ],
  "Health & Beauty": [
    ["Skincare", "Skincare"],
    ["Haircare", "Haircare"],
    ["Makeup", "Makeup"],
    ["Fitness Equipment", "Fitness Equipment"],
  ],
  Sports: [
    ["Soccer", "Soccer"],
    ["Basketball", "Basketball"],
    ["Tennis", "Tennis"],
    ["Golf", "Golf"],
  ],
  Jobs: [
    ["IT", "IT"],
    ["Sales", "Sales"],
    ["Marketing", "Marketing"],
    ["Administrative", "Administrative"],
  ],
  "Babies and Kids": [
    ["Toys", "Toys"],
    ["Clothing Kids", "Clothing"],
    ["Strollers", "Strollers"],
  ],
  "Agric & Food": [
    ["Farm Products", "Farm Products"],
    ["Processed Food", "Processed Food"],
    ["Beverages", "Beverages"],
  ],
  Repairs: [
    ["Electronic Repair", "Electronic Repair"],
    ["Appliance Repair", "Appliance Repair"],
    ["Car Repair", "Car Repair"],
  ],
  "Equipment & Tools": [
    ["Power Tools", "Power Tools"],
    ["Hand Tools", "Hand Tools"],
    ["Kitchen Tools", "Kitchen Tools"],
  ],
  CVs: [
    ["Engineering", "Engineering"],
    ["Marketing CVs", "Marketing"],
    ["Design", "Design"],
    ["Education", "Education"],
  ],

  Others: [["Others", "Others"]],
};

const FilterBar = ({
  freeAds,
  paidAds,
  selectedCategory,
  selectedType,
  setSelectedCategory,
  setSelectedType,
  onCategoryChange,
  onTypeChange,
}) => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [typeCounts, setTypeCounts] = useState({});
  const [selectedTypeLabel, setSelectedTypeLabel] = useState("");

  console.log("paidAds length:", paidAds?.length);
  console.log("freeAds length:", freeAds?.length);

  useEffect(() => {
    const categoryCountsObj = {};
    AD_CATEGORY_CHOICES.forEach(([value]) => {
      const filteredFreeAds = freeAds?.filter((ad) => ad.ad_category === value);
      const filteredPaidAds = paidAds?.filter((ad) => ad.ad_category === value);
      categoryCountsObj[value] = {
        freeAdsCount: filteredFreeAds?.length,
        paidAdsCount: filteredPaidAds?.length,
      };
    });
    setCategoryCounts(categoryCountsObj);

    const typeCountsObj = {};
    Object.keys(AD_TYPE_CHOICES).forEach((category) => {
      AD_TYPE_CHOICES[category].forEach(([value]) => {
        const filteredFreeAds = freeAds?.filter(
          (ad) => ad.ad_category === category && ad.ad_type === value
        );
        const filteredPaidAds = paidAds?.filter(
          (ad) => ad.ad_category === category && ad.ad_type === value
        );
        typeCountsObj[value] = {
          freeAdsCount: filteredFreeAds?.length,
          paidAdsCount: filteredPaidAds?.length,
        };
      });
    });
    setTypeCounts(typeCountsObj);
  }, [freeAds, paidAds]);

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

    const filteredFreeAds = freeAds?.filter(
      (ad) => ad.ad_category === category
    );
    const filteredPaidAds = paidAds?.filter(
      (ad) => ad.ad_category === category
    );
    onCategoryChange(category, filteredFreeAds, filteredPaidAds);

    await AsyncStorage.setItem("selectedCategory", category);
    await AsyncStorage.removeItem("selectedType");
  };

  const handleTypeChange = async (type) => {
    if (!type) {
      return;
    }

    setSelectedType(type);
    setSelectedTypeLabel(type?.label);

    const filteredFreeAds = freeAds?.filter(
      (ad) => ad.ad_category === selectedCategory && ad.ad_type === type.value
    );
    const filteredPaidAds = paidAds?.filter(
      (ad) => ad.ad_category === selectedCategory && ad.ad_type === type.value
    );

    onTypeChange(type.value, filteredFreeAds, filteredPaidAds);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {AD_CATEGORY_CHOICES.map(([value, label]) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.categoryItem,
              selectedCategory === value ? styles.activeCategory : null,
            ]}
            onPress={() => handleCategoryChange(value)}
          >
            <Text style={styles.categoryText}>
              {label} (
              {categoryCounts[value] &&
                categoryCounts[value].freeAdsCount +
                  categoryCounts[value].paidAdsCount}
              )
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedCategory && (
        <View style={styles.selectContainer}>
          <Select
            onValueChange={(type) => handleTypeChange(type)}
            items={AD_TYPE_CHOICES[selectedCategory].map(([value, label]) => ({
              value,
              label: `${label} (${
                typeCounts[value] &&
                typeCounts[value].freeAdsCount + typeCounts[value].paidAdsCount
              })`,
            }))}
            placeholder={{
              label: `Select Type (${selectedTypeLabel})`,
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

export default FilterBar;
