import { Duration } from "luxon";

export const formatDuration = (hours = 0, minutes = 0) => {
	return Duration.fromObject({
		hours,
		minutes,
	})
		.shiftTo("hours", "minutes")
		.toObject();
};
