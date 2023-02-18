"use strict";

const { PEOPLE_MOCK } = require("./mock/people");
const { DAYS } = require("./enum/days");
const { getRandomIndex } = require("./utils/randomizer");

function populate(schedule) {
  let populated = {};
  Object.keys(schedule).forEach((d) => {
    let dayid = schedule[d].day;
    let nightid = schedule[d].night;

    populated[d] = { day: {}, night: {} };
    populated[d].day = PEOPLE_MOCK.find((_) => _.id === dayid);
    populated[d].night = PEOPLE_MOCK.find((_) => _.id === nightid);
  });

  return populated;
}

function main() {
  let schedule = new Object();
  let nextShiftArray = new Array();
  const pIds = PEOPLE_MOCK.map((_) => _.id);
  const daysArray = Object.values(DAYS);

  for (let i = 0; i < daysArray.length; i++) {
    let shift = { day: "", night: "" };
    let currentDay = daysArray[i];

    if (i == 0) {
      let indexDay = getRandomIndex(pIds.length - 1);
      shift.day = pIds[indexDay];
      nextShiftArray = pIds.filter((_) => _ !== pIds[indexDay]);

      let indexNight = getRandomIndex(nextShiftArray.length - 1);
      shift.night = nextShiftArray[indexNight];
      nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexNight]);
    } else {
      let indexDay = getRandomIndex(nextShiftArray.length - 1);
      shift.day = nextShiftArray[indexDay];
      nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexDay]);

      let indexNight = getRandomIndex(nextShiftArray.length - 1);
      shift.night = nextShiftArray[indexNight];
      nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexNight]);
    }

    schedule[currentDay] = shift;
  }

  return populate(schedule);
}

const res = main();
console.log(res);
