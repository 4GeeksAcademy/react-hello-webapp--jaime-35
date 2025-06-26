import React from "react";
import { useContacts } from "../context/ContactContext";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";

export const Home = () => {
  const { contacts } = useContacts();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h1 className="fw-bold text-secondary m-0">Lista de Contactos</h1>
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          + Agregar Contacto
        </button>
      </div>

      {!Array.isArray(contacts) || contacts.length === 0 ? (
        <p className="text-center">No hay contactos disponibles.</p>
      ) : (
        <div className="row">
          {contacts.map(contact => (
            <div className="mb-4" key={contact.id}>
              <ContactCard contact={contact} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};