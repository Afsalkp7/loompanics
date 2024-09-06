import React from 'react';
import './contactus.css';
import { MdLocationPin, MdOutlineCall, MdOutlineMailOutline } from 'react-icons/md';
import { IoIosGlobe } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';// Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import logo from '../../assets/logo_without_bg.png';
import API from '../../utils/api';
import { toast } from 'react-toastify';

function ContactUs() {
  // Formik setup with initial values, validation schema, and submission handler
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      review: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      subject: Yup.string()
        .min(5, 'Subject must be at least 5 characters')
        .required('Subject is required'),
      review: Yup.string()
        .min(10, 'Review must be at least 10 characters')
        .required('Review is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await API.post('/contact', values);
        if (response.error){
            toast.error(response.error);
        }else{
            toast.success(response.message)
        }
        resetForm(); // Reset form fields after successful submission
      } catch (error) {
        // Show error toast notification
        toast.error('Failed to send message. Please try again.');
      }
    },
  });

  return (
    <>
      <div className="contactMain">
        <div className="contactHero">
          Contact Us <br />
          <span className="contactSubHeading">Home &gt; Contact Us</span>
        </div>
      </div>
      <div className="contact">
        <div className="contactLeft">
          <div className="contactLeftContent">
            <div className="loompanicsSection">
              <img className="loompanicsImage" alt="logo image" src={logo} />
              <div className="loompanicsLinks">
                <span className="loompanicsName">Loompanics Online Books Store</span>
                <span className="loompanicsDetail">Since July 2017</span>
                <br />
                <ul>
                  <li>
                    <MdOutlineCall />
                    <span></span>
                  </li>
                  <li>
                    <MdOutlineMailOutline />
                  </li>
                  <li>
                    <IoIosGlobe />
                  </li>
                  <li>
                    <MdLocationPin />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contactRight">
          <span className="addReviewSection">
            <span className="aboutRightFirstHeading">Send Your Messages and Feedback</span>
            <form className="responsiveForm" onSubmit={formik.handleSubmit}>
              <div className="formGroup fullWidth">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Type your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.name && formik.errors.name ? 'inputError' : ''}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="validationError">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="formGroup halfWidthContainer">
                <div className="halfWidth">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.email && formik.errors.email ? 'inputError' : ''}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="validationError">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="halfWidth">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.subject && formik.errors.subject ? 'inputError' : ''}
                  />
                  {formik.touched.subject && formik.errors.subject ? (
                    <div className="validationError">{formik.errors.subject}</div>
                  ) : null}
                </div>
              </div>
              <div className="formGroup fullWidth">
                <textarea
                  id="review"
                  name="review"
                  rows="4"
                  placeholder="Write your review..."
                  value={formik.values.review}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.review && formik.errors.review ? 'inputError' : ''}
                />
                {formik.touched.review && formik.errors.review ? (
                  <div className="validationError">{formik.errors.review}</div>
                ) : null}
              </div>
              <button type="submit" className="submitButton">
                Submit
              </button>
            </form>
          </span>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
