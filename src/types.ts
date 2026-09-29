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

export type NpmConfigurationEntry = {
  key: string;
  value: string;
};

export type ServerConfig = {
  app: { name: string; domain: string };
  user: { name: string; email: string };
  googleCloud: {
    location: string;
    projectId: string;
    repository: { scope: string; name: string };
    clientId: string;
    bucketName: string;
  };
};

// Relative to target directory
export type FilesWithStringReplacements = {
  filesWithStringReplacements: string[];
};

export function isFilesWithStringReplacements(
  value: unknown,
): value is FilesWithStringReplacements {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    Array.isArray(candidate.filesWithStringReplacements) &&
    candidate.filesWithStringReplacements.every(
      (dep) => typeof dep === "string",
    )
  );
}

type Placeholders =
  | "Scope"
  | "Location"
  | "Project"
  | "Repository"
  | "AppName"
  | "ClientId"
  | "BucketName"
  | "Domain"
  | "User"
  | "Email";

export type Replacements = Partial<Record<Placeholders, string>>;
