import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

export const AddContact = () => {
  const { addContact } = useContacts();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Elimina el campo `photo` si está vacío
    const dataToSend = { ...form };
    if (!form.photo.trim()) delete dataToSend.photo;

    addContact(dataToSend);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          className="form-control mb-3"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          className="form-control mb-3"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="URL de la foto (opcional)"
          className="form-control mb-4"
          value={form.photo}
          onChange={handleChange}
        />

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Volver
          </button>
          <button type="submit" className="btn btn-success">
            Agregar Contacto
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddContact;