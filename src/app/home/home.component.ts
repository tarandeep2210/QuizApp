import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../../models/question.model';
import { NgForm } from '../../../node_modules/@angular/forms';

import * as CanvasJS from '../../canvasjs.min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions : Question[] = [];
  incorrectIds : string[] =[];
  correctCount:number =0;
  check : boolean = false;
  constructor(private service : QuestionService) { }

  ngOnInit() {

    this.service.getQuestions().subscribe((data) => this.questions=data);

  }

  clear(form : NgForm){
    form.reset();
    this.createChart(0,0);
  }
  onSubmit(form: NgForm){
    // console.log(event);
    this.check=false;
    this.incorrectIds=[];
    this.correctCount=0;

    for(let question of this.questions){
      if(!question.selected){
        alert("Please Mark All The Answers");
        return;
      }
      if(question.selected===question.correctAns){
          this.correctCount++;
      }
      else{
          this.incorrectIds.push(question.questionId);
      }
      
    //   let quesId = question.questionId;
    //   let cont = form.controls;
    //   console.log(cont.quesId.value);
      
    }
    this.check = true;
    // console.log(this.correctCount);
    //   console.log(this.questions.length-this.correctCount);
    //   console.log(this.incorrectIds);
    this.createChart(this.correctCount,this.questions.length-this.correctCount);
  }

  createChart(correct,incorrect){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Questions Chart"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: correct, label: "Correct" },
          { y: incorrect, label: "Incorrect" },
          
        ]
      }]
    });
      
    chart.render();
  }
}
