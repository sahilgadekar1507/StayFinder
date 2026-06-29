import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { createListingSchema } from "../validators/listing.validator.js";
import { createListingService } from "../services/listing.service.js";

const createListing = asyncHandler(async (req, res) => {

    const { error, value } =
        createListingSchema.validate(req.body);

    if (error) {
        throw new ApiError(
            400,
            error.details[0].message
        );
    }

    const listing =
        await createListingService(
            value,
            req.user._id
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            listing,
            "Listing created successfully"
        )
    );

});

export {
    createListing,
};