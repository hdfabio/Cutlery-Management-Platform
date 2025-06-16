import PropTypes from "prop-types";
import React, {useState} from "react";
import {connect} from "react-redux";
import {Collapse} from "reactstrap";
import {adminUpdateUser} from "../../../actions/authActions";

const ClienteItem = (props) => {
	const {user} = props;
	const [isOpen, setIsOpen] = useState(false);

	const [nome, setNome] = useState(user.name);
	const [endereco, setEndereco] = useState("");

	const toggle = () => setIsOpen(!isOpen);

	const handleSubmit = () => {
		const userObj = {
			_id: user._id,
			name: nome,
			address: endereco
		};

		props.adminUpdateUser(userObj);
		setNome(nome);
		setEndereco("");
		toggle();
	};

	return (
		<div className={"list-group-item d-block"}>
			<div className={"d-flex"}>
				<button className={"btn btn-info mr-2"} onClick={toggle}>
					+
				</button>
				<p className={"my-auto"}>{user.name}</p>
			</div>

			<Collapse isOpen={isOpen}>
				<hr/>
				<div className={"container mt-4"}>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="nome-label">Nome</span>
						</div>
						<input type="text"
						       className="form-control"
						       onChange={e => setNome(e.target.value)}
						       id="descricao"
						       name={"descricao"}
						       value={nome}
						       aria-describedby="Descricao"/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="endereco-label">Endereço</span>
						</div>
						<input type="text"
						       className="form-control"
						       onChange={e => setEndereco(e.target.value)}
						       value={endereco}
						       id="endereco"
						       name={"endereco"}
						       aria-describedby="Endereco"/>
					</div>
					<div className={"button-group float-right"}>
						<button className={"btn btn-success mx-1"} onClick={handleSubmit}>Submit</button>
						<button className={"btn btn-danger mx-1"} onClick={() => {
							setNome("");
							setEndereco("");
							toggle();
						}}>Cancel
						</button>
					</div>
				</div>
			</Collapse>
		</div>
	);
};

ClienteItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default connect(null, {adminUpdateUser})(ClienteItem);
