import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {deleteUser} from "../../../actions/authActions";
import EditProfile from "./EditProfile";

class Profile extends React.Component {
	state = {};

	render() {
		const {user} = this.props.auth;
		return (
			<div className='profile'>
				<div>
					<div className={"profile-header"}>
						<div className={user.type}>
							<Link to='/profile'>
								<img src={user.avatar} alt='User Avatar'/>
							</Link>
						</div>
					</div>


					<h3 className='label'>{user.name}</h3>
					<p className='register_date label'>
						User since: {moment(user.register_date)
						.format('DD-MM-YYYY')}
					</p>
				</div>
				<hr/>
				<div className='body-profile'>
					<EditProfile/>
				</div>

				<div className='sticky-bottom mb-1'>
					<hr/>
					<button className='btn btn-danger' onClick={() => {
						this.props.deleteUser()
					}}>Delete Account
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	entries: state.entries,
	sl_entries: state.sl_entries,
	items: state.items
});

export default connect(mapStateToProps, {deleteUser})(Profile);
