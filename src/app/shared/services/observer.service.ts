import { Subject, Subscription } from "rxjs";
import { SafeSubscriber } from "rxjs/internal/Subscriber";
import { filter, map } from "rxjs/operators"
import EventData from "../event";

export default class Observer {
  //public addBtnClick: Subject<string> = new Subject<string>();
  //public editBtnClick: Subject<string> = new Subject<string>();

  private subject$ = new Subject<EventData>();
  private observers: Subscription[] = [];

  emit(event: EventData) {
    this.subject$.next(event);
    //console.log(this.subject$)
  }

  on(eventName: string, action: any): Subscription {
    const on = this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)
    ).subscribe(action);
    //console.log(on)
    this.observers.push(on);
    return on
  }

  unsubscribe(actionName: string, /* action: any */) {/* 
    console.log(this.subject$.unsubscribe()); */
    /* this.subject$.pipe(
      filter((e) => e.name === eventName)
    ).dipose(); */
    const sub = this.observers.find((sub) => {
      //console.log('filter')
      //@ts-ignore
      return sub.destination.partialObserver.next.name.match(/\w*\b/g)[2] === actionName;
    })
    sub!?.unsubscribe();
  }
/*   emitcomplete() {
    this.subject$.complete();
    console.log(this.subject$)
  } */
}