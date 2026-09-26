export type ProjectType =
  | "gcp-infrastructure"
  | "node-project"
  | "lib"
  | "server";

export type Template = {
  name: string;
  type: ProjectType;
  folders: {
    target: string;
    config: string;
    files: string;
  };
};
export type NPMInstall = { dependencies: string[]; devDependencies: string[] };

export type NPMPackageParams = Record<string, string>;

export function isNpmPackageParams(value: unknown): value is NPMPackageParams {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return Object.values(candidate).every((val) => typeof val === "string");
}

export function isNpmInstall(value: unknown): value is NPMInstall {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    Array.isArray(candidate.dependencies) &&
    candidate.dependencies.every((dep) => typeof dep === "string") &&
    Array.isArray(candidate.devDependencies) &&
    candidate.devDependencies.every((dep) => typeof dep === "string")
  );
}
