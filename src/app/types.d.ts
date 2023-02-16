//----------------- Task -----------------
interface Task {
  taskElem: HTMLDivElement | null;
  name: string;
  text: string;
  date: string;
  time: string;
  done: boolean;
  expired: boolean;
}

interface TaskInfo {
  text: string,
  date: string,
  time: string,
  done?: boolean,
  expired?: boolean,
  ifDisplay?: boolean,
  deleted?: boolean,
  folders?: string[]
}

interface TaskInfoElems {
  taskId?: HTMLDivElement,
  taskText: HTMLDivElement,
  taskDate: HTMLDivElement,
  taskTime: HTMLDivElement
}

//------------- Date ---------------

interface DateData {
  day: number,
  month: number,
  year: number
  minutes?: number,
  hours?: number,
}

interface DateDataString {
  minutesString: string,
  hoursString: string,
  dayString: string,
  monthString: string,
  yearString: string
}

//------------------------------

interface BtnStyles {
  backgroundColor?: string
}