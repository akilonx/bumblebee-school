import { classNames } from "../utils";

export type SortOrder = "asc" | "desc";

export interface Sort<T> {
  key: T;
  order: SortOrder;
}

interface Props<T> {
  t?: Translator;
  label?: string;
  headerName: T;
  resort: (value: T) => void;
  sort: Sort<T>;
}

export function SortableTh<T>(props: Props<T>) {
  const { headerName, t, resort, sort, label } = props;

  const iconClasses = classNames([
    "svg-icon",
    "mod-xs",
    sort.order === "asc" && "mod-sort-down",
    sort.order === "desc" && "mod-sort-up",
  ]);

  return (
    <th onClick={(e) => resort(headerName)}>
      <>
        {t ? t(label ? `label.${label}` : `label.${headerName}`) : headerName}
        {sort.key === headerName && <i className={iconClasses} />}
      </>
    </th>
  );
}
