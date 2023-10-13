/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";

import { classNames } from "../utils";

export type AlertType = "error" | "success" | "info" | "warning";

export type AlertData = {
	content: string | (() => React.ReactNode);
	type: AlertType;
	timeout?: number;
};

export function alertData(
	type: AlertType,
	content: string | (() => React.ReactNode),
	timeout?: number
): AlertData {
	return { type, content, timeout };
}

type Props = {
	children?: React.ReactNode;
	className?: string;
	onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
	size?: "sm" | "lg";
	type: AlertType;
	isBanner?: boolean;
};

export function Alert(props: Props) {
	if (props.children === undefined) {
		return null;
	}

	const classes = classNames([
		"alert mod-" + props.type,
		props.size && `mod-${props.size}`,
		props.className,
	]);

	const iconClasses = classNames([
		"svg-icon",
		"mod-cross",
		props.type !== "warning" && "mod-white",
	]);

	let close;
	const closeClasses = classNames(["alert-close", props.isBanner && "banner"]);
	const closeIconClasses = classNames(["alert-close-icon", props.isBanner && "banner"]);
	if (props.onClose) {
		close = (
			<div className={closeClasses} onClick={props.onClose}>
				<div className={closeIconClasses}>
					<i className={iconClasses} />
				</div>
			</div>
		);
	}

	if (props.isBanner) {
		return (
			<div className={classes}>
				<div className="alert-content banner">
					<div className="container alert-content-container">
						<div>{props.children}</div>
						{close}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classes}>
			<div className="alert-content">{props.children}</div>
			{close}
		</div>
	);
}
