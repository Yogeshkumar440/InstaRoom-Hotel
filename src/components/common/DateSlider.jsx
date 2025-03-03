import  { useState } from 'react'
import PropTypes from 'prop-types'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"

const DateSlider = ({ onDateChange, onFilterChange }) =>{
  const initialDateRange = {
    startDate: undefined,
    endDate: undefined,
    key: "selection"
  }
  const [dateRange, setDateRange] = useState(initialDateRange)

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection)
    onDateChange(ranges.selection.startDate, ranges.selection.endDate)
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
  }

  const handleClearFilter = () => {
    setDateRange(initialDateRange)
    onDateChange(null, null)
    onFilterChange(null, null)
  }

  return (
    <>
      <h5>Filter bookings by date</h5>
      <DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4" />
      <button className="btn btn-secondary" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </>
  )

}

DateSlider.propTypes = {
  onDateChange: PropTypes.func.isRequired, 
  onFilterChange: PropTypes.func.isRequired,
};

export default DateSlider
