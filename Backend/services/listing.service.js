import Listing from "../models/listing.model.js";

const createListingService  = async (listingData, ownerId) => {

    const listing = await Listing.create({
        ...listingData,
        owner: ownerId,
    });

    return await Listing.findById(listing._id)
        .populate("owner", "username email")
        .select("-__v");
};

export {
    createListingService ,
};