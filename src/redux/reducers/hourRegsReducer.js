import {
  SET_HOURS_PER_MONTH,
  SET_HOURS_PER_WEEK,
  SET_HOUR_REG,
  SET_HOUR_REGS,
  SET_SELFCERTIFIED_HOURS,
  SET_SELFCERTIFIED_HOUR,
  SET_SICK_LEAVES,
  SET_SICK_LEAVE,
  SET_MOVABLE_HOLIDAY_HOURS,
  SET_MOVABLE_HOLIDAY_HOUR,
} from "../actionTypes";

const initialState = {
  hoursPerWeek: [],
  hoursPerMonth: [],
  hourRegs: [],
  hourReg: null,
  selfcertifiedHours: [],
  selfcertifiedHour: [],
  sickLeaves: [],
  sickLeave: [],
  movableHolidayHours: [],
};

export const hourRegsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOURS_PER_MONTH:
      return {
        ...state,
        hoursPerMonth: action.payload,
      };
    case SET_HOURS_PER_WEEK:
      return {
        ...state,
        hoursPerWeek: action.payload,
      };
    case SET_HOUR_REGS:
      return {
        ...state,
        hourRegs: action.payload,
      };
    case SET_HOUR_REG:
      return {
        ...state,
        hourReg: action.payload,
      };
    case SET_SELFCERTIFIED_HOURS:
      return {
        ...state,
        selfcertifiedHours: action.payload,
      };
    case SET_SELFCERTIFIED_HOUR:
      return {
        ...state,
        selfcertifiedHour: action.payload,
      };
    case SET_SICK_LEAVES:
      return {
        ...state,
        sickLeaves: action.payload,
      };
    case SET_SICK_LEAVE:
      return {
        ...state,
        sickLeave: action.payload,
      };
    case SET_MOVABLE_HOLIDAY_HOURS:
      return {
        ...state,
        movableHolidayHours: action.payload,
      };
    case SET_MOVABLE_HOLIDAY_HOUR:
      return {
        ...state,
        movableHolidayHour: action.payload,
      };
    default:
      return state;
  }
};
