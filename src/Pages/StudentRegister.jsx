import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./StudentRegister.css";

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    father_name: "",
    phone: "",
    class: "",
    section: "",
    roll: "",
    pin: "",
    address: "", // ✅ address added
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "pin") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
    }

    setForm({ ...form, [name]: value });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => (img.src = e.target.result);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 600;
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => resolve(blob),
          "image/jpeg",
          0.6
        );
      };
    });
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    if (type === "success") {
      setTimeout(() => {
        navigate("/StudentLogin");
      }, 2500);
    } else {
      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) return showPopup("error", "Please upload image");
    if (form.phone.length !== 10)
      return showPopup("error", "Phone must be 10 digits");
    if (form.pin.length !== 4)
      return showPopup("error", "PIN must be 4 digits");

    setLoading(true);

    try {
      const compressedImage = await compressImage(imageFile);
      const fileName = `${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("student-photo")
        .upload(fileName, compressedImage, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        setLoading(false);
        return showPopup("error", "Image upload failed");
      }

      const { data } = supabase.storage
        .from("student-photo")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      const { error } = await supabase.from("students").insert([
        {
          name: form.name,
          father_name: form.father_name,
          number: form.phone,
          class: form.class,
          section: form.section,
          roll: form.roll,
          pin: form.pin,
          address: form.address, // ✅ stored
          photo_url: imageUrl,
        },
      ]);

      if (error) {
        setLoading(false);
        return showPopup("error", "Registration failed");
      }

      // ✅ WhatsApp Message Auto Open
      
      setLoading(false);
      showPopup("success", "Registration Successful 🎉");

    } catch (err) {
      console.error(err);
      setLoading(false);
      showPopup("error", "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            {popup.message}
          </div>
        </div>
      )}

      <div className="register-card">
        <h2>Student Registration</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Student Name" onChange={handleChange} required />
          <input name="father_name" placeholder="Father's Name" onChange={handleChange} required />
          <input name="phone" placeholder="Phone (10 digit)" value={form.phone} onChange={handleChange} required />

          <select name="class" onChange={handleChange} required>
            <option value="">Select Class</option>
            <option>Nursery</option>
            <option>LKG</option>
            <option>UKG</option>
            {[...Array(10)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>

          <select name="section" onChange={handleChange} required>
            <option value="">Select Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <input name="roll" placeholder="Roll Number" onChange={handleChange} required />
          <input name="pin" placeholder="4 Digit PIN" value={form.pin} onChange={handleChange} required />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />

          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
