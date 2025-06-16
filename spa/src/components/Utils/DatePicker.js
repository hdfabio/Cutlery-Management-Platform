import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {ThemeProvider} from "@material-ui/styles";
import 'date-fns';
import React from 'react';

export default function Picker(props) {
	const [selectedDate, setSelectedDate] = React.useState(Date.now());

	const handleDateChange = date => {
		setSelectedDate(date);
		props.myCallback(date);
	};

	const materialTheme = createMuiTheme({
		overrides: {
			MuiPickersToolbar: {
				toolbar: {
					backgroundColor: lightBlue.A200,
				},
			},
			MuiPickersDay: {
				day: {
					color: lightBlue.A700,
				},
				daySelected: {
					backgroundColor: lightBlue["400"],
				},
				dayDisabled: {
					color: lightBlue["100"],
				},
				current: {
					color: lightBlue["900"],
				},
			}
		}
	});

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<ThemeProvider theme={materialTheme}>
				<DatePicker
					label={props.label}
					value={selectedDate}
					onChange={handleDateChange}
					shouldDisableDate={day => day.getDay() === 0}
					animateYearScrolling={false}
				/>
			</ThemeProvider>
		</MuiPickersUtilsProvider>

	);
}
