export function validateStringLength(
  value: string,
  fieldName: string,
  min: number,
  max: number,
): true | string {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return `${fieldName} must not be empty.`;
  }

  if (trimmed.length < min) {
    return `${fieldName} must be at least ${min} ${min === 1 ? "character" : "characters"} long.`;
  }

  if (trimmed.length > max) {
    return `${fieldName} must not exceed ${max} characters.`;
  }

  return true;
}
export function validateNpmPackageName(rawName: string): true | string {
  const name = rawName.trim();
  const lengthValidation = validateStringLength(name, "Name", 1, 214);
  if (lengthValidation !== true) {
    return lengthValidation;
  }

  if (!/^[a-z0-9~][a-z0-9_.~-]*$/.test(name)) {
    return "The name may only contain lowercase letters, numbers, hyphens (-), dots (.), and underscores (_).";
  }

  return true;
}

export function validateNpmScope(rawScope: string): true | string {
  const scope = rawScope.trim();
  const lengthValidation = validateStringLength(scope, "Scope", 2, 214);
  if (lengthValidation !== true) {
    return lengthValidation;
  }

  if (!scope.startsWith("@")) {
    return "The scope must start with an @ (e.g. @christian).";
  }

  const scopeName = scope.slice(1);
  if (!/^[a-z0-9~][a-z0-9_.~-]*$/.test(scopeName)) {
    return "The scope may only contain lowercase letters, numbers, hyphens (-), dots (.), and underscores (_).";
  }

  return true;
}

export const validateNpmPackageScope = validateNpmScope;
