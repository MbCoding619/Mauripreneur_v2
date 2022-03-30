import { Component, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef} from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';

import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogScheduleMeetingComponent } from 'src/app/dialog/dialog-schedule-meeting/dialog-schedule-meeting.component';


  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };


@Component({
  selector: 'app-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent{
  

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  DateTry : '2022-03-24T14:00:00';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
  ];

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  displayedColumns : string[] =['bidId','jobTitle','description','name','budget','bidAmount','response' , 'Action'];
  dataSource : MatTableDataSource<any>;
  model : any ={};
  username = '';


  constructor(private modal: NgbModal,private sharedService : SharedService,
    public accountService : AccountsService,
    private toastr : ToastrService,
    private routr : Router,
    private dialog : MatDialog) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(response =>{
      this.username = response.username;
    })

    this.getJobBySme(this.username);
  }

  getJobBySme(username :any){

    this.sharedService.getBidAccepted(username).subscribe( response =>{

      this.dataSource = new MatTableDataSource(response);
      //this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;       
      console.log(response);
    },error =>{

      this.toastr.error(error.error);
    })

  }

  openDialog(row : any) {
    const dialogRef = this.dialog.open(DialogScheduleMeetingComponent,{
        data: row,
        
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: localStorage.getItem('meetTitle'),
        start: startOfDay(new Date(localStorage.getItem('startDate'))),
        end: endOfDay(new Date(localStorage.getItem('endDate'))),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    localStorage.removeItem('meetTitle');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
