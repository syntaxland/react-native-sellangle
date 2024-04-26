// SearchFilterBar.js
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./FilterBar.css";

const AD_CATEGORY_CHOICES = [
  ["Home Appliances", "Home Appliances"],
  ["Properties", "Properties"],
  ["Electronics", "Electronics"],
  ["Fashion", "Fashion"],
  ["Vehicles", "Vehicles"],
  ["Services", "Services"],
  ["Mobile Phones", "Mobile Phones"],
  ["Health & Beauty", "Health & Beauty"],
  ["Sports", "Sports"],
  ["Jobs", "Jobs"],
  ["Babies and Kids", "Babies and Kids"],
  ["Agric & Food", "Agric & Food"],
  ["Repairs", "Repairs"],
  ["Equipment & Tools", "Equipment & Tools"],
  ["CVs", "CVs"],
  ["Pets", "Pets"],
  ["Others", "Others"],
];

const AD_TYPE_CHOICES = {
  "Home Appliances": [
    ["Washing Machine", "Washing Machine"],
    ["Refrigerator", "Refrigerator"],
    ["Microwave", "Microwave"],
    ["Coffee Machine", "Coffee Machine"],
    ["Air Conditioner", "Air Conditioner"],
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
  Pets: [
    ["Dog", "Dog"],
    ["Cat", "Cat"],
    ["Fish", "Fish"],
    ["Bird", "Bird"],
  ],
  Others: [["Others", "Others"]],
};

function SearchFilterBar({
  selectedCategory,
  selectedType,
  setSelectedCategory,
  setSelectedType,
  totalAdsCategoryCount,
  totalAdsTypeCount,
}) {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedType = localStorage.getItem("selectedType");

    if (storedCategory && storedType) {
      setSelectedCategory(storedCategory);
      setSelectedType(storedType);
    }
  }, [setSelectedCategory, setSelectedType]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);
    localStorage.setItem("selectedCategory", category);
    localStorage.removeItem("selectedType");
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    localStorage.setItem("selectedType", type.value);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <div>
            <ScrollMenu>
              {AD_CATEGORY_CHOICES.map(([value, label]) => (
                <div
                  key={value}
                  className={`category-item ${
                    selectedCategory === value ? "active" : ""
                  }`}
                >
                  <Button
                    variant="outline-primary"
                    className={`rounded ${
                      selectedCategory === value ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(value)}
                  >
                    {label} ({value === selectedCategory ? totalAdsCategoryCount : 0}) 
                  </Button>
                </div>
              ))}
            </ScrollMenu>
          </div>

          <div className="d-flex justify-content-center text-center py-2">
            <Row>
              <Col md={12}>
                {selectedCategory && (
                  <div>
                    <Select
                      options={AD_TYPE_CHOICES[selectedCategory].map(
                        ([value, label]) => ({
                          value,
                          label: `${label} (${value === selectedType ? totalAdsTypeCount : 0})`,
                        })
                      )}
                      value={selectedType}
                      onChange={handleTypeChange}
                      placeholder="Select Type"
                      className="rounded py-2 mb-2"
                      required
                    />{" "}
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchFilterBar;
