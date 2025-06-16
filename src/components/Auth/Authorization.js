import React from "react";

export const Authorization = (allowedRoles, user) => {
	return (WrappedComponent) => {
		return class WithAuthorization extends React.Component {
			render() {
				if (user) {
					const {type} = user;

					if (allowedRoles.includes(type)) {
						return <WrappedComponent {...this.props} />;
					}
				}
				return <h1>No page for you!</h1>;
			}
		}
	}
};
