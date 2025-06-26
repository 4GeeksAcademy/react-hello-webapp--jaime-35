import React, { createContext, useContext, useEffect, useState } from "react";

const ContactContext = createContext();
export const useContacts = () => useContext(ContactContext);

const AGENDA_SLUG = "jaime_agenda";
const API_URL = "https://playground.4geeks.com/contact/";

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const res = await fetch(`${API_URL}agendas/${AGENDA_SLUG}/contacts`);
      const data = await res.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        console.warn("No se encontró la lista de contactos:", data);
        setContacts([]);
      }
    } catch (err) {
      console.error("Error al obtener contactos:", err);
      setContacts([]);
    }
  };

  const addContact = async (contact) => {
    try {
      await fetch(`${API_URL}agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      getContacts();
    } catch (err) {
      console.error("Error al agregar contacto:", err);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      await fetch(`${API_URL}contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      getContacts();
    } catch (err) {
      console.error("Error al actualizar contacto:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}contacts/${id}`, {
        method: "DELETE",
      });
      getContacts();
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};