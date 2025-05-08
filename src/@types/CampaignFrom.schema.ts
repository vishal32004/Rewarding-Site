import { z } from "zod";
export const formSchema = z
    .object({
        campaignName: z.string().min(2, {
            message: "Campaign name is required",
        }),
        description: z.string(),
        forWho: z.number(),
        event: z.string().min(2, { message: "Please Select at least one Option" }),
        otherEvent: z.string(),
        searchRecipients: z.string(),
        selectedReceptionists: z.number().array().nonempty(),
        distributionType: z
            .string()
            .min(2, { message: "Please Select at least one Option" }),
        bulkBuyingQty: z
            .string()
            .min(1, { message: "Please Enter A valid Quantity" }),
        rewardType: z
            .string()
            .min(2, { message: "Please Select at least one Option" }),
        valueCodes: z.string().min(2, { message: "Please Enter A Valid Option" }),
        quantity: z.number().min(1, { message: "Please Enter the Quantity" }),
        points: z.string().min(1, { message: "Please Enter A Valid Option" }),
        advanedDetails: z.boolean().optional(),
        scheduledDate: z.date(),
        personalMessage: z.string().min(2, {
            message: "Too Small",
        }),
        link: z.string().min(2, {
            message: "A valid Link",
        }),
        eventAddress: z.string().min(2, {
            message: "Please Add A Valid Address",
        }),
        catalogSelectedProducts: z.array(z.string()),
        catalogFilters: z.object({
            category: z.string(),
            minPrice: z.number(),
            maxPrice: z.number(),
            sortBy: z.enum(["priceLowToHigh", "priceHighToLow", "popularity"]),
        }),
        landingPageTemplate: z.string(),
        emailTemplate: z.string(),
        smsContent: z.string(),
        smsCallToAction: z.string(),
        startDate: z.date(),
        eventDate: z.date(),
        endDate: z.date(),
        sendReminderBeforeExpiration: z.boolean(),
        sendReminderAfterInitialGift: z.boolean(),
        datesInitial: z.string(),
        datesAfter: z.string(),

    })
    .refine(
        (data) => {
            if (data.distributionType === "Bulk Order") {
                return !!data.bulkBuyingQty;
            }
            return true;
        },
        {
            message: "Bulk Buying Quantity is required",
            path: ["bulkBuyingQty"],
        }
    )
    .refine(
        (data) => {
            if (data.rewardType === "Value of Points") {
                return !!data.points;
            }
            return true;
        },
        {
            message: "Points are required",
            path: ["points"],
        }
    )
    .refine(
        (data) => {
            if (data.rewardType === "Bulk Order at Registered office / Event Place") {
                return !!data.eventAddress && !!data.eventDate;
            }
            return true;
        },
        {
            message: "Event Address & Date are required",
            path: ["eventAddress", "eventDate"],
        }
    );