import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function DatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}

export default DatePicker;
