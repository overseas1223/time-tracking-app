import { useEffect } from "react";
import { apis } from "../../apis";
import {
  SET_HOURS_PER_MONTH,
  SET_HOURS_PER_WEEK,
  SET_HOUR_REG,
  SET_HOUR_REGS,
  SET_LOADING,
  SET_MY_CONFIG,
  SET_SELFCERTIFIED_HOURS,
  SET_SELFCERTIFIED_HOUR,
  SET_SICK_LEAVES,
  SET_SICK_LEAVE,
  SET_MOVABLE_HOLIDAY_HOURS,
  SET_MOVABLE_HOLIDAY_HOUR
} from "../actionTypes";
import { store } from "../store";

export const fetchHomeData = async () => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: hoursPerWeek } = await apis.getHourWeekGraph();
    store.dispatch({ type: SET_HOURS_PER_WEEK, payload: hoursPerWeek });
    const { data: hoursPerMonth } = await apis.getHourMonthGraph();
    store.dispatch({ type: SET_HOURS_PER_MONTH, payload: hoursPerMonth });
    const { data: myConfig } = await apis.getMyConfig();
    store.dispatch({ type: SET_MY_CONFIG, payload: myConfig });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getHourRegs = async () => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: hourRegs } = await apis.getHourRegs();
    store.dispatch({ type: SET_HOUR_REGS, payload: hourRegs });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getHourRegById = async (id) => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: hourReg } = await apis.getHourReg(id);
    store.dispatch({ type: SET_HOUR_REG, payload: hourReg });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getSelfcertifiedHours = async () => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: selfcertifiedHours } = await apis.getSelfcertifiedHours();
    store.dispatch({
      type: SET_SELFCERTIFIED_HOURS,
      payload: selfcertifiedHours,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getSelfcertifiedHourById = async (id) => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: selfcertifiedHour } = await apis.getSelfcertifiedHour(id);
    store.dispatch({
      type: SET_SELFCERTIFIED_HOUR,
      payload: selfcertifiedHour,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getSickLeaves = async () => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: sickLeaves } = await apis.getSickLeaves();
    store.dispatch({
      type: SET_SICK_LEAVES,
      payload: sickLeaves,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getSickLeaveById = async (id) => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: sickLeave } = await apis.getSickLeave(id);
    store.dispatch({
      type: SET_SICK_LEAVE,
      payload: sickLeave,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getMovableHolidayHours = async () => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: movableHolidayHours } = await apis.getMovableHolidayHours();
    store.dispatch({
      type: SET_MOVABLE_HOLIDAY_HOURS,
      payload: movableHolidayHours,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};


export const getMovableHolidayHourById = async (id) => {
  try {
    store.dispatch({ type: SET_LOADING, payload: true });
    const { data: movableHolidayHour } = await apis.getMovableHolidayHour(id);
    store.dispatch({
      type: SET_MOVABLE_HOLIDAY_HOUR,
      payload: movableHolidayHour,
    });
  } catch (error) {
  } finally {
    store.dispatch({ type: SET_LOADING, payload: false });
  }
};
