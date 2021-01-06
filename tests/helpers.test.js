import {
	sortAscByABC,
	sortByField,
	determineJobStatus,
} from "../client/src/util/helpers";

describe("Client side helper functions", () => {
	test("sortAscByABC sorts array of objects ascending by abc", () => {
		const arrayToSort = [
			{ foo: "z", bar: "a" },
			{ foo: "a", bar: "z" },
		];
		const sortedArray = [
			{ foo: "a", bar: "z" },
			{ foo: "z", bar: "a" },
		];
		expect(sortAscByABC(arrayToSort, "foo")).toStrictEqual(sortedArray);
	});

	test("sortAscByABC sorts array of objects descending by ABC case insensitive", () => {
		const arrayToSort = [
			{ foo: "z", bar: "Z" },
			{ foo: "a", bar: "a" },
		];
		const sortedArray = [
			{ foo: "a", bar: "a" },
			{ foo: "z", bar: "Z" },
		];
		expect(sortAscByABC(arrayToSort, "bar")).toStrictEqual(sortedArray);
	});

	test("sortByField sorts array of objects by 'foo' field in ascending order", () => {
		const arrayToSort = [{ foo: "Z" }, { foo: "a" }];
		const sortedArray = [{ foo: "a" }, { foo: "Z" }];
		expect(sortByField(arrayToSort, "foo", true)).toStrictEqual(sortedArray);
	});

	test("sortByField sorts array of objects by 'foo' field in descending order", () => {
		const arrayToSort = [{ foo: "a" }, { foo: "Z" }];
		const sortedArray = [{ foo: "Z" }, { foo: "a" }];
		expect(sortByField(arrayToSort, "foo", false)).toStrictEqual(sortedArray);
	});

	test("sortByField sorts array of objects by 'num' field in descending order", () => {
		const arrayToSort = [
			{ foo: "Z", num: 1 },
			{ foo: "a", num: 2 },
		];
		const sortedArray = [
			{ foo: "a", num: 2 },
			{ foo: "Z", num: 1 },
		];
		expect(sortByField(arrayToSort, "num", false)).toStrictEqual(sortedArray);
	});

	test("sortByField sorts array of objects by 'num' field in ascending order", () => {
		const arrayToSort = [
			{ foo: "Z", num: 2 },
			{ foo: "a", num: 1 },
		];
		const sortedArray = [
			{ foo: "a", num: 1 },
			{ foo: "Z", num: 2 },
		];
		expect(sortByField(arrayToSort, "num", true)).toStrictEqual(sortedArray);
	});

	test("", () => {});

	test("determineJobStatus() works as expected", () => {
		// taken from https://codewithhugo.com/mocking-the-current-date-in-jest-tests/
		jest
			.spyOn(global.Date, "now")
			.mockImplementationOnce(() =>
				new Date("2021-01-06T11:01:58.135Z").valueOf()
			);

		expect(determineJobStatus(0, "2021-01-05")).toBe("missed");
		expect(determineJobStatus(0, "2021-01-06")).toBe("awaiting");
		expect(determineJobStatus(0, "2020-01-01")).toBe("missed");
		expect(determineJobStatus(1, "2020-01-05")).toBe("completed");
		expect(determineJobStatus(1, "2020-01-07")).toBe("completed");
	});
});
