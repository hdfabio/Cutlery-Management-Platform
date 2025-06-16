import React, {Component} from 'react';
import PlanoFabrica from "../GraphViz/PlanoFabrica";

class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1>Plano da Fábrica:</h1>
				<PlanoFabrica/>
				<hr/>
				<h3 className={"text-warning"}>Legenda:</h3>
				<p>Scroll to zoom, drag to rotat</p>
			</div>
		);
	}
}

Dashboard.propTypes = {};

export default Dashboard;
