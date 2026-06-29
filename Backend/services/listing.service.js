import Listing from "../models/listing.model.js";
import ApiError from "../utils/ApiError.js";

const createListingService  = async (listingData, ownerId) => {

    const listing = await Listing.create({
        ...listingData,
        owner: ownerId,
    });

    return await Listing.findById(listing._id)
        .populate("owner", "username email")
        .select("-__v");
};

const getAllListingsService = async () => {

    const listings = await Listing.find({
        isPublished: true,
    })
    .populate("owner", "username")
    .select("-__v")
    .sort({
        createdAt: -1,
    });

    return listings;
};

const getListingByIdService = async (listingId) => {

    const listing = await Listing.findById(listingId)
        .populate("owner", "username email")
        .select("-__v");

    if (!listing) {
        throw new ApiError(
            404,
            "Listing not found"
        );
    }

    return listing;
};

export {
    createListingService , getAllListingsService, getListingByIdService
};