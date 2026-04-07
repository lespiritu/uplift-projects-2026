import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const philippineMobileRegex = /^09\d{9}$/;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const subject = encodeURIComponent(`New inquiry from ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone Number: ${formData.phone}\n\nMessage:\n${formData.message}`,
  );
  const mailToLink = `mailto:espirituleoncio@gmail.com?subject=${subject}&body=${body}`;
  const isFormComplete = Object.values(formData).every((value) => value.trim());
  const isEmailValid = emailRegex.test(formData.email.trim());
  const isPhoneValid = philippineMobileRegex.test(formData.phone.trim());
  const isFormValid = isFormComplete && isEmailValid && isPhoneValid;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    window.location.href = mailToLink;
  };

  return (
    <section className="mx-auto w-full max-w-6xl  px-4 py-14 sm:px-16">
      <div className="rounded-md border border-amber-100 bg-white p-8 md:p-16">
        <div className="mb-8">
          <h2 className="mt-2 text-4xl font-bold text-dark-leon-400">
            Get in Touch
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-dark-leon-400">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-sm border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500"
                placeholder="Enter your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-dark-leon-400">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-sm border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500"
                placeholder="Enter your email address"
              />
              {formData.email && !isEmailValid ? (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid email address.
                </p>
              ) : null}
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-dark-leon-400">
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-sm border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500"
                placeholder="09XXXXXXXXX"
                maxLength="11"
              />
              {formData.phone && !isPhoneValid ? (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid Philippine mobile number with 11 digits.
                </p>
              ) : null}
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-dark-leon-400">
              Message
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500"
              placeholder="Write your message here"
            />
          </label>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`inline-flex rounded-sm px-6 py-3 text-sm font-semibold uppercase text-white transition ${
              isFormValid
                ? "bg-amber-600 hover:bg-amber-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
