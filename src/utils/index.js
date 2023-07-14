/**
 *
 * @param hoursMinutes
 * @return timerMinutter as float
 */
export function getHoursMinutesFloat(hoursMinutes) {
  let min = parseFloat(hoursMinutes.substring(3)) / 60;
  let hour = parseInt(hoursMinutes.substring(0, 2));
  let result = hour + min;
  return result;
}
/**
 * @param hoursMinutesStr as 24hour clock
 * @param roundToMinutes the number of minutes to round to
 * @return rounded hoursMinutes as float
 */
export function roundHoursMinutesFloat(hoursMinutesStr, roundToMinutes) {
  let roundTo = (1.0 * roundToMinutes) / 60;
  let result = Math.round(hoursMinutesStr / roundTo) * roundTo;
  return result;
}

/**
 * Strengene er på formatet tt:mm. Returnerer positiv timedifferanse - pause der hvor det er gyldig
 *
 * @param hourMinStart
 * @param hourMinEnd
 * @param hourMinBreak1Start - tom streng angir at denne pausen ikke er i bruk
 * @param hourMinBreak2Start - tom streng angir at denne pausen ikke er i bruk
 * @param breakAsFloat
 * @param roundToAsFloat oppgitt på formatet 0.5 = 1/2 time, 0.1 = 6 minutter.
 * @param roundBiasAsFloat oppgitt på formatet 0.5 = 1/2 time.
 * @return
 */
export function getWorkHours(
  hourMinStart,
  hourMinEnd,
  hourMinBreak1Start,
  hourMinBreak2Start,
  breakAsFloat,
  roundToAsFloat,
  roundBiasAsFloat
) {
  let result = 0;
  if (
    !hourMinStart ||
    hourMinStart.startsWith("-") ||
    !hourMinEnd ||
    hourMinEnd.startsWith("-")
  ) {
    return result;
  }
  let dStartMin = parseFloat(hourMinStart.substring(3)) / 60;
  let dSluttMin = parseFloat(hourMinEnd.substring(3)) / 60;
  let dStart = parseInt(hourMinStart.substring(0, 2)) + dStartMin;
  let dSlutt = parseInt(hourMinEnd.substring(0, 2)) + dSluttMin;
  if (dSlutt < dStart) {
    dSlutt += 24;
  }
  if (dSlutt > dStart) {
    let dBeregnetPause = 0;
    if (!hourMinBreak1Start || hourMinBreak1Start == "") {
      // nada - pause ikke definert
    } else {
      dBeregnetPause =
        getBreak(dStart, dSlutt, hourMinBreak1Start, breakAsFloat) +
        getBreak(dStart, dSlutt, hourMinBreak2Start, breakAsFloat);
    }
    let dBeregnet = dSlutt - dStart - dBeregnetPause - roundBiasAsFloat;
    result = Math.round(dBeregnet / roundToAsFloat) * roundToAsFloat;
  }
  return result;
}
export function getBreak(dStart, dSlutt, strBreakStart, dPause) {
  let usePause = typeof dPause == "string" ? parseFloat(dPause) : dPause;
  let result = usePause;
  let dPauseStart = 0;
  if (strBreakStart) {
    if (usePause > 0) {
      let dPauseStartMin = parseFloat(strBreakStart.substring(3)) / 60;
      dPauseStart = parseInt(strBreakStart.substring(0, 2)) + dPauseStartMin;
      if (dStart >= dPauseStart + usePause || dSlutt <= dPauseStart) {
        result = 0;
      }
    }
  } else {
    result = 0;
  }
  console.log(
    "getBreak(" +
      dStart +
      ", " +
      dSlutt +
      ", " +
      strBreakStart +
      ", " +
      dPause +
      ") == " +
      result +
      " type: " +
      typeof result +
      " dPauseStart: " +
      dPauseStart
  );
  return result;
}
/**
 * Strengene er på formatet tt:mm. Returnerer positiv timedifferanse - pause der hvor det er gyldig
 *
 * @param hourMinStart
 * @param hourMinEnd
 * @param hourMinBreak1Start - tom streng angir at denne pausen ikke er i bruk
 * @param hourMinBreak2Start - tom streng angir at denne pausen ikke er i bruk
 * @param breakAsFloat
 * @param roundToAsFloat oppgitt på formatet 0.5 = 1/2 time, 0.1 = 6 minutter.
 * @param roundBiasAsFloat oppgitt på formatet 0.5 = 1/2 time.
 * @return
 */
export function getBreakHours(
  hourMinStart,
  hourMinEnd,
  hourMinBreak1Start,
  hourMinBreak2Start,
  breakAsFloat,
  roundToAsFloat,
  roundBiasAsFloat
) {
  let result = 0;
  if (
    !hourMinStart ||
    hourMinStart.startsWith("-") ||
    !hourMinEnd ||
    hourMinEnd.startsWith("-")
  ) {
    return result;
  }
  let dStartMin = parseFloat(hourMinStart.substring(3)) / 60;
  let dSluttMin = parseFloat(hourMinEnd.substring(3)) / 60;
  let dStart = parseInt(hourMinStart.substring(0, 2)) + dStartMin;
  let dSlutt = parseInt(hourMinEnd.substring(0, 2)) + dSluttMin;
  if (dSlutt < dStart) {
    // dersom dette går over midnatt...
    dSlutt += 24;
  }
  if (dSlutt > dStart) {
    let dBeregnet = getWorkHours(
      hourMinStart,
      hourMinEnd,
      hourMinBreak1Start,
      hourMinBreak2Start,
      breakAsFloat,
      roundToAsFloat,
      roundBiasAsFloat
    );
    result = dSlutt - dStart - dBeregnet;
    console.log(
      "getBreakHours.dBeregnet: " + dBeregnet + ", result: " + result
    );
  }
  return result;
}
