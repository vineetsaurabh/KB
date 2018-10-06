package com.rolaface.util;

import java.util.Calendar;
import java.util.GregorianCalendar;

public final class RolaUtil {

	private RolaUtil() {
		throw new AssertionError();
	}

	public static int getJulianDate() {
		Calendar cal = new GregorianCalendar();

		int day = cal.get(Calendar.DAY_OF_MONTH);
		int month = cal.get(Calendar.MONTH) + 1;
		int year = cal.get(Calendar.YEAR);

		return (1461 * (year + 4800 + (month - 14) / 12)) / 4 + (367 * (month - 2 - 12 * ((month - 14) / 12))) / 12
				- (3 * ((year + 4900 + (month - 14) / 12) / 100)) / 4 + day - 32075;
	}
}
