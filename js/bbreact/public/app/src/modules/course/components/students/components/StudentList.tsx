import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import usePagination from '@hooks/usePagination';
import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	IconButton,
	Input,
	Tab,
	Tabs,
	TabsHeader,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import type { Student } from '@modules/course/models/Student';
import PathConstants from '@routes/pathConstants';
import { Link } from 'react-router-dom';

const TABS = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Monitored',
		value: 'monitored',
	},
	{
		label: 'Unmonitored',
		value: 'unmonitored',
	},
];

const TABLE_HEAD = ['Member', 'Function', 'Status', 'Employed', ''];

const TABLE_ROWS = [
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
	},
];

type StudentListProps = {
	students: Student[];
};

const StudentList = (props: StudentListProps) => {
	const { students } = props;

	const { currentItems, currentPage, totalPages, goToNextPage, goToPrevPage } = usePagination(
		students,
		{
			itemsPerPage: 1,
		}
	);

	return (
		<Card className="h-full w-full">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-8 flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							Students list
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See information about all students
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button variant="outlined" size="sm">
							view all
						</Button>
						<Link to={PathConstants.CREATE_STUDENT}>
							<Button className="flex items-center gap-3" size="sm">
								<UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add student
							</Button>
						</Link>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab className="px-2" key={value} value={value}>
									{label}
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
					<div className="w-full md:w-72">
						<Input
							label="Search"
							icon={<MagnifyingGlassIcon className="h-5 w-5" />}
							crossOrigin=""
						/>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head, index) => (
								<th
									key={head}
									className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
									>
										{head}{' '}
										{index !== TABLE_HEAD.length - 1 && (
											<ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
										)}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentItems.map((student, index) => {
							const isLast = index === TABLE_ROWS.length - 1;
							const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

							return (
								<tr key={student.id}>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<Avatar src={TABLE_ROWS[index].img} alt={student.fullName} size="sm" />
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{student.fullName}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{student.email}
												</Typography>
											</div>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography variant="small" color="blue-gray" className="font-normal">
												{student.guardianName}
											</Typography>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal opacity-70"
											>
												{student.guardianMobile}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="w-max">
											{/* <Chip
                        variant="ghost"
                        size="sm"
                        value={online ? "online" : "offline"}
                        color={online ? "green" : "blue-gray"}
                      /> */}
										</div>
									</td>
									<td className={classes}>
										<Typography variant="small" color="blue-gray" className="font-normal">
											here
										</Typography>
									</td>
									<td className={classes}>
										<Tooltip content="Edit Student">
											<IconButton variant="text">
												<PencilIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between  p-4">
				<Typography variant="small" color="blue-gray" className="font-normal">
					Page {currentPage} of {totalPages}
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" size="sm" onClick={goToPrevPage}>
						Previous
					</Button>
					<Button variant="outlined" size="sm" onClick={goToNextPage}>
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default StudentList;
