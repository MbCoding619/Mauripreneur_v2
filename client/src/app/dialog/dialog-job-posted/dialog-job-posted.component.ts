import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { bidProfCard } from 'src/app/_models/bidProfCard';
import { BidService } from 'src/app/_services/bid.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { meeting } from 'src/app/_models/meeting';
import { CalendarService } from 'src/app/_services/calendar.service';
import { AccountsService } from 'src/app/_services/accounts.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { SharedService } from 'src/app/_services/shared.service';
import { Job } from 'src/app/_models/job';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-job-posted',
  templateUrl: './dialog-job-posted.component.html',
  styleUrls: ['./dialog-job-posted.component.css']
})
export class DialogJobPostedComponent implements OnInit {
  oneAtATime = true;
  isOpen = true;
  timelineShow = false;
  bidData = "";
  bidProdData: bidProfCard;
  test1 = 15;
  notesForm: FormGroup;
  notesModel: any;

  bidScore: any;
  quesScore1: any;
  quesScore2: any;
  quesScore3: any;
  quesScore4: any;
  user: string;
  displayedColumns: string[] = ['meetId', 'meetTitle', 'meetingDetails', 'startDate'];
  dataSource: MatTableDataSource<meeting>;
  displayedColumns2 : string[] =['profPic','profName','bidDesc','bidScore','bidNotes','bidResponse'];
  dataSource2 : MatTableDataSource<bidProfCard>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;


  showMeeting = false;
  showAll = false;
  meetForm: FormGroup;
  model: any;
  baseImgUrl = environment.apiImg;
  @Input() jobData: Job; //Change here
  constructor(
    /* if needed to have the other logic of using a matdialog -> enable below code
    and change the variable to jobData and above variable to jobData2. remove @Input()
    and go to job-posted-card and openDialog from there
    private dialogRef: MatDialogRef<DialogJobPostedComponent>, @Inject(MAT_DIALOG_DATA) public jobData2: any,
    */

    private bidService: BidService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private accountService: AccountsService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    //this.getScore();
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response.username;
    })
    this.initialiseNoteForm();
    this.initialiseMeetForm();
  }

  test() {
    this.timelineShow = true;

  }

  getScore() {
    this.bidScore = parseInt(this.quesScore1) + parseInt(this.quesScore2) + parseInt(this.quesScore3) + parseInt(this.quesScore4);
    return this.bidScore;
  }

  getBidId(bidData: { bidId: string }) {

    this.bidData = bidData.bidId;
    //console.log(this.bidData);
    this.timelineShow = true;
    //this.timelineShow = bidId.timelineShow;
  }

  addBidScore() {

    this.getScore();
    let model = {
      "bidId": this?.bidData,
      "bidScore": this?.bidScore
    }
    this.bidService.addBidScore(model).subscribe(response => {
      if (response) {
        this.toastr.success();
      }
    }, error => {
      this.toastr.error(error.error);
    })
  }

  getBidData(bidProfData: bidProfCard) {
    this.bidProdData = bidProfData;
    console.log(this.bidProdData);
    this.initialiseNoteForm();
    this.getMeetingBySmeByBid(this.bidProdData.smeId, this.bidProdData.bidId);
    this.getAllBid(this.bidProdData.jobId);
  }

  getAllBid(jobId :any){
    this.bidService.getBidProfByJobId2(jobId).subscribe(response =>{
      this.dataSource2 = new MatTableDataSource(response);
      this.dataSource2.paginator = this.paginator;

    },error =>{
      this.toastr.error();
    })
  }

  initialiseNoteForm() {
    this.notesForm = this.fb.group({
      bidNotes: new FormControl(this.bidProdData?.bidNotes, Validators.required)
    })
  }

  insertBidNotes() {
    this.notesModel = {
      "id": this?.bidData,
      "bidNotes": this.notesForm.controls["bidNotes"]?.value
    }
    this.bidService.insertBidNotes(this.notesModel).subscribe(response => {

    })
  }


  getMeetingBySmeByBid(smeId: any, bidId: any) {

    this.calendarService.getMeetingBySmeByBid(smeId, bidId).subscribe(
      job => {

        this.dataSource = new MatTableDataSource(job);
        //this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(job[0].startDate);
      }, error => {

        this.toastr.error(error.error);
      }
    )

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }


  initialiseMeetForm() {
    this.meetForm = new FormGroup({
      meetTitle: new FormControl(),
      meetingDetails: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    })
  }


  meetingModel() {
    this.model = {
      'username': this.user?.toLowerCase(),
      'meetTitle': this.meetForm.controls['meetTitle'].value,
      'meetingDetails': this.meetForm.controls['meetingDetails'].value,
      'startDate': this.meetForm.controls['startDate'].value,
      'endDate': this.meetForm.controls['endDate'].value,
      'profId': this.bidProdData?.profId,
      'bidId': this?.bidData
    }
  }

  scheduleMeeting() {
    this.meetingModel();
    if (this.model != null) {
      this.sharedService.scheduleMeeting(this.model).subscribe(response => {
        console.log(response);
        this.toastr.success("Meeting Scheduled");
        this.showMeeting = false;
        this.getMeetingBySmeByBid(this.bidProdData.smeId, this.bidProdData.bidId);

      }, error => {
        this.toastr.error(error.error);
      })
    }
  }

  testMeeting() {
    this.meetingModel();
    console.log(this.model);
  }

  showDataTable() {
    this.showMeeting = false;
  }

  showMeetingF() {
    this.showMeeting = true;
  }

  back(){
    this.timelineShow = false;
  }

  showAllBid(){
    this.showAll = true;
  }

  back2(){
    this.showAll = false;
  }


  createImgPath(serverPath : string){
    return `${this.baseImgUrl}${serverPath}`;
  }

}
