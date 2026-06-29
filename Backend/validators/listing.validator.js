import Joi from "joi";

const createListingSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .min(20)
    .max(2000)
    .required(),

  category: Joi.string()
    .valid(
      "Apartment",
      "Villa",
      "House",
      "Cabin",
      "Farm House",
      "Hotel",
      "Resort",
      "Beach House",
      "Camping"
    )
    .required(),

  price: Joi.number()
    .min(1)
    .required(),

  currency: Joi.string()
    .valid("INR", "USD", "EUR")
    .default("INR"),

  address: Joi.string()
    .trim()
    .required(),

  city: Joi.string()
    .trim()
    .required(),

  state: Joi.string()
    .trim()
    .required(),

  country: Joi.string()
    .trim()
    .required(),

  isPublished: Joi.boolean()
    .default(true),
});

export { createListingSchema };