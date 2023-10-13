import React from "react";

import { classNames } from "../utils";
import { Alert } from "./Alert";

export type TableProps = {
	children?: React.ReactNode;
	className?: string;
	condensed?: boolean;
	fixed?: boolean;
	keys: Array<string | (() => React.ReactNode)>;
	headers?: React.ReactNode;
	responsive?: "stacked" | "overflow";
	striped?: boolean;
	t?: Translator;
};

export function Table(props: TableProps) {
	const keys = props.keys;

	/* if (keys.length === 0) {
		return null;
	} */

	const tkeys = keys.map(
		(key) =>
			(key && props.t && typeof key === "string"
				? !props.t
					? key
					: key.includes(".")
						? props.t(key)
						: props.t("label." + key)
				: key) || ""
	);

	const className = classNames([
		"table",
		props.responsive === "stacked" && "mod-stacked",
		props.fixed && " mod-fixed",
		props.striped && " mod-striped",
		props.condensed && " mod-condensed",
		props.className && ` ${props.className}`,
	]);

	let table = (
		<div className="relative overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="table flex flex-col w-full">
				<div className="py-2 inline-block w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden">
						<table className={`min-w-full border text-center ${props.className ?? ""}`}>
							{keys?.length > 0 && (
								<thead className="border-b">
									<tr>
										{props.headers
											? props.headers
											: keys.map((key, i) => {
												const header = tkeys[i];
												return (
													<th
														key={`${key}-${i}`}
														className="text-lg font-bold text-gray-900 px-3 py-3 border-r text-left"
													>
														{typeof header === "function" ? header() : header}
													</th>
												);
											  })}
									</tr>
								</thead>
							)}
							<tbody>{props.children}</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);

	if (props.responsive === "overflow") {
		table = <div className="table_overflow">{table}</div>;
	}

	return table;
}

export type DataTableProps = {
	keys: string[];
	data: any[];
} & Omit<TableProps, "keys">;

export function DataTable(props: DataTableProps) {
	const keys = props.keys;

	if (keys.length === 0) {
		return null;
	}

	const tkeys = keys.map((key) => (key && props.t ? props.t("label." + key) : key));
	const rows = props.data.map((item, i) => (
		<tr key={i} className="border-b">
			{keys.map((key, j) => (
				<td
					key={key}
					data-label={tkeys[j]}
					className="text-lg text-gray-900 font-light px-6 py-8 whitespace-nowrap border-r text-left"
				>
					{item[key]}
				</td>
			))}
		</tr>
	));

	return <Table {...props}>{rows}</Table>;
}

// PureTable is a good fit when you need to show a table with a lot of data
// that does not change often. For more info about PureComponent check out
// the react docs https://reactjs.org/docs/react-api.html#reactpurecomponent
export class PureTable extends React.PureComponent<DataTableProps, {}> {
	render() {
		return <DataTable {...this.props} />;
	}
}

export type TableStatusWrapperProps = {
	cols: number;
	loading?: boolean;
	error?: boolean;
	t: Translator;
	children?: React.ReactNode;
};
// Simple wrapper for the <Table /> contents that displays an inline error message
// when the data could not be loaded, or a loading indicator when it's pending
export const TableStatusWrapper: React.FC<TableStatusWrapperProps> = (props) => {
	const { cols, error, loading, children, t } = props;
	return !error && !loading ? (
		<>{children}</>
	) : (
		<tr>
			<td colSpan={cols}>
				{error ? (
					<Alert type="error">{t("error.unknown_error")}</Alert>
				) : (
					<div className="p-div mod-thin" />
				)}
			</td>
		</tr>
	);
};
