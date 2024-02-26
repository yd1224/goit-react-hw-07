import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65d789d327d9a3bc1d7b4592.mockapi.io";
export const FetchContacts = createAsyncThunk(
  "contacts/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    try {
      const { name, phone } = contact.values;
      const contacts = contact.contacts;

      const match = contacts.filter(
        (item) => item.name === name && item.phone === phone
      );
      if (match.length > 0) {
        return thunkAPI.rejectWithValue("Contact already exists");
      }
      const response = await axios.post(`/contacts/`, {
        name: name,
        phone: phone,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const changeContact = createAsyncThunk(
  "contacts/change",
  async (contact, thunkAPI) => {
    try {
      console.log(contact.values);
      const { name, phone } = contact.values;
      // const contacts = contact.contacts;
      // console.log(contact.contacts);

      const response = await axios.put(`/contacts/${contact.id}`, {
        name: name,
        phone: phone,
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
