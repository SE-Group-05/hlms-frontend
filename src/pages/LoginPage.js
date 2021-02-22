import React, { memo, } from 'react';
import { useHistory } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";

function LoginPage() {
	let history = useHistory();

	function handleLoginSuccess() {
		// localStorage.setItem('roles', JSON.stringify(selected));
		history.push('/app');
	}

	return (
		<>
			<LoginForm handleLoginSuccess={handleLoginSuccess}/>
		</>
	);
}

export default memo(LoginPage);
