import moment from "moment";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {connect} from "react-redux";
import {deleteEncomenda} from "../../../../actions/ge/encomendaActions";
import Confirm from "../../../Utils/Confirm";

const EncomendaItem = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	if (props.produtos.produtos.length === 0) return null;

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const productName = (id) => {
		return props.produtos.produtos.filter(p => {
				return p.id === id ? p : null
			}
		)
	};

	const {product, quantity, due_date, _id} = props.encomenda;

	const prodInfo = productName(product)[0];

	if (!prodInfo) return null;

	return (
		<div className={"list-group-item "}>
			<div className={"row"}>
				<div className={"col-11"}>
					<div className={"row"}>
						<p className={"col"}>{prodInfo.descricao.value}</p>
						<p className={"col"}>{quantity}</p>
						<p className={"col"}>{moment(due_date).format("DD-MM-YYYY")}</p>
					</div>
				</div>
				{
					props.delete && props.auth.user.type === "Admin" ?
					<div className={"col-1"}>
						<Confirm isOpen={isOpen} toggle={toggle} onConfirm={() => {
							this.props.deleteEncomenda(_id);
						}}/>
					</div> : null
				}
			</div>
		</div>
	);
};

//PropTypes 
EncomendaItem.propTypes = {
	encomenda: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
	auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		produtos: state.produtos,
		auth: state.auth
	}
}

export default connect(mapStateToProps, {deleteEncomenda})(EncomendaItem); 
