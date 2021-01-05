import {
	intToHours,
	countVisitEnd,
	formatHours,
	countActualDuration,
} from "../server/util/formatJobs";

describe("Time formatting functions", () => {
	test("intToHours returns null if argument is missing, null or 0", () => {
		expect(intToHours()).toBe(null);
		expect(intToHours(null)).toBe(null);
		expect(intToHours(0)).toBe(null);
	});

	test("intToHours converts integer to hours in HH:mm format", () => {
		expect(intToHours(1)).toBe("01:00");
		expect(intToHours(13)).toBe("13:00");
	});

	test("countVisitEnd returns null if duration is missing", () => {
		expect(countVisitEnd("15:30", null)).toBe(null);
		expect(countVisitEnd("15:30")).toBe(null);
	});

	test("countVisitEnd adds duration to time correctly", () => {
		expect(countVisitEnd("15:30", 1)).toBe("16:30");
		expect(countVisitEnd("11:30", 3)).toBe("14:30");
		expect(countVisitEnd("23:30", 1)).toBe("00:30");
	});

	test("formatHours returns null if time is missing", () => {
		expect(formatHours()).toBe(null);
	});

	test("formatHours formats HH:mm:ss to HH:mm", () => {
		expect(formatHours("15:30")).toBe("15:30");
		expect(formatHours("15:30:24")).toBe("15:30");
		expect(formatHours("00:00:54")).toBe("00:00");
	});

	test("countActualDuration returns null if start or end time is missing", () => {
		expect(countActualDuration()).toBe(null);
		expect(countActualDuration("12:00")).toBe(null);
		expect(countActualDuration(null, "12:00")).toBe(null);
	});

	test("countActualDuration counts duration correctly", () => {
		expect(countActualDuration("12:00", "13:00")).toBe("01:00");
		expect(countActualDuration("10:00", "12:00")).toBe("02:00");
		expect(countActualDuration("13:45", "15:05")).toBe("01:20");
		expect(countActualDuration("23:45", "01:05")).toBe("01:20");
		expect(countActualDuration("23:00", "01:00")).toBe("02:00");
		expect(countActualDuration("23:59", "00:00")).toBe("00:01");
		expect(countActualDuration("00:01", "00:02")).toBe("00:01");
		expect(countActualDuration("00:02", "00:02")).toBe("00:00");
	});
});
