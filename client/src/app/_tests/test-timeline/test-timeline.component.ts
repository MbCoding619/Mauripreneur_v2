import { Component, Input, OnInit } from '@angular/core';
import { timeline } from 'src/app/_models/timeline';
import { BidService } from 'src/app/_services/bid.service';

@Component({
  selector: 'app-test-timeline',
  templateUrl: './test-timeline.component.html',
  styleUrls: ['./test-timeline.component.css']
})
export class TestTimelineComponent implements OnInit {
  @Input() bidParams : any;
timelines : timeline;
timelineL : any;
  constructor(private bidService : BidService) { }

  ngOnInit(): void {
    this.getTimelines(this.bidParams);
   // console.log(this.bidParams);
  }


  getTimelines(bidId : any){
    this.bidService.getTimeline(bidId).subscribe(timeline =>{
      this.timelines = timeline;
      this.timelineL = Object.keys(this.timelines).length;
    })
  }
}
