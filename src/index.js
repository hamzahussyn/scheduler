"use strict";

const { PEOPLE_MOCK } = require("./mock/people");
const { DAYS } = require("./enum/days");
const { getRandomIndex } = require("./utils/randomizer");
const { AVAILAIBILITY_MOCK } = require("./mock/availaibility");

function updateNextShiftArray(index, daysArray, filterElem) {
  if (index == 6) {
    return new Array();
  }

  let curDay = daysArray[index + 1];
  return AVAILAIBILITY_MOCK[curDay].day.filter((_) => _ !== filterElem);
}

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
  let shiftArray = new Array();
  let nextShiftArray = new Array();
  let availaibilityArray = new Array();
  const pIds = PEOPLE_MOCK.map((_) => _.id);
  const daysArray = Object.values(DAYS);

  for (let i = 0; i < daysArray.length; i++) {
    let shift = { day: "", night: "" };
    let currentDay = daysArray[i];

    // if (i == 0) {
    //   availaibilityArray = AVAILAIBILITY_MOCK[currentDay].day
    //   let indexDay = getRandomIndex(availaibilityArray.length - 1);
    //   shift.day = pIds[indexDay];
    //   nextShiftArray = pIds.filter((_) => _ !== pIds[indexDay]);

    //   let indexNight = getRandomIndex(nextShiftArray.length - 1);
    //   shift.night = nextShiftArray[indexNight];
    //   nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexNight]);
    // } else {
    //   let indexDay = getRandomIndex(nextShiftArray.length - 1);
    //   shift.day = nextShiftArray[indexDay];
    //   nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexDay]);

    //   let indexNight = getRandomIndex(nextShiftArray.length - 1);
    //   shift.night = nextShiftArray[indexNight];
    //   nextShiftArray = pIds.filter((_) => _ !== nextShiftArray[indexNight]);
    // }

    const dayAvailaibility = AVAILAIBILITY_MOCK[currentDay].day;
    const nightAvailaibility = AVAILAIBILITY_MOCK[currentDay].night;

    if (i == 0) {
      let indexD = getRandomIndex(dayAvailaibility.length - 1);
      shift.day = dayAvailaibility[indexD];

      shiftArray = nightAvailaibility.filter(
        (_) => _ !== dayAvailaibility[indexD]
      );

      let indexN = getRandomIndex(shiftArray.length - 1);
      shift.night = shiftArray[indexN];

      nextShiftArray = updateNextShiftArray(i, daysArray, shiftArray[indexN]);
    } else {
      let indexD = getRandomIndex(nextShiftArray.length - 1);
      shift.day = nextShiftArray[indexD];

      shiftArray = nightAvailaibility.filter(
        (_) => _ !== nextShiftArray[indexD]
      );

      let indexN = getRandomIndex(shiftArray.length - 1);
      shift.night = shiftArray[indexN];

      nextShiftArray = updateNextShiftArray(i, daysArray, shiftArray);
    }

    schedule[currentDay] = shift;
  }

  return populate(schedule);
}

const res = main();
console.log(res);
