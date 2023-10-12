import { useMemo } from "react";
import { Link } from "react-router-dom";
import { uppercaseFirstLetter } from "../utils/format";

export interface Path {
  href?: string;
  name: string;
  disabled?: boolean;
}

interface Props {
  className?: string;
  paths: Path[];
  router?: boolean;
  t: Translator;
}

export function Breadcrumb(props: Props) {
  const { className, paths, router, t } = props;
  const length = paths.length;
  // const classes = classNames(["breadcrumb", className && className]);

  return (
    <div>
      {paths.map((path, index) => (
        <Crumb
          denominator={length - 1 !== index}
          key={index}
          path={path}
          router={router || false}
          t={t}
        />
      ))}
    </div>
  );
}

interface CrumbProps {
  denominator: boolean;
  path: Path;
  router: boolean;
  t: Translator;
}

function Crumb(props: CrumbProps) {
  const { denominator, path, router, t } = props;

  if (path.href === undefined) {
    return (
      <>
        <span>{t(path.name)}</span>
        {denominator && (
          <i className="svg-icon mod-chevron mod-right path-denominator" />
        )}
      </>
    );
  } else if (router) {
    return (
      <>
        {path.disabled ? (
          t(path.name)
        ) : (
          <Link
            className="path-name link link--hover link--small"
            to={path.href}
          >
            {t(path.name)}
          </Link>
        )}
        {denominator && (
          <i className="svg-icon mod-chevron mod-right path-denominator" />
        )}
      </>
    );
  }
  return (
    <>
      {path.disabled ? (
        t(path.name)
      ) : (
        <a className="path-name link link--hover link--small" href={path.href}>
          {t(path.name)}
        </a>
      )}
      {denominator && (
        <i className="svg-icon mod-chevron mod-right path-denominator" />
      )}
    </>
  );
}

export function generateBreadcrumb(
  url: string,
  visualUrl?: string,
  prefix?: string
) {
  if (prefix) {
    url = url.replace(prefix, "");
  }

  const paths = url.split("/").filter((path) => path !== "");

  let visualPaths: string[] = [];
  if (visualUrl) {
    visualPaths = visualUrl.split("/").filter((path) => path !== "");
  }

  return paths.map((path, index) => {
    let name = path;
    if (visualUrl && paths.length === visualPaths.length) {
      name = visualPaths[index];
    }
    return {
      href: (prefix || "") + url.substring(0, url.indexOf(path) + path.length),
      name: uppercaseFirstLetter(name),
    };
  });
}

export function extendBreadcrumb(
  breadcrumb: Path[],
  path: string | number,
  name?: string,
  description?: string
): Path[] {
  const last =
    breadcrumb.length > 0
      ? breadcrumb[breadcrumb.length - 1]
      : { href: "", name: "" };

  path = path.toString();
  let href = path.startsWith("/") ? path : `${last.href}/${path}`;
  let disabled = false;
  if (path === "") {
    href = ``;
    disabled = true;
  }

  if (!name) {
    name = uppercaseFirstLetter(path);
  }

  if (description) {
    breadcrumb = breadcrumb.concat({ name: description });
  }

  return breadcrumb.concat({ href, name, disabled });
}

export function useBreadcrumb(
  base: Path[],
  path: string | number,
  name?: string,
  description?: string
) {
  return useMemo(() => {
    return extendBreadcrumb(base, path, name, description);
  }, [base, path, name, description]);
}
