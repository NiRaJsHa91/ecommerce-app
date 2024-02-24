import React, { useState } from "react";
import "./deliveryAddressForm.css";

const DeliveryAddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
         setAddress(
           `${formData.addressLine1}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`
         );
         setSubmitted(true);
      // Form is valid, proceed with submission
      
    } else {
      // Form has errors, update state to show errors
      setErrors(validationErrors);
      // Add a class to the form to trigger the red outline
      e.target.classList.add("submitted");
    }
   
  };


  const validate = (data) => {
    const errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!data.addressLine1.trim()) {
      errors.addressLine1 = "Address Line 1 is required";
    }
    if (!data.city.trim()) {
      errors.city = "City is required";
    }
    if (!data.state.trim()) {
      errors.state = "State is required";
    }
    if (!data.zipCode.trim()) {
      errors.zipCode = "Zip Code is required";
    } else if (!/^\d{6}$/.test(data.zipCode)) {
      errors.zipCode = "Zip Code must be 6 digits";
    }
    if (!data.country.trim()) {
      errors.country = "Country is required";
    }
    return errors;
  };

  return  (
   submitted ? <div>{address}</div>
   : (
    <div className="delivery-address-form-container">
      <h2>Delivery Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
        />
        {errors.addressLine1 && (
          <span className="error">{errors.addressLine1}</span>
        )}
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
        <div className="city-state-zip">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && <span className="error">{errors.state}</span>}
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
          {errors.zipCode && <span className="error">{errors.zipCode}</span>}
        </div>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <span className="error">{errors.country}</span>}
        <button disabled={Object.keys(errors).length > 0} type="submit">Submit</button>
      </form>
    </div>
   )
  );
};

export default DeliveryAddressForm;
