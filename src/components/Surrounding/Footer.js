import {faFacebook,} from '@fortawesome/free-brands-svg-icons';
import {faUniversity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from 'react';

class Footer extends Component {

	render() {
		return (

			<footer className='footer fixed-bottom'>
				<div>
					<a
						id={"linkFacebook"}
						href='https://www.facebook.com/isep.pporto/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FontAwesomeIcon className='icon' icon={faFacebook} size='2x'/>
					</a>
					<a
						id={"linkPaginaIsep"}
						href='https://isep.ipp.pt/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FontAwesomeIcon className='icon' icon={faUniversity} size='2x'/>
					</a>
				</div>
				<p>MyOwnCuttlery® 2019</p>
			</footer>
		)
			;
	}

}

Footer.propTypes = {};

export default Footer;
