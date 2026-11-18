import type { CalendarDate } from "../../domains/constraints";
import type { Clock } from "../../domains/ports";

export class SystemClock implements Clock {
    public today(): CalendarDate {
        const now = new Date();
        const year = String(now.getFullYear());
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}` as CalendarDate;
    }
}
