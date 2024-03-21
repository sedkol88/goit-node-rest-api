import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsServices.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contactsServices.addContact({ name, email, phone });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params;
    const result = await contactsServices.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.deleteContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
