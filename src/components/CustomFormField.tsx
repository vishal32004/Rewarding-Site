import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  FieldPath,
} from "react-hook-form";
import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "@/components/ui/combobox";
import { QuantityController } from "@/components/QuantityController";
import { FormFieldType } from "@/@types/CustomFormField.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export type RadioOptionType = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
};

export type ComboboxOptionType = {
  label: string;
  value: string;
};

export type RadioCardOptionType = {
  value: string;
  content: React.ReactNode;
};

export type RecipientType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
};

interface BaseFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, FieldPath<T>>;
}

interface InputFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  inputType?: string;
  classNames?: string;
  disabled?: boolean;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  children?: React.ReactNode;
}

interface DatePickerFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  multipleDates?: boolean;
  dateFormat?: string;
}

interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  name: string;
  label?: string;
  checkboxValue?: number;
}

interface TextareaFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  disabled?: boolean;
}

interface RadioFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  radioOptions?: RadioOptionType[];
  radioGridClass?: string;
}

interface ComboboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  comboboxOption?: ComboboxOptionType[];
  placeholder?: string;
}

interface QuantityFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  min?: number;
  max?: number;
}

interface RadioCardFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  radioCardoptions?: RadioCardOptionType[];
}

interface TableFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  recipients?: RecipientType[];
  searchTerm?: string;
}

interface AccordionRadioFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  label?: string;
  accordionValue: string;
  radioOptions?: RadioOptionType[];
}

export interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  radioOptions?: RadioOptionType[];
  radioGridClass?: string;
  comboboxOption?: ComboboxOptionType[];
  min?: number;
  max?: number;
  multipleDates?: boolean;
  inputType?: string;
  classNames?: string;
  radioCardoptions?: RadioCardOptionType[];
  recipients?: RecipientType[];
  searchTerm?: string;
  accordionValue?: string;
}

interface RenderFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomFormFieldProps<T>;
}

const InputField = <T extends FieldValues>({
  field,
  placeholder,
  inputType,
  classNames,
  disabled,
}: InputFieldProps<T>) => (
  <div
    className={cn(
      "flex rounded-md border border-dark-500 bg-dark-400",
      classNames
    )}
  >
    <FormControl>
      <Input
        placeholder={placeholder}
        {...field}
        className="shad-input border-0"
        type={inputType || "text"}
        disabled={disabled}
      />
    </FormControl>
  </div>
);

const SelectField = <T extends FieldValues>({
  field,
  placeholder,
  children,
}: SelectFieldProps<T>) => (
  <FormControl>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>{children}</SelectContent>
    </Select>
  </FormControl>
);

const DatePickerField = <T extends FieldValues>({
  field,
  multipleDates,
  dateFormat = "PPP",
}: DatePickerFieldProps<T>) => (
  <Popover>
    <PopoverTrigger asChild={false}>
      <FormControl>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {renderDatePickerValue(field.value, multipleDates, dateFormat)}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode={multipleDates ? "multiple" : "single"}
        selected={field.value}
        onSelect={field.onChange}
        // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

const CheckboxField = <T extends FieldValues>({
  field,
  name,
  label,
  checkboxValue,
}: CheckboxFieldProps<T>) => (
  <FormControl>
    <div className="flex items-center gap-4">
      <Checkbox
        id={`${name}-${checkboxValue}`}
        checked={
          checkboxValue ? field.value?.includes(checkboxValue) : field.value
        }
        onCheckedChange={(checked) => {
          if (checkboxValue !== undefined) {
            if (checked) {
              field.onChange([...(field.value || []), checkboxValue]);
            } else {
              field.onChange(
                field.value?.filter((v: number) => v !== checkboxValue) || []
              );
            }
          } else {
            field.onChange(checked);
          }
        }}
      />
      {label && (
        <label
          htmlFor={`${name}-${checkboxValue}`}
          className="md:leading-none cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  </FormControl>
);

const TextareaField = <T extends FieldValues>({
  field,
  placeholder,
  disabled,
}: TextareaFieldProps<T>) => (
  <FormControl>
    <Textarea
      placeholder={placeholder}
      {...field}
      className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      disabled={disabled}
    />
  </FormControl>
);

const RadioField = <T extends FieldValues>({
  field,
  radioOptions = [],
  radioGridClass,
}: RadioFieldProps<T>) => (
  <FormControl>
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className={cn("grid", radioGridClass)}
    >
      {radioOptions.map((option: RadioOptionType) => (
        <FormItem
          className="flex items-center space-x-3 space-y-0 card-radio"
          key={option.value}
        >
          <FormControl>
            <RadioGroupItem value={option.value as string} className="hidden" />
          </FormControl>
          <FormLabel className="font-normal text-center gap-2 text-md h-full px-4 py-6 border-2 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center justify-center w-full">
            {option.icon && <option.icon />}
            {option.label}
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  </FormControl>
);

const ComboboxField = <T extends FieldValues>({
  field,
  comboboxOption = [],
  placeholder,
}: ComboboxFieldProps<T>) => (
  <FormControl>
    <Combobox
      value={field.value}
      onChange={field.onChange}
      options={comboboxOption}
      placeholder={placeholder}
      searchPlaceholder="Search"
    />
  </FormControl>
);

const QuantityField = <T extends FieldValues>({
  field,
  min = 1,
  max = 99,
}: QuantityFieldProps<T>) => (
  <FormControl>
    <QuantityController
      value={field.value || 1}
      onIncrement={() => field.onChange(Math.min(field.value + 1, max))}
      onDecrement={() => field.onChange(Math.max(field.value - 1, min))}
      onChange={(value) => field.onChange(value)}
      min={min}
      max={max}
    />
  </FormControl>
);

const TableField = <T extends FieldValues>({
  field,
  recipients = [],
  searchTerm = "",
}: TableFieldProps<T>) => {
  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.phone.includes(searchTerm) ||
      recipient.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecipients.length > 0 ? (
            filteredRecipients.map((recipient) => (
              <TableRow key={recipient.id}>
                <TableCell>
                  <Checkbox
                    checked={field.value?.includes(recipient.id)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...(field.value || []), recipient.id]
                        : field.value?.filter(
                            (id: number) => id !== recipient.id
                          ) || [];
                      field.onChange(newValue);
                    }}
                  />
                </TableCell>
                <TableCell>{recipient.name}</TableCell>
                <TableCell>{recipient.email}</TableCell>
                <TableCell>{recipient.phone}</TableCell>
                <TableCell>{recipient.department}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const renderDatePickerValue = (
  value: Date | Date[] | null | undefined,
  multipleDates?: boolean,
  dateFormat?: string
): React.ReactNode => {
  if (!value) {
    return <span>{multipleDates ? "Pick dates" : "Pick a date"}</span>;
  }

  if (multipleDates && Array.isArray(value)) {
    if (value.length === 0) {
      return <span>Pick dates</span>;
    }
    return value.length === 1
      ? format(value[0], dateFormat || "PPP")
      : `${value.length} dates selected`;
  }

  return format(value as Date, dateFormat || "PPP");
};

const RadioCardField = <T extends FieldValues>({
  field,
  radioCardoptions = [],
}: RadioCardFieldProps<T>) => (
  <FormControl>
    <RadioGroup
      onValueChange={field.onChange}
      value={field.value}
      className="grid grid-cols-3"
    >
      {radioCardoptions.map((option) => (
        <div key={option.value} className="relative col-span-1">
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="peer absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor={option.value}
            className={cn(
              "cursor-pointer transition-all relative inline-block",
              "peer-checked:border-primary peer-checked:bg-primary/10"
            )}
          >
            <div
              className={cn(
                "absolute top-[-10px] right-[-5px] text-white rounded-full p-1 z-10 bg-blue-500",
                field.value === option.value ? "opacity-100" : "opacity-0"
              )}
            >
              <Check className="h-3 w-3" />
            </div>
            {option.content}
          </label>
        </div>
      ))}
    </RadioGroup>
  </FormControl>
);
const AccordionRadioField = <T extends FieldValues>({
  field,
  label,
  accordionValue,
  radioOptions = [],
}: AccordionRadioFieldProps<T>) => (
  <Accordion type="single" collapsible className="w-full border rounded-lg">
    <AccordionItem
      value={accordionValue?.toString() || ""}
      className="border-b-0"
    >
      <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:bg-gray-50 [&[data-state=open]]:font-semibold">
        {label}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-0">
        <RadioGroup
          value={field.value?.toString() || ""}
          onValueChange={field.onChange}
          className="space-y-2 grid-cols-3 py-4"
        >
          {radioOptions.map((option) => (
            <div key={option.value} className="flex items-center">
              <Label
                htmlFor={`${field.name}-${option.value}`}
                className={`flex items-center w-full p-3 rounded-lg border cursor-pointer transition-colors ${
                  field.value?.toString() === option.value.toString()
                    ? "bg-blue-50 border-blue-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`${field.name}-${option.value}`}
                  className="sr-only"
                />
                <span className="ml-2">{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const fieldComponents = {
  [FormFieldType.INPUT]: InputField,
  [FormFieldType.SELECT]: SelectField,
  [FormFieldType.DATE_PICKER]: DatePickerField,
  [FormFieldType.CHECKBOX]: CheckboxField,
  [FormFieldType.TEXTAREA]: TextareaField,
  [FormFieldType.RADIO]: RadioField,
  [FormFieldType.COMBOBOX]: ComboboxField,
  [FormFieldType.QUANTITY_CONTROLLER]: QuantityField,
  [FormFieldType.RADIO_CARD]: RadioCardField,
  [FormFieldType.TABLE]: TableField,
  [FormFieldType.ACCORDION_RADIO]: AccordionRadioField,
};

function RenderField<T extends FieldValues>({
  field,
  props,
}: RenderFieldProps<T>): React.ReactElement | null {
  const FieldComponent =
    fieldComponents[props.fieldType as keyof typeof fieldComponents];
  if (!FieldComponent) return null;

  return (
    <FieldComponent
      field={field}
      {...{ ...props, accordionValue: props.accordionValue || "" }}
    />
  );
}

function CustomFormField<T extends FieldValues>(
  props: CustomFormFieldProps<T>
): React.ReactElement {
  const { control, fieldType, label, name } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX &&
            fieldType !== FormFieldType.ACCORDION_RADIO &&
            label && <FormLabel className="mb-1">{label}</FormLabel>}

          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}

export default memo(CustomFormField) as typeof CustomFormField;
