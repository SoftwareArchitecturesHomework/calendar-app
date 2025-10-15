<script setup lang="ts">
import type { CalendarEvent } from 'vuetify/lib/labs/VCalendar/types.js';

function calendarDate(d: Date) {
	const Y = d.getFullYear();
	const M = (d.getMonth() + 1)
		.toString()
		.padStart(2, '0');
	const D = d
		.getDate()
		.toString()
		.padStart(2, '0');
	const h = d
		.getHours()
		.toString()
		.padStart(2, '0');
	const m = d
		.getMinutes()
		.toString()
		.padStart(2, '0');

	return `${Y}-${M}-${D} ${h}:${m}`;
}

function timeRange(
	minutes: number,
	start: Date = new Date(),
): { start: string; end: string } {
	const end = new Date(start);
	end.setMinutes(end.getMinutes() + minutes);
	return {
		start: calendarDate(start),
		end: calendarDate(end),
	};
}

const events: CalendarEvent[] = [
	{
		name: 'Today',
		color: 'blue',
		...timeRange(60),
	},
	{
		name: 'Meeting',
		color: 'green',
		...timeRange(120),
	},
	{
		name: 'Lunch',
		color: 'red',
		...timeRange(
			30,
			new Date(new Date().setHours(12, 0, 0, 0)),
		),
	},
	{
		name: 'Dinner',
		color: 'purple',
		...timeRange(
			90,
			new Date(new Date().setHours(18, 0, 0, 0)),
		),
	},
	{
		name: 'Workout',
		color: 'orange',
		...timeRange(
			60,
			new Date(new Date().setHours(17, 0, 0, 0)),
		),
	},
];

const calendar = ref();

let updateInterval = -1;
onMounted(() => {
	scrollToTime();
	updateInterval = setInterval(
		() => calendar.value.updateTimes(),
		60_000,
	);
});

onUnmounted(() => {
	clearInterval(updateInterval);
});

function getCurrentTime() {
	return calendar.value
		? calendar.value.times.now.hour * 60 +
				calendar.value.times.now.minute
		: 0;
}
function scrollToTime() {
	const time = getCurrentTime();
	const first = Math.max(
		0,
		time - (time % 30) - 30,
	);
	calendar.value.scrollToTime(first);
}

function nowY() {
	return calendar.value
		? calendar.value.timeToY(
				calendar.value.times.now,
		  ) + 'px'
		: '-10px';
}
</script>

<template>
	<VCalendar
		ref="calendar"
		:events
		:show-week-numbers="true"
		type="week"
		class="w-screen h-screen"
		@click:date="
			date => console.log('Date clicked:', date)
		"
		@click:event="
			event =>
				console.log('Event clicked:', event)
		"
	>
		<template v-slot:day-body="{ date, week }">
			<div
				class="bg-red-500 h-0.5 absolute -left-[1px] right-0 pointer-events-none [.first]:before:content-[''] [.first]:before:absolute [.first]:before:bg-red-500 [.first]:before:size-3 [.first]:before:rounded-full [.first]:before:-mt-[5px] [.first]:before:-ml-[6.5px]"
				:class="{ first: date === week[0]!.date }"
				:style="{ top: nowY() }"
			></div>
		</template>
	</VCalendar>
</template>
