import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import * as uuid from "uuid";

export default function MultipleSelect(props) {
	const classes = useStyles();
	const [values, setValues] = useState(() => {
		let ids = [];

		if (props.selected.length !== 0) {
			const {selected} = props;

			for (let maq of selected) {
				ids.push(maq.value)
			}
			return ids;

		} else {
			return [];
		}
	});

	const handleChange = event => {
		setValues(event.target.value);
		props.callback(event.target.value);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel>{props.label}</InputLabel>
				<Select
					multiple
					value={values}
					onChange={handleChange}
					id={"select-plano-fabrico"}
					input={<Input id="select-multiple-chip"/>}
					renderValue={selected => (
						<div className={classes.chips}>
							{selected.map(value => (
								<Chip key={value} label={value} className={classes.chip}/>
							))}
						</div>
					)}
					MenuProps={MenuProps}
				>
					{props.values.map(op => (
						<MenuItem key={uuid()} value={op.value}>
							{op.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 400,
		},
	},
};

MultipleSelect.propTypes = {
	callback: PropTypes.func.isRequired,
	values: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired
};
