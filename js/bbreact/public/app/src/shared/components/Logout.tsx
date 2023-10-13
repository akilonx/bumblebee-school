import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	signOut?: () => void;
};

export const Logout = (props: Props) => {
	const { signOut } = props;

	const navigate = useNavigate();

	const signOutUser = async () => {
		signOut && (await signOut());
		navigate("/");
	};

	useEffect(() => {
		signOutUser();
	}, []);

	return <div>logging out...</div>;
};
