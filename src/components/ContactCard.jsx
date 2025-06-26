import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { deleteContact } = useContacts();

  const handleEdit = () => {
    navigate(`/edit/${contact.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
      deleteContact(contact.id);
    }
  };

  return (
    <div className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center">
      <img
        src={contact.photo || "https://placekitten.com/100/100"}
        alt={contact.name}
        className="rounded-circle me-4"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-2">{contact.name}</h5>
        <p className="mb-1">
          <i className="fas fa-map-marker-alt me-2"></i>
          {contact.address}
        </p>
        <p className="mb-1">
          <i className="fas fa-phone me-2"></i>
          {contact.phone}
        </p>
        <p className="mb-0">
          <i className="fas fa-envelope me-2"></i>
          {contact.email}
        </p>
      </div>
      <div className="d-flex flex-column align-items-center ms-3">
        <i
          className="fas fa-edit mb-2"
          style={{ cursor: "pointer", color: "black" }}
          onClick={handleEdit}
        ></i>
        <i
          className="fas fa-trash"
          style={{ cursor: "pointer", color: "black" }}
          onClick={handleDelete}
        ></i>
      </div>
    </div>
  );
};

export default ContactCard;