export default class SortTasks {
  sortByDateInAscendingOrder(task1: TaskInfo | Task, task2: TaskInfo | Task): number {
    const task1FullDate: string = task1.date + task1.time;
    const task2FullDate: string = task2.date + task2.time;
    if (
      task1FullDate < task2FullDate
      && task1FullDate === ''
    ) {
      return 1;
    } else if (
      task1FullDate > task2FullDate
      && task2FullDate === ''
    ) {
      return -1;
    } else if (
      task1FullDate < task2FullDate
      && task1FullDate !== ''
    ) {
      return -1;
    } else if (
      task1FullDate > task2FullDate
      && task2FullDate !== ''
    ) {
      return 1;
    }
    return 0;
  }

  sortByDateInDescendingOrder(task1: TaskInfo | Task, task2: TaskInfo | Task): number {
    const task1FullDate: string = task1.date + task1.time;
    const task2FullDate: string = task2.date + task2.time;
    if (
      task1FullDate < task2FullDate
      && task1FullDate === ''
    ) {
      return 1;
    } else if (
      task1FullDate > task2FullDate
      && task2FullDate === ''
    ) {
      return -1;
    } else if (
      task1FullDate < task2FullDate
      && task1FullDate !== ''
    ) {
      return 1;
    } else if (
      task1FullDate > task2FullDate
      && task2FullDate !== ''
    ) {
      return -1;
    }
    return 0;
  }
};
