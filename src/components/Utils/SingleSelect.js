import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import React from 'react';
import uuid from 'uuid'

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SingleSelect(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');

	const handleChange = event => {
		setValue(event.target.value);
		props.callback(event.target.value);
	};

	return (
		<div className={props.className}>
			<FormControl className={classes.formControl}>
				<InputLabel shrink id="product-select-order-label">
					{props.label}
				</InputLabel>
				<Select
					labelId="product-select-order-label"
					id="product-select-order"
					value={value}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}>
					<MenuItem value="">
						<em>Nenhum</em>
					</MenuItem>
					{
						props.options.map(op => <MenuItem key={uuid()} value={op.value}>{op.label}</MenuItem>)
					}
				</Select>
				<FormHelperText>Selecione um produto</FormHelperText>
			</FormControl>
		</div>
	);
}

SingleSelect.propTypes = {
	options: PropTypes.array.isRequired,
	callback: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};
