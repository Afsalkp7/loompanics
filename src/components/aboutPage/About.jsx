import React from "react";
import "./about.css";
import founder from '../../assets/founder.jpg'
import logo from '../../assets/logo_without_bg.png'
import { FiYoutube } from "react-icons/fi";
import { MdOutlineCall } from "react-icons/md";
import { RiWhatsappLine } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../utils/api';
import { toast } from 'react-toastify';

function About() {
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
            toast.success('Message sended successfully')
            resetForm(); // Reset form fields after successful submission
          } catch (error) {
            // Show error toast notification
            toast.error('Failed to send message. Please try again.');
          }
        },
      });
  return (
    <>
      <div className="aboutMain">
        <div className="aboutHero">
          About Us <br />
          <span className="subHeading">Home &gt; About Us</span>
        </div>
      </div>
      <div className="aboutSection">
        <div className="aboutLeft">
            <div className="founderSection">
                <img className="founderImage" alt="founder image" src={founder}  />
                <div className="founderLinks">
                    <span className="founderName">Shadiya PK</span>
                    <span className="founderDetail">Founder of Loompanics online bookstore and Loompanics creatives</span><br />
                    <ul>
                        <li><FiYoutube /></li>
                        <li><FiInstagram /></li>
                        <li><RiWhatsappLine /></li>
                        <li><MdOutlineCall /></li>
                    </ul>
                </div>
            </div>
            <div className="loompanicsSection">
                <img className="loompanicsImage" alt="logo image" src={logo}  />
                <div className="loompanicsLinks">
                    <span className="loompanicsName">Loompanics Online Books Store</span>
                    <span className="loompanicsDetail">Since July 2017</span><br />
                    <ul>
                        <li><MdOutlineCall /><span></span></li>
                        <li><MdOutlineMailOutline /></li>
                        <li><IoIosGlobe /></li>
                        <li><MdLocationPin /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="aboutRight">
          <span className="aboutRightFirstHeading">Through Back</span>
          <br />
          <span className="aboutRightFirstParagraph">
            Loompanics is an online bookstore founded by Shadiya PK, an
            inspiring entrepreneur who has overcome the challenges of being
            disabled. Starting as an Instagram page, Loompanics has now evolved
            into a full-fledged website, offering a wide variety of books across
            different genres and providing shipping all over India. <br />{" "}
            <br /> In addition to being a bookstore, the website also features a
            library that offers special benefits and discounts to disabled
            individuals. Shadiya's dedication and hard work have turned her
            passion for books into a successful and inclusive business,
            showcasing her remarkable resilience and entrepreneurial spirit.
          </span>{" "}
          <br /> <br />
          <span className="aboutRightFirstHeading">Products</span>
          <br />
          <span className="aboutRightFirstParagraph">
            <ul>
              <li>Loompanics book store</li>
              <span>
                Loompanics is an online bookstore founded by Shadiya PK, an
                inspiring entrepreneur who has overcome the challenges of being
                disabled. Starting as an Instagram page, Loompanics has now
                evolved into a full-fledged website, offering a wide variety of
                books across different genres and providing shipping all over
                India. <br /> <br /> In addition to being a bookstore, the
                website also features a library that offers special benefits and
                discounts to disabled individuals. Shadiya's dedication and hard
                work have turned her passion for books into a successful and
                inclusive business, showcasing her remarkable resilience and
                entrepreneurial spirit.
              </span>
              <br />
              <br />
              <li>Loompanics creatives</li>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat deleniti soluta, non iusto cum dolorum obcaecati
                assumenda sequi repudiandae at eos voluptatum sit similique
                distinctio ipsum dicta harum dolor. Quidem. Voluptatibus quam
                expedita sit culpa deserunt quas iure quaerat, quis itaque
                provident aliquam quasi tempora quidem et sunt, ipsa nobis
                facere qui nihil incidunt accusantium enim ipsam cum in? Animi?
                Corrupti repudiandae dolorum, id molestiae at ratione eius
                suscipit. Minima quos eos impedit ipsa aliquid qui animi placeat
                vitae, odit modi, veniam hic unde. Minima qui sed exercitationem
                maiores quam? Asperiores, quidem, officiis iure aliquid
                consectetur earum veritatis laboriosam amet ipsa adipisci animi
                odio saepe, dicta aut perspiciatis reiciendis iusto doloremque
                vel nam debitis ex reprehenderit? Eveniet quaerat tempora eos.
                Doloribus a totam dolorum reprehenderit sapiente doloremque
                corporis adipisci dolores provident vero ipsa deleniti
                exercitationem optio maxime molestiae, ipsum veniam earum
                aliquam. Ad assumenda possimus sed minima rerum voluptates ut.
              </span>
              <br /> <br />
              <li>Shadiyude lokham</li>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto accusantium exercitationem maxime quas quod
                reprehenderit inventore aperiam dolorum beatae, quia voluptates
                sunt dolor nemo amet dolore eius debitis ea placeat. Dicta,
                mollitia deleniti porro et cumque sit omnis possimus nesciunt
                est minima quasi dignissimos aspernatur animi nihil at sequi
                alias impedit nisi tempora nemo. Provident laboriosam autem
                culpa similique vero? Modi nihil quis fugiat quaerat illum
                placeat officia laudantium delectus unde fuga dolore, dicta
                neque non sequi atque adipisci quod laboriosam saepe veritatis
                soluta officiis excepturi voluptatibus. Obcaecati, esse
                excepturi. Necessitatibus non quisquam minus itaque perspiciatis
                rem aspernatur cumque! Numquam dolorem sit facere rem quaerat
                optio blanditiis doloribus consequuntur sed quod, ad unde
                voluptate accusantium minus tenetur temporibus molestiae
                nostrum. Quidem quae cumque iusto rem quos eos, magni laborum
                sit quis! At corporis adipisci error laudantium, hic dolores
                saepe recusandae necessitatibus ipsum vero natus nostrum porro
                sapiente voluptas beatae explicabo.
              </span>
            </ul>
          </span>
          <br />
          <br />
          <span className="aboutMeetMind">
            <span className="aboutRightFirstHeading">Meet The Mind</span>
            <div className="meetMindImageSection"></div>
            <span className="aboutRightMeetMindParagraph">
              Shadiya PK is the remarkable founder of Loompanics, an innovative
              online bookstore that has quickly gained recognition for its wide
              array of books and nationwide shipping across India. Despite
              facing the challenges of being disabled, Shadiya has demonstrated
              exceptional resilience and entrepreneurial spirit, transforming
              her passion for books into a thriving business. <br /><br /> Loompanics
              initially began as an Instagram page, where Shadiya shared her
              love for literature and connected with fellow book enthusiasts.
              The positive response and growing demand encouraged her to expand
              her venture into a comprehensive website. Today, Loompanics offers
              an extensive collection of books across various genres, catering
              to the diverse tastes of readers.<br /><br/> In addition to being a
              bookstore, Loompanics features a unique library section that
              provides special offers and discounts to disabled individuals,
              promoting inclusivity and accessibility within the literary
              community. Shadiya's commitment to making literature accessible to
              everyone, regardless of their physical abilities, sets Loompanics
              apart as a socially conscious business.
            </span>
          </span><br /> <br />
          <span className="addReviewSection">
          <span className="aboutRightFirstHeading">Add Your Reveiw</span>
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

export default About;
