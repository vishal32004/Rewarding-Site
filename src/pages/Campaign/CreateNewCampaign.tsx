import { useForm } from "react-hook-form";
import { WizardForm } from "@/components/Form/wizard-form";
import { WizardStep } from "@/components/Form/wizard";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/@types/CustomFormField.types";
import {
  Check,
  Code,
  Hash,
  Link,
  Link2Icon,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { calculateTotal } from "@/lib/helper";
// import Payment from "@/components/Payment";
import { recipients } from "@/data/recipients";
import { formSchema } from "@/@types/CampaignFrom.schema";
import { useEffect, useMemo } from "react";
import { useCampaignFormStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReceptionistDialog from "@/components/Receptionist/receptioinst-dialog";
import { useQuery } from "@tanstack/react-query";
const defaultValues = {
  campaignName: "",
  description: "",
  forWho: 0,
  event: "",
  otherEvent: "",
  searchRecipients: "",
  selectedReceptionists: [] as number[],
  distributionType: "",
  bulkBuyingQty: "",
  rewardType: "",
  valueCodes: "",
  quantity: 1,
  points: "",
  advanedDetails: false,
  scheduledDate: new Date(),
  personalMessage: "",
  link: "",
  eventAddress: "",
  landingPageTemplate: "",
  emailTemplate: "",
  smsContent: "",
  smsCallToAction: "",
  startDate: new Date(),
  eventDate: new Date(),
  endDate: new Date(),
  sendReminderBeforeExpiration: false,
  sendReminderAfterInitialGift: false,
  datesInitial: "",
  datesAfter: "",
};

const CreateNewCampaign = () => {
  const {
    events,
    filteredProducts,
    selectedProducts,
    filters,
    landingPageTemplates,
    emailTemplates,
    recipientType,
    loadEvents,
    loadProducts,
    applyFilters,
    toggleProductSelection,
    resetFilters,
    clearSelectedProducts,
    loadLandingPageTemplate,
    loadEmailTemplate,
    loadRecepientType,
  } = useCampaignFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchedValues = form.watch([
    "distributionType",
    "rewardType",
    "advanedDetails",
    "points",
    "sendReminderAfterInitialGift",
    "sendReminderBeforeExpiration",
    "forWho",
  ]);
  const [
    distributionType,
    rewardType,
    showAdvancedDetails,
    points,
    sendReminderAfterInitialGift,
    sendReminderBeforeExpiration,
    forWho,
  ] = watchedValues;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({
      ...data,
      catalogData: {
        selectedProducts: selectedProducts,
        filters: filters,
      },
    });
  };

  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(
      stepFields as (keyof z.infer<typeof formSchema>)[]
    );
    return result;
  };

  const stepFields = useMemo(
    () => ({
      0: ["campaignName"],
      1: ["forWho"],
      2: ["event", "otherEvent"],
      3: ["distributionType"],
      4: [
        distributionType === "bulk_order"
          ? "bulkBuyingQty"
          : "selectedReceptionists",
      ],
      5: (() => {
        const fields = [];
        if (distributionType === "bulk_order") {
          return ["eventAddress", "eventDate"];
        }
        fields.push("rewardType");
        if (rewardType === "value_of_points") fields.push("points");
        if (rewardType === "value_of_code") fields.push("valueCodes");
        return fields;
      })(),
      8: ["emailTemplate"],
    }),
    [distributionType, rewardType]
  );

  const { isLoading, isError } = useQuery({
    queryKey: ["events", forWho],
    queryFn: () => loadEvents(forWho),
    enabled: !!forWho,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    loadProducts();
    loadLandingPageTemplate(1);
    loadEmailTemplate(1);
    loadRecepientType();
  }, [
    loadProducts,
    loadLandingPageTemplate,
    loadEmailTemplate,
    loadRecepientType,
  ]);
  return (
    <section className="flex justify-center my-7 flex-col gap-y-5 items-center">
      <div className="md:max-w-[80%] w-full"></div>
      <WizardForm
        onSubmit={onSubmit}
        className="md:max-w-[90%] w-full bg-white py-10 px-5 rounded-2xl shadow-1"
        form={form}
        stepFields={stepFields}
      >
        <WizardStep
          step={0}
          validator={() => validateStep(stepFields[0])}
          fieldNames={stepFields[0]}
        >
          <h2 className="my-4 text-center text-3xl">Create New Campaign</h2>
          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="campaignName"
              fieldType={FormFieldType.INPUT}
              label="Campaign Name"
              placeholder="Enter campaign name"
            />
            <CustomFormField
              control={form.control}
              name="description"
              fieldType={FormFieldType.TEXTAREA}
              label="Description"
              placeholder="Enter description"
            />
          </div>
        </WizardStep>

        <WizardStep
          step={1}
          validator={() => validateStep(stepFields[1])}
          fieldNames={stepFields[1]}
        >
          <h2 className="my-4 text-center text-3xl">Select Recipient Type</h2>

          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="forWho"
              fieldType={FormFieldType.RADIO}
              label="For"
              radioGridClass="grid-cols-4"
              radioOptions={recipientType}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={2}
          validator={() => validateStep(stepFields[2])}
          fieldNames={stepFields[2]}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2 className="my-4 text-center text-3xl">Select Event Type</h2>
              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="event"
                  fieldType={FormFieldType.RADIO}
                  label="Event Type"
                  radioGridClass="grid-cols-3"
                  radioOptions={events}
                />
              </div>
              <div className="mt-5">
                <CustomFormField
                  control={form.control}
                  name="otherEvent"
                  fieldType={FormFieldType.INPUT}
                  label="Other Event"
                  placeholder="Enter campaign name"
                />
              </div>
            </>
          )}
        </WizardStep>

        <WizardStep
          step={3}
          validator={() => validateStep(stepFields[3])}
          fieldNames={stepFields[3]}
        >
          <h2 className="my-4 text-center text-3xl">
            Select Distribution Type
          </h2>

          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="distributionType"
              fieldType={FormFieldType.RADIO}
              label="Distribution Type"
              radioGridClass="grid-cols-2"
              radioOptions={[
                {
                  label: "Online Gift Distribution",
                  value: "online_gift_distribution",
                  icon: Link,
                },
                {
                  label: "Bulk Order",
                  value: "bulk_order",
                  icon: ShoppingCart,
                },
              ]}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <h2 className="my-4 text-center text-3xl">Add the Recipients</h2>
          <div className="space-y-6">
            {distributionType !== "bulk_order" ? (
              <>
                <div className="flex flex-col gap-4">
                  <CustomFormField
                    control={form.control}
                    name="searchRecipients"
                    fieldType={FormFieldType.INPUT}
                    label="Search Recipients"
                    placeholder="Search by name, email, phone or department"
                  />

                  <CustomFormField
                    control={form.control}
                    name="selectedReceptionists"
                    fieldType={FormFieldType.TABLE}
                    label="Select Recipients"
                    recipients={recipients}
                    searchTerm={form.watch("searchRecipients")}
                  />
                </div>
                <ReceptionistDialog forWho={forWho} />
              </>
            ) : (
              <CustomFormField
                control={form.control}
                name="bulkBuyingQty"
                fieldType={FormFieldType.INPUT}
                label="Bulk Quantity"
                placeholder="Enter Bulk Quantity"
              />
            )}
          </div>
        </WizardStep>

        <WizardStep
          step={5}
          validator={() => validateStep(stepFields[5])}
          fieldNames={stepFields[5]}
        >
          <h2 className="my-4 text-center text-3xl">Select Reward Type</h2>

          <div className="space-y-6">
            {distributionType !== "bulk_order" ? (
              <>
                <CustomFormField
                  control={form.control}
                  name="rewardType"
                  fieldType={FormFieldType.RADIO}
                  label="Reward Type"
                  radioGridClass="grid-cols-3"
                  radioOptions={[
                    {
                      label: "Value Of Code",
                      value: "value_of_code",
                      icon: Code,
                    },
                    {
                      label: "Value Of Points",
                      value: "value_of_points",
                      icon: Hash,
                    },
                    {
                      label: "Create Reward Link",
                      value: "create_reward_link",
                      icon: Link2Icon,
                    },
                  ]}
                />

                {rewardType === "value_of_code" && (
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2">
                      <CustomFormField
                        control={form.control}
                        name="valueCodes"
                        fieldType={FormFieldType.INPUT}
                        label="Value Of Code"
                        placeholder="Enter Value Of Code (In Ruppee)"
                      />
                    </div>

                    <CustomFormField
                      control={form.control}
                      name="quantity"
                      label="Quantity"
                      fieldType={FormFieldType.QUANTITY_CONTROLLER}
                      min={1}
                      max={10}
                    />
                  </div>
                )}

                {rewardType === "value_of_points" && (
                  <>
                    <div className="grid grid-cols-3 items-end gap-2">
                      <div className="flex flex-col col-span-2">
                        <CustomFormField
                          control={form.control}
                          name="points"
                          fieldType={FormFieldType.INPUT}
                          label="Points"
                          placeholder="Enter Value Of Points"
                        />
                      </div>
                      <p className="w-full text-center bg-first text-white rounded-md px-3 py-2">
                        Total: <span>{calculateTotal(+points)}</span>
                      </p>
                    </div>
                    <p className="mt-5">Note: 1 Reward Points = INR 1.00</p>
                  </>
                )}
                <CustomFormField
                  control={form.control}
                  name="advanedDetails"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Show Advanced Details"
                />
                {showAdvancedDetails && (
                  <>
                    <CustomFormField
                      control={form.control}
                      name="scheduledDate"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Scheduled Date"
                      placeholder="Scheduled Date"
                    />
                    <p>Reward amount will be deducted on scheduled date.</p>

                    <CustomFormField
                      control={form.control}
                      name="personalMessage"
                      fieldType={FormFieldType.TEXTAREA}
                      label="Personal Message"
                      placeholder="Enter description"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <CustomFormField
                  control={form.control}
                  name="eventAddress"
                  fieldType={FormFieldType.TEXTAREA}
                  label="Event address"
                  placeholder="Event address"
                />
                <CustomFormField
                  control={form.control}
                  name="eventDate"
                  fieldType={FormFieldType.DATE_PICKER}
                  label="Event Date"
                  placeholder="Event Date"
                />
              </>
            )}
          </div>
        </WizardStep>

        {distributionType !== "bulk_order" && (
          <>
            <WizardStep
              step={6}
              validator={async () => {
                form.setValue("catalogData.selectedProducts", selectedProducts);
                form.setValue("catalogData.filters", filters);
                return await form.trigger("catalogData.selectedProducts");
              }}
              fieldNames={["catalogData.selectedProducts"]}
            >
              <h2 className="my-4 text-center text-3xl">Customize Catalogue</h2>

              <div className="space-y-6">
                {/* Filter Controls */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {/* Category Filter */}
                  <Select
                    value={filters.category}
                    onValueChange={(value) => {
                      applyFilters({ ...filters, category: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Price Range Filters */}
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => {
                      applyFilters({
                        ...filters,
                        minPrice: Number(e.target.value),
                      });
                    }}
                    min={0}
                  />

                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      applyFilters({
                        ...filters,
                        maxPrice: Number(e.target.value),
                      });
                    }}
                    min={filters.minPrice}
                  />

                  {/* Sort By Filter */}
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => {
                      applyFilters({
                        ...filters,
                        sortBy: value as
                          | "priceLowToHigh"
                          | "priceHighToLow"
                          | "popularity",
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priceLowToHigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="priceHighToLow">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => resetFilters()}>
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Selected Products Summary */}
                {selectedProducts.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        Selected Items: {selectedProducts.length}
                      </h3>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => clearSelectedProducts()}
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {filteredProducts
                        .filter((product) =>
                          selectedProducts.includes(product.id)
                        )
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center p-2 border rounded"
                          >
                            <img
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-2"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${product.price}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleProductSelection(product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      No products match your filters
                    </p>
                    <Button
                      variant="link"
                      onClick={() => resetFilters()}
                      className="mt-2"
                    >
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => {
                      const isSelected = selectedProducts.includes(product.id);
                      return (
                        <Card
                          key={product.id}
                          className={`hover:shadow-lg transition-shadow relative ${
                            isSelected ? "border-2 border-primary" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="relative aspect-square mb-3">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-600 capitalize">
                                {product.category}
                              </span>
                              <span className="text-lg font-bold">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                            {product.popularity > 7 && (
                              <div className="mt-2 flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs ml-1">Popular</span>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              className="w-full"
                              onClick={() => toggleProductSelection(product.id)}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
              <CustomFormField
                control={form.control}
                name="catalogData.selectedProducts"
                fieldType={FormFieldType.INPUT}
                label=""
                inputType="hidden"
              />
            </WizardStep>

            <WizardStep step={7}>
              <h2 className="my-4 text-center text-3xl">
                Select Landing Page Template
              </h2>

              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="landingPageTemplate"
                  fieldType={FormFieldType.RADIO_CARD}
                  radioCardoptions={landingPageTemplates.map((template) => ({
                    value: template.id,
                    content: (
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
                        <div className="relative h-40">
                          <img
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.name}
                            className="object-cover w-full max-h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <h3 className="text-sm">{template.name}</h3>
                          <p className="text-xs text-gray-500">
                            {template.category}
                          </p>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            </WizardStep>

            <WizardStep step={8} validator={() => validateStep(stepFields[8])}>
              <h2 className="my-4 text-center text-3xl">
                Select Email Template
              </h2>
              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="emailTemplate"
                  fieldType={FormFieldType.RADIO_CARD}
                  radioCardoptions={emailTemplates.map((template) => ({
                    value: template.id,
                    content: (
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
                        <div className="relative h-40">
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.title}
                            className="object-cover w-full max-h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <h3 className="text-sm">{template.title}</h3>
                          <p className="text-xs text-gray-500">
                            {template.subCategory}
                          </p>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            </WizardStep>

            <WizardStep step={9}>
              <h2 className="my-4 text-center text-3xl">Enter SMS Content</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-4">
                    <CustomFormField
                      control={form.control}
                      name="smsContent"
                      fieldType={FormFieldType.TEXTAREA}
                      label="SMS Content"
                      placeholder="Enter SMS content"
                    />
                    <CustomFormField
                      control={form.control}
                      name="smsCallToAction"
                      fieldType={FormFieldType.INPUT}
                      label="Call-to-Action"
                      placeholder="Enter call-to-action text"
                    />
                  </div>
                </div>
              </div>
            </WizardStep>

            <WizardStep step={10}>
              <h2 className="my-4 text-center text-3xl">
                Schedule Communication
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    control={form.control}
                    name="startDate"
                    fieldType={FormFieldType.DATE_PICKER}
                    label="Start Date"
                    placeholder="Select start date"
                  />
                  <CustomFormField
                    control={form.control}
                    name="endDate"
                    fieldType={FormFieldType.DATE_PICKER}
                    label="End Date"
                    placeholder="Select end date"
                  />
                  <CustomFormField
                    control={form.control}
                    name="sendReminderBeforeExpiration"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder Before Expiration"
                  />
                  <CustomFormField
                    control={form.control}
                    name="sendReminderAfterInitialGift"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder After Initial Gift Invite"
                  />

                  {sendReminderBeforeExpiration && (
                    <CustomFormField
                      control={form.control}
                      name="datesInitial"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Start Date"
                      placeholder="Select start dates"
                      multipleDates={true}
                    />
                  )}
                  {sendReminderAfterInitialGift && (
                    <CustomFormField
                      control={form.control}
                      name="datesAfter"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="End Date"
                      placeholder="Select After dates"
                      multipleDates={true}
                    />
                  )}
                </div>
              </div>
            </WizardStep>
            <WizardStep step={11}>
              {/* <Payment /> */}
              <div>ADDDING PAYMENT MODULE</div>
            </WizardStep>
          </>
        )}
      </WizardForm>
    </section>
  );
};

export default CreateNewCampaign;
