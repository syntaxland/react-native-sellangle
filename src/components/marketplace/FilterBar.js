// FilterBar.js
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
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);

  useEffect(() => {
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
  }, []);
  
  const [categoryCounts, setCategoryCounts] = useState({});
  const [typeCounts, setTypeCounts] = useState({});
  const [selectedTypeLabel, setSelectedTypeLabel] = useState("");

  console.log("paidAds length:", paidAds?.length);
  console.log("freeAds length:", freeAds?.length);

  useEffect(() => {
    const categoryCountsObj = {};
    adCategoryChoices.forEach(([value]) => {
      const filteredFreeAds = freeAds?.filter((ad) => ad.ad_category === value);
      const filteredPaidAds = paidAds?.filter((ad) => ad.ad_category === value);
      categoryCountsObj[value] = {
        freeAdsCount: filteredFreeAds?.length,
        paidAdsCount: filteredPaidAds?.length,
      };
    });
    setCategoryCounts(categoryCountsObj);

    const typeCountsObj = {};
    Object.keys(adTypeChoices).forEach((category) => {
      adTypeChoices[category].forEach(([value]) => {
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
            items={adTypeChoices[selectedCategory].map(([value, label]) => ({
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
