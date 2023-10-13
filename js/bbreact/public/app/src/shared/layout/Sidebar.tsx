import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Card, Input, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import PathConstants from "@routes/pathConstants";
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden md:block">
			<div className="p-2">
				<Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" crossOrigin="" />
			</div>
			<List>
				<Link to={PathConstants.STUDENTS}>
					<ListItem>
						<ListItemPrefix>
							<UserIcon className="h-5 w-5" />
						</ListItemPrefix>
						Students
					</ListItem>
				</Link>
				<ListItem>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					Teachers
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Courses
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Settings
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					Log Out
				</ListItem>
			</List>
		</Card>
	);
};

export default SideBar;
