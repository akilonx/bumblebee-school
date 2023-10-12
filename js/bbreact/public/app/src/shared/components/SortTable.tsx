import React, { useCallback, useMemo } from "react";
import { classNames } from "../utils";

export type SortTableHeader =
  | string
  | { key: string; label?: string; passive?: boolean };

export interface SortState {
  key: string;
  order: "asc" | "desc";
}

interface Props {
  className?: string;
  headers?: Array<SortTableHeader>;
  striped?: boolean;
  fixed?: boolean;
  condensed?: boolean;
  t: Translator;
  sort?: SortState;
  onSort?: (sort: SortState) => void;
  children: React.ReactNode;
}

export const SortTable: React.FC<Props> = (props) => {
  const {
    striped,
    fixed,
    condensed,
    children,
    headers,
    sort,
    className,
    t,
    onSort,
  } = props;

  const tableHeaders = useMemo(() => {
    return headers
      ? headers.map((header) =>
          typeof header !== "string"
            ? header
            : {
                key: header,
                passive: true,
              }
        )
      : undefined;
  }, [headers]);

  const tableClassnames = classNames([
    "table",
    "mod-sortable",
    striped && "mod-striped",
    fixed && "mod-fixed",
    condensed && "mod-condensed",
    className,
  ]);

  const iconClassnames = classNames([
    "svg-icon",
    "mod-xs",
    sort?.order === "asc" && "mod-sort-down",
    sort?.order === "desc" && "mod-sort-up",
  ]);

  const headerClick = useCallback(
    (key: string) => {
      onSort &&
        onSort({
          key,
          order: sort?.key === key && sort?.order === "asc" ? "desc" : "asc",
        });
    },
    [onSort, sort]
  );

  return (
    <div className="ut-overflow-x">
      <table className={tableClassnames}>
        {tableHeaders && tableHeaders.length > 0 && (
          <thead>
            <tr>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className={
                    header.passive ? "" : "ut-hover-pointer ut-text-blue"
                  }
                  onClick={
                    header.passive ? undefined : (e) => headerClick(header.key)
                  }
                >
                  {t(
                    header.label
                      ? header.label
                      : header.key === ""
                      ? ""
                      : `label.${header.key}`
                  )}
                  {sort?.key === header.key && (
                    <i className={iconClassnames}></i>
                  )}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
