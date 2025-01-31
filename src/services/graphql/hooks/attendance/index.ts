// ** React Import
import { useState, useEffect } from "react";

// ** Types Import
import { Attendance, SearchAttendanceInp } from "./types";

// ** Other Import
import { getGraphQlError } from "../../errorGraphql";

// ** gql Import
import { MUTATIONS } from "../../gql/attendance";
import { QUERYS } from "../../gql/attendance";
import { Result } from "../../customType";

export async function useLazyGetAttendanceToDay(apollo: any): Promise<Result<Attendance[]>> {
  try {
    if (apollo.query) {
      const { data, error } = await apollo.query({
        query: QUERYS.getAttendanceToDay,
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      });

      return {
        loading: false,
        error: error ? getGraphQlError(error.message) : "",
        data: data?.getAttendanceToDay || undefined,
      };
    }

    return {
      loading: false,
      error: "Error",
      data: undefined,
    };
  } catch (err) {
    return {
      loading: false,
      error: getGraphQlError(err),
      data: undefined,
    };
  }
}

export async function useLazyGetAttendanceToWeek(apollo: any): Promise<Result<Attendance[]>> {
  try {
    if (apollo.query) {
      const { data, error } = await apollo.query({
        query: QUERYS.getAttendanceToWeek,
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      });

      return {
        loading: false,
        error: error ? getGraphQlError(error.message) : "",
        data: data?.getAttendanceToWeek || undefined,
      };
    }

    return {
      loading: false,
      error: "Error",
      data: undefined,
    };
  } catch (err) {
    return {
      loading: false,
      error: getGraphQlError(err),
      data: undefined,
    };
  }
}

export async function useLazyGetAllAttendance(apollo: any): Promise<Result<Attendance[]>> {
  try {
    if (apollo.query) {
      const search: SearchAttendanceInp = {
        options: {
          orderBy: ["day", "in"],
        },
        dateStart: apollo.values.dateStart !== "" ? apollo.values.dateStart : null,
        dateEnd: apollo.values.dateEnd !== "" ? apollo.values.dateEnd : null,
      };

      const { data, error } = await apollo.query({
        query: QUERYS.getAllAttendance,
        variables: { search: search },
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      });

      return {
        loading: false,
        error: error ? getGraphQlError(error.message) : "",
        data: data?.getAllAttendance.results || undefined,
      };
    }

    return {
      loading: false,
      error: "Error",
      data: undefined,
    };
  } catch (err) {
    return {
      loading: false,
      error: getGraphQlError(err),
      data: undefined,
    };
  }
}
