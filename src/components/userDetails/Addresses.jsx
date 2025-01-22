import React, { useEffect, useState } from "react";
import "./addresses.css";
import API from "../../utils/api";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { border } from "@chakra-ui/react";

const Addresses = ({ isCheckout = false, onAddressSelect }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // To track if it's add or edit mode
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Track selected address for editing

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    pinCode: "",
    phoneNumber: "",
    district: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        // Fetch data from the API
        const response = await API.get("/addresses");
        if (response.status === 200) {
          // Store the data in the addressData state
          setAddressData(response.data.addresses);
        } else {
          console.error("Failed to fetch addresses:", response);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddressData(); // Fetch address data on component mount
  }, [addressData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isEditMode) {
        // Update existing address
        response = await API.put(`/addresses/${selectedAddressId}`, formData);
      } else {
        // Add new address
        response = await API.post("/addresses", formData);
      }

      if (response.status === 200 || response.status === 201) {
        setAddressData((prevData) => {
          if (isEditMode) {
            // Check if response.data contains the updated address
            const updatedAddress = response.data; // Ensure this contains the full updated address
            return prevData.map((address) =>
              address._id === selectedAddressId ? updatedAddress : address
            );
          }
          return [...prevData, response.data]; // Ensure response.data is the new address
        });

        closePopup(); // Close popup after submission
      } else {
        console.error("Failed to process address:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await API.delete(`/addresses/${addressId}`);
      if (response.status === 200) {
        // Remove the deleted address from state
        setAddressData((prevData) =>
          prevData.filter((address) => address._id !== addressId)
        );
      } else {
        console.error("Failed to delete address:", response.data);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Open popup with empty form for adding a new address
  const openAddPopup = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      pinCode: "",
      phoneNumber: "",
      district: "",
      state: "",
      country: "",
    });
    setSelectedAddressId(null);
    setIsEditMode(false); // Set to add mode
    setIsPopupOpen(true);
  };

  // Open popup with selected address data for editing
  const openEditPopup = (address) => {
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2,
      pinCode: address.pinCode,
      phoneNumber: address.phoneNumber,
      district: address.district,
      state: address.state,
      country: address.country,
    });
    setSelectedAddressId(address._id); // Track the ID of the address being edited
    setIsEditMode(true); // Set to edit mode
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    if (onAddressSelect) {
      onAddressSelect(id);
    }
  };

  return (
    <>
      <div className="addresses">
        <span>{isCheckout ? "Select shipping address" :"Addresses"}</span>
        <br />
        <div className="addressesList">
          {addressData.length > 0 ? (
            addressData.map((address) => (
              <div className={`addressListItem ${selectedAddressId === address._id ? "checkoutAddress" : ''} `}  key={address._id} onClick={()=>{
                isCheckout ? handleSelectAddress(address._id) : null
              }}>
                {isCheckout && (
                  <input
                    className="radioButton"
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === address._id}
                    onChange={() => handleSelectAddress(address._id)}
                  />
                )}
                <div className="addressIcon">
                {address?.firstName
                    ? address.firstName.split("").slice(0, 2).join("")
                    : ""}
                </div>
                <div className="addressName">
                  {address.firstName + " " + address.lastName}
                </div>
                <div className="addressDetails">
                  {address?.address1
                    ? address.address1.split("").slice(0, 10).join("") + '...'
                    : ""}
                </div>
                <div className="addressButtons">
                  <div
                    className="editButton"
                    onClick={() => openEditPopup(address)}
                  >
                    <FaRegPenToSquare />
                  </div>
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(address._id)}
                  >
                    <MdDeleteOutline />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses found</p>
          )}

          <div className="addAddressButton" onClick={openAddPopup}>
            Add Address +
          </div>
        </div>
      </div>

      {/* Popup for adding or editing an address */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{isEditMode ? "Edit Address" : "Add New Address"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address 1:</label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address 2:</label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pin Code:</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>District:</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                {isEditMode ? "Update" : "Submit"}
              </button>
              <button onClick={closePopup} className="close-button">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;
