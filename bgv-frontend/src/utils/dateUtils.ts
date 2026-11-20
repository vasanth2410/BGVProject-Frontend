/**
 * Date and Time Utilities for BGV System
 *
 * Guarantees consistent Indian Standard Time (IST, Asia/Kolkata, UTC+05:30)
 * formatting across the application while preserving backend UTC storage.
 */

const IST_TIMEZONE = "Asia/Kolkata";
const IST_LOCALE = "en-IN";

/**
 * Parses a backend timestamp into a valid Date object.
 *
 * Background:
 * The backend stores point-in-time timestamps in UTC using SQL Server datetime2.
 * When EF Core reads datetime2, it materializes the value with DateTimeKind.Unspecified.
 * System.Text.Json serializes this without a timezone suffix (e.g. "2026-11-19T13:30:00").
 * Per ECMA-262, JavaScript parses ISO date-time strings without timezone designators as LOCAL time.
 * This function recognizes strings with time components lacking a timezone indicator and safely
 * appends 'Z' to treat them as UTC, while preserving strings that already contain 'Z' or an offset.
 */
export function parseUtcTimestamp(input?: string | Date | null): Date | null {
  if (input === null || input === undefined) {
    return null;
  }

  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input;
  }

  if (typeof input !== "string") {
    return null;
  }

  const trimmed = input.trim();
  if (trimmed === "") {
    return null;
  }

  // Check if string contains a time component (e.g., "T13:30" or " 13:30")
  const hasTimeComponent = /[T\s]\d{1,2}:\d{2}/.test(trimmed);

  if (hasTimeComponent) {
    // Check if a timezone offset or 'Z' is already present at the end of the time component.
    // e.g. "Z", "+05:30", "-04:00", "+0530"
    const hasTimezoneOffset = /(?:Z|[+-]\d{2}(?::?\d{2})?)$/i.test(trimmed);

    if (hasTimezoneOffset) {
      const parsed = new Date(trimmed);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    // Normalize space separator to ISO 'T' and append 'Z' for UTC interpretation
    const normalized = trimmed.replace(" ", "T") + "Z";
    const parsed = new Date(normalized);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  // Pure date-only string (e.g. "YYYY-MM-DD") or other format
  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Formats a point-in-time UTC timestamp into Indian Standard Time (IST) date and time.
 *
 * Example output: "19 Nov 2026, 7:00:00 pm"
 */
export function formatToISTDateTime(
  input?: string | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = parseUtcTimestamp(input);
  if (!date) return "N/A";

  // If custom date/time components are specified, do not include dateStyle/timeStyle
  // because ECMA-402 Intl prohibits mixing dateStyle/timeStyle with day/month/year/hour/minute/second.
  const hasCustomComponents =
    options &&
    Boolean(
      options.day ||
        options.month ||
        options.year ||
        options.hour ||
        options.minute ||
        options.second ||
        options.weekday
    );

  const defaultOptions: Intl.DateTimeFormatOptions = hasCustomComponents
    ? { timeZone: IST_TIMEZONE }
    : {
        timeZone: IST_TIMEZONE,
        dateStyle: "medium",
        timeStyle: "medium",
      };

  return date.toLocaleString(IST_LOCALE, { ...defaultOptions, ...options });
}

/**
 * Formats a point-in-time UTC timestamp into Indian Standard Time (IST) date only.
 *
 * Example output: "19 Nov 2026"
 */
export function formatToISTDate(
  input?: string | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = parseUtcTimestamp(input);
  if (!date) return "N/A";

  const hasStyle = options && Boolean(options.dateStyle || options.timeStyle);

  const defaultOptions: Intl.DateTimeFormatOptions = hasStyle
    ? { timeZone: IST_TIMEZONE }
    : {
        timeZone: IST_TIMEZONE,
        day: "numeric",
        month: "short",
        year: "numeric",
      };

  return date.toLocaleDateString(IST_LOCALE, { ...defaultOptions, ...options });
}

/**
 * Formats calendar date-only fields (e.g., Date of Birth, Date of Joining)
 * without performing any timezone conversions that could shift the calendar date.
 *
 * Example: "1995-05-15" or "1995-05-15T00:00:00" -> "15 May 1995"
 */
export function formatDateOnly(
  input?: string | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (input === null || input === undefined) return "N/A";

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return "N/A";

    // Match leading YYYY-MM-DD
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);

      // Construct a UTC Date at 12:00:00 noon to avoid any timezone boundary shifting
      const noonDate = new Date(Date.UTC(year, month, day, 12, 0, 0));
      return noonDate.toLocaleDateString(IST_LOCALE, {
        timeZone: IST_TIMEZONE,
        day: "numeric",
        month: "short",
        year: "numeric",
        ...options,
      });
    }
  }

  const fallbackDate = parseUtcTimestamp(input);
  if (!fallbackDate) return "N/A";

  return fallbackDate.toLocaleDateString(IST_LOCALE, {
    timeZone: IST_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
}

